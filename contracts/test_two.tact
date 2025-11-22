import "@stdlib/deploy";

// =================================================================
// TEP-74 JETTON STANDARDS
// =================================================================

message(0xf8a7ea5) JettonTransfer {
    queryId: Int as uint64;
    amount: Int as coins;
    destination: Address;
    responseDestination: Address;
    customPayload: Cell?;
    forwardTonAmount: Int as coins;
    forwardPayload: Slice as remaining;
}

message(0x7362d09c) JettonTransferNotification {
    queryId: Int as uint64;
    amount: Int as coins;
    sender: Address;
    forwardPayload: Slice as remaining;
}

// =================================================================
// APP MESSAGES
// =================================================================

message SetJettonWallet {
    jettonWallet: Address;
}

message Claim {
    user: Address;
    amount: Int;
}

message Battle {
    winner: Address;
    loser: Address;
}

message WithdrawRequest {
    amount: Int;
}

message OwnerWithdraw {
    amount: Int;
}

// NEW: Message for Admin to take profits
message AdminJettonWithdraw {
    amount: Int;
}

// =================================================================
// CONTRACT LOGIC
// =================================================================

contract WalletMap with Deployable {
    admin: Address;
    walletAmounts: map<Address, Int>;
    myJettonWallet: Address?;

    init(admin: Address) {
        self.admin = admin;
        self.myJettonWallet = null;
    }

    receive() {}

    // 1. AUTO DEPOSIT
    receive(msg: JettonTransferNotification) {
        require(self.myJettonWallet != null, "Contract not initialized");
        require(sender() == self.myJettonWallet!!, "Rejecting Unverified Token");

        let user: Address = msg.sender;
        let current: Int = self.getWalletAmount(user);
        self.walletAmounts.set(user, current + msg.amount);
    }

    // 2. USER WITHDRAW
    receive(msg: WithdrawRequest) {
        let user: Address = sender();
        let current: Int = self.getWalletAmount(user);

        require(self.myJettonWallet != null, "Contract not initialized");
        require(current >= msg.amount, "Insufficient Balance");
        require(msg.amount > 0, "Amount must be positive");

        // Update Map
        self.walletAmounts.set(user, current - msg.amount);

        // Send Real Jettons
        send(SendParameters {
            to: self.myJettonWallet!!,
            value: ton("0.35"),
            bounce: true,
            body: JettonTransfer {
                queryId: 0,
                amount: msg.amount,
                destination: user,
                responseDestination: user,
                customPayload: null,
                forwardTonAmount: 0,
                forwardPayload: beginCell().storeUint(0, 1).endCell().beginParse(),
            }.toCell(),
        });
    }

    // 3. ADMIN: BATTLE LOGIC
    receive(msg: Battle) {
        require(sender() == self.admin, "Not Admin");
        let loseAmt: Int = ton("1000");
        let winAmt: Int = ton("800");

        let loserBal: Int = self.getWalletAmount(msg.loser);
        require(loserBal >= loseAmt, "Loser has insufficient funds");
        self.walletAmounts.set(msg.loser, loserBal - loseAmt);

        let winnerBal: Int = self.getWalletAmount(msg.winner);
        self.walletAmounts.set(msg.winner, winnerBal + winAmt);
    }

    // 4. ADMIN: BONUS/CLAIM
    receive(msg: Claim) {
        require(sender() == self.admin, "Not Admin");
        let current: Int = self.getWalletAmount(msg.user);
        self.walletAmounts.set(msg.user, current + msg.amount);
    }

    // 5. ADMIN: SETUP
    receive(msg: SetJettonWallet) {
        require(sender() == self.admin, "Not Admin");
        self.myJettonWallet = msg.jettonWallet;
    }

    // 6. ADMIN: WITHDRAW TON (GAS)
    receive(msg: OwnerWithdraw) {
        require(sender() == self.admin, "Not Admin");
        send(SendParameters {
            to: self.admin,
            bounce: true,
            value: msg.amount,
            mode: SendIgnoreErrors + SendPayGasSeparately,
        });
    }

    // 7. ADMIN: WITHDRAW JETTONS (PROFIT)
    receive(msg: AdminJettonWithdraw) {
        require(sender() == self.admin, "Not Admin");
        require(self.myJettonWallet != null, "No Vault Linked");

        send(SendParameters {
            to: self.myJettonWallet!!,
            value: ton("0.35"),
            bounce: true,
            body: JettonTransfer {
                queryId: 0,
                amount: msg.amount,
                destination: self.admin,
                responseDestination: self.admin,
                customPayload: null,
                forwardTonAmount: 0,
                forwardPayload: beginCell().storeUint(0, 1).endCell().beginParse(),
            }.toCell(),
        });
    }

    // GETTERS
    get fun getWalletAmount(wallet: Address): Int {
        let amount: Int? = self.walletAmounts.get(wallet);
        if (amount != null) {
            return amount!!;
        }
        return 0;
    }

    get fun getAllWallets(): map<Address, Int> {
        return self.walletAmounts;
    }

    get fun getMyJettonWallet(): Address? {
        return self.myJettonWallet;
    }
}
