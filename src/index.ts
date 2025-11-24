import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import {
  TonClient,
  WalletContractV4,
  Address,
  toNano,
  beginCell,
} from "@ton/ton";
import { mnemonicToPrivateKey } from "ton-crypto";
// Make sure this path matches your project structure
import {
  WalletMap,
  storeWithdrawRequest,
} from "../contracts/build/TestTwo/TestTwo_WalletMap";

// --- CONFIGURATION ---
const PORT = process.env.PORT || 3000;
const MNEMONIC = process.env.MNEMONIC?.split(" ") || [];
const TONCENTER_KEY = process.env.TONCENTER_KEY;
const CONTRACT_ADDRESS_STR =
  process.env.CONTRACT_ADDRESS ||
  "kQAQWKYnRVACaHUzNehchCZ2e7bOXDSrCNpoCEvr8773QB90";
const CONTRACT_ADDRESS = Address.parse(CONTRACT_ADDRESS_STR);

// --- INITIALIZE APP ---
const app = express();

// --- CORS CONFIGURATION (CLOUDFLARE + TELEGRAM OPTIMIZED) ---
const allowedOrigins = [
  "https://clashwarriors.tech",
  "https://play.clashwarriors.tech", // Your Cloudflare URL
  "https://adorable-fudge-c73118.netlify.app",
  "http://localhost:5173",
  "https://web.telegram.org", // Telegram Web
  "https://webk.telegram.org", // Telegram Web K
  "https://webz.telegram.org", // Telegram Web Z
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`⚠️ Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "ngrok-skip-browser-warning",
  ],
  credentials: true,
  optionsSuccessStatus: 204, // Legacy browser support
};

// 1. Handle Preflight Requests Explicitly (CRITICAL)
app.options("*", cors(corsOptions));

// 2. Apply CORS to all routes
app.use(cors(corsOptions));

// 3. Parse JSON
app.use(express.json());

// Global Client Instance
let client: TonClient;

async function init() {
  try {
    console.log("🔄 Connecting to TON Testnet via Toncenter...");

    // Using Toncenter with API KEY + 60s Timeout
    client = new TonClient({
      endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
      apiKey: TONCENTER_KEY,
      timeout: 60000,
    });

    const masterchainInfo = await client.getMasterchainInfo();

    console.log(
      `✅ Connected to TON. Latest Seqno: ${masterchainInfo.latestSeqno}`
    );

    startServer();
  } catch (error) {
    console.error("❌ Failed to connect to TON:", error);
    process.exit(1);
  }
}

function startServer() {
  // ---------------------------------------------------------
  // 1. GET BALANCE (User Balance in Contract)
  // ---------------------------------------------------------
  app.post("/balance", async (req, res) => {
    try {
      const { wallet } = req.body;
      if (!wallet) return res.status(400).json({ error: "Wallet required" });

      // Open Contract
      const contract = client.open(WalletMap.fromAddress(CONTRACT_ADDRESS));
      const target = Address.parse(wallet);

      // Call Getter
      const amount = await contract.getGetWalletAmount(target);

      res.json({ wallet, amount: amount.toString() });
    } catch (err) {
      console.error("Balance fetch error:", err);
      // Return 0 on error so UI doesn't break
      res.json({ wallet: req.body.wallet, amount: "0" });
    }
  });

  // ---------------------------------------------------------
  // 2. CLAIM AIRDROP (Admin sends 50k to User)
  // ---------------------------------------------------------
  app.post("/claim-airdrop", async (req, res) => {
    try {
      const { wallet } = req.body;
      if (!wallet) return res.status(400).json({ error: "Wallet required" });

      if (MNEMONIC.length === 0)
        return res.status(500).json({ error: "Server MNEMONIC missing" });

      // Setup Admin Wallet
      const keyPair = await mnemonicToPrivateKey(MNEMONIC);
      const adminWallet = client.open(
        WalletContractV4.create({
          workchain: 0,
          publicKey: keyPair.publicKey,
        })
      );

      // Open Contract
      const contract = client.open(WalletMap.fromAddress(CONTRACT_ADDRESS));

      // Send Transaction
      await contract.send(
        adminWallet.sender(keyPair.secretKey),
        { value: toNano("0.05") },
        {
          $$type: "Claim",
          user: Address.parse(wallet),
          amount: toNano("50000"), // 50k WARS
        }
      );

      console.log(`✅ Airdrop sent to ${wallet}`);
      res.json({ success: true });
    } catch (err) {
      console.error("Airdrop error:", err);
      res
        .status(500)
        .json({ error: "Airdrop failed", details: (err as Error).message });
    }
  });

  // ---------------------------------------------------------
  // 3. GENERATE WITHDRAW PAYLOAD (For Frontend to Sign)
  // ---------------------------------------------------------
  app.post("/withdraw-payload", async (req, res) => {
    try {
      const { amount } = req.body;
      if (!amount) return res.status(400).json({ error: "Amount required" });

      // Convert requested amount to Nano
      const nanoAmount = toNano(amount);

      // Create Payload using Tact Wrapper
      const payloadCell = beginCell()
        .store(
          storeWithdrawRequest({
            $$type: "WithdrawRequest",
            amount: nanoAmount,
          })
        )
        .endCell();

      const payloadBase64 = payloadCell.toBoc().toString("base64");

      res.json({
        success: true,
        transaction: {
          to: CONTRACT_ADDRESS.toString(),
          value: toNano("0.5").toString(), // Gas fee
          payload: payloadBase64,
        },
      });
    } catch (err) {
      console.error("Withdraw Payload error:", err);
      res.status(500).json({ error: "Failed to generate payload" });
    }
  });

  // ---------------------------------------------------------
  // 4. HEALTH CHECK & KEEP-ALIVE (Prevents Render Sleep)
  // ---------------------------------------------------------
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "alive" });
  });

  // Start Listening
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);

    // Start the self-ping loop
    startKeepAlive();
  });
}

function startKeepAlive() {
  setInterval(() => {
    // Render automatically sets 'RENDER_EXTERNAL_HOSTNAME' in production
    const host = process.env.RENDER_EXTERNAL_HOSTNAME
      ? `https://${process.env.RENDER_EXTERNAL_HOSTNAME}`
      : `http://localhost:${PORT}`;

    // We use native fetch (Node 18+) to ping ourselves
    fetch(`${host}/health`)
      .then((res) => {
        if (res.ok) console.log(`🔔 Keep-alive ping successful: ${host}`);
      })
      .catch((err) => {
        console.error(`❌ Keep-alive ping failed: ${err.message}`);
      });
  }, 30000); // Ping every 30 seconds
}

// Run
init();
