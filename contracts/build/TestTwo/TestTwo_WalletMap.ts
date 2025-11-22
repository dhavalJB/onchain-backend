import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  address,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from "@ton/core";

export type DataSize = {
  $$type: "DataSize";
  cells: bigint;
  bits: bigint;
  refs: bigint;
};

export function storeDataSize(src: DataSize) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeInt(src.cells, 257);
    b_0.storeInt(src.bits, 257);
    b_0.storeInt(src.refs, 257);
  };
}

export function loadDataSize(slice: Slice) {
  const sc_0 = slice;
  const _cells = sc_0.loadIntBig(257);
  const _bits = sc_0.loadIntBig(257);
  const _refs = sc_0.loadIntBig(257);
  return {
    $$type: "DataSize" as const,
    cells: _cells,
    bits: _bits,
    refs: _refs,
  };
}

export function loadTupleDataSize(source: TupleReader) {
  const _cells = source.readBigNumber();
  const _bits = source.readBigNumber();
  const _refs = source.readBigNumber();
  return {
    $$type: "DataSize" as const,
    cells: _cells,
    bits: _bits,
    refs: _refs,
  };
}

export function loadGetterTupleDataSize(source: TupleReader) {
  const _cells = source.readBigNumber();
  const _bits = source.readBigNumber();
  const _refs = source.readBigNumber();
  return {
    $$type: "DataSize" as const,
    cells: _cells,
    bits: _bits,
    refs: _refs,
  };
}

export function storeTupleDataSize(source: DataSize) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.cells);
  builder.writeNumber(source.bits);
  builder.writeNumber(source.refs);
  return builder.build();
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
    },
    parse: (src) => {
      return loadDataSize(src.loadRef().beginParse());
    },
  };
}

export type SignedBundle = {
  $$type: "SignedBundle";
  signature: Buffer;
  signedData: Slice;
};

export function storeSignedBundle(src: SignedBundle) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeBuffer(src.signature);
    b_0.storeBuilder(src.signedData.asBuilder());
  };
}

export function loadSignedBundle(slice: Slice) {
  const sc_0 = slice;
  const _signature = sc_0.loadBuffer(64);
  const _signedData = sc_0;
  return {
    $$type: "SignedBundle" as const,
    signature: _signature,
    signedData: _signedData,
  };
}

export function loadTupleSignedBundle(source: TupleReader) {
  const _signature = source.readBuffer();
  const _signedData = source.readCell().asSlice();
  return {
    $$type: "SignedBundle" as const,
    signature: _signature,
    signedData: _signedData,
  };
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
  const _signature = source.readBuffer();
  const _signedData = source.readCell().asSlice();
  return {
    $$type: "SignedBundle" as const,
    signature: _signature,
    signedData: _signedData,
  };
}

export function storeTupleSignedBundle(source: SignedBundle) {
  const builder = new TupleBuilder();
  builder.writeBuffer(source.signature);
  builder.writeSlice(source.signedData.asCell());
  return builder.build();
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell());
    },
    parse: (src) => {
      return loadSignedBundle(src.loadRef().beginParse());
    },
  };
}

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  const sc_0 = slice;
  const _code = sc_0.loadRef();
  const _data = sc_0.loadRef();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

export function loadTupleStateInit(source: TupleReader) {
  const _code = source.readCell();
  const _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

export function loadGetterTupleStateInit(source: TupleReader) {
  const _code = source.readCell();
  const _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

export function storeTupleStateInit(source: StateInit) {
  const builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: "Context";
  bounceable: boolean;
  sender: Address;
  value: bigint;
  raw: Slice;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeBit(src.bounceable);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw.asCell());
  };
}

export function loadContext(slice: Slice) {
  const sc_0 = slice;
  const _bounceable = sc_0.loadBit();
  const _sender = sc_0.loadAddress();
  const _value = sc_0.loadIntBig(257);
  const _raw = sc_0.loadRef().asSlice();
  return {
    $$type: "Context" as const,
    bounceable: _bounceable,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

export function loadTupleContext(source: TupleReader) {
  const _bounceable = source.readBoolean();
  const _sender = source.readAddress();
  const _value = source.readBigNumber();
  const _raw = source.readCell().asSlice();
  return {
    $$type: "Context" as const,
    bounceable: _bounceable,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

export function loadGetterTupleContext(source: TupleReader) {
  const _bounceable = source.readBoolean();
  const _sender = source.readAddress();
  const _value = source.readBigNumber();
  const _raw = source.readCell().asSlice();
  return {
    $$type: "Context" as const,
    bounceable: _bounceable,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

export function storeTupleContext(source: Context) {
  const builder = new TupleBuilder();
  builder.writeBoolean(source.bounceable);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw.asCell());
  return builder.build();
}

export function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: "SendParameters";
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
  value: bigint;
  to: Address;
  bounce: boolean;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeInt(src.value, 257);
    b_0.storeAddress(src.to);
    b_0.storeBit(src.bounce);
  };
}

export function loadSendParameters(slice: Slice) {
  const sc_0 = slice;
  const _mode = sc_0.loadIntBig(257);
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _value = sc_0.loadIntBig(257);
  const _to = sc_0.loadAddress();
  const _bounce = sc_0.loadBit();
  return {
    $$type: "SendParameters" as const,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
    value: _value,
    to: _to,
    bounce: _bounce,
  };
}

export function loadTupleSendParameters(source: TupleReader) {
  const _mode = source.readBigNumber();
  const _body = source.readCellOpt();
  const _code = source.readCellOpt();
  const _data = source.readCellOpt();
  const _value = source.readBigNumber();
  const _to = source.readAddress();
  const _bounce = source.readBoolean();
  return {
    $$type: "SendParameters" as const,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
    value: _value,
    to: _to,
    bounce: _bounce,
  };
}

export function loadGetterTupleSendParameters(source: TupleReader) {
  const _mode = source.readBigNumber();
  const _body = source.readCellOpt();
  const _code = source.readCellOpt();
  const _data = source.readCellOpt();
  const _value = source.readBigNumber();
  const _to = source.readAddress();
  const _bounce = source.readBoolean();
  return {
    $$type: "SendParameters" as const,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
    value: _value,
    to: _to,
    bounce: _bounce,
  };
}

export function storeTupleSendParameters(source: SendParameters) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  builder.writeNumber(source.value);
  builder.writeAddress(source.to);
  builder.writeBoolean(source.bounce);
  return builder.build();
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type MessageParameters = {
  $$type: "MessageParameters";
  mode: bigint;
  body: Cell | null;
  value: bigint;
  to: Address;
  bounce: boolean;
};

export function storeMessageParameters(src: MessageParameters) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeInt(src.value, 257);
    b_0.storeAddress(src.to);
    b_0.storeBit(src.bounce);
  };
}

export function loadMessageParameters(slice: Slice) {
  const sc_0 = slice;
  const _mode = sc_0.loadIntBig(257);
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _value = sc_0.loadIntBig(257);
  const _to = sc_0.loadAddress();
  const _bounce = sc_0.loadBit();
  return {
    $$type: "MessageParameters" as const,
    mode: _mode,
    body: _body,
    value: _value,
    to: _to,
    bounce: _bounce,
  };
}

export function loadTupleMessageParameters(source: TupleReader) {
  const _mode = source.readBigNumber();
  const _body = source.readCellOpt();
  const _value = source.readBigNumber();
  const _to = source.readAddress();
  const _bounce = source.readBoolean();
  return {
    $$type: "MessageParameters" as const,
    mode: _mode,
    body: _body,
    value: _value,
    to: _to,
    bounce: _bounce,
  };
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
  const _mode = source.readBigNumber();
  const _body = source.readCellOpt();
  const _value = source.readBigNumber();
  const _to = source.readAddress();
  const _bounce = source.readBoolean();
  return {
    $$type: "MessageParameters" as const,
    mode: _mode,
    body: _body,
    value: _value,
    to: _to,
    bounce: _bounce,
  };
}

export function storeTupleMessageParameters(source: MessageParameters) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeNumber(source.value);
  builder.writeAddress(source.to);
  builder.writeBoolean(source.bounce);
  return builder.build();
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeMessageParameters(src)).endCell()
      );
    },
    parse: (src) => {
      return loadMessageParameters(src.loadRef().beginParse());
    },
  };
}

export type DeployParameters = {
  $$type: "DeployParameters";
  mode: bigint;
  body: Cell | null;
  value: bigint;
  bounce: boolean;
  init: StateInit;
};

export function storeDeployParameters(src: DeployParameters) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeInt(src.value, 257);
    b_0.storeBit(src.bounce);
    b_0.store(storeStateInit(src.init));
  };
}

export function loadDeployParameters(slice: Slice) {
  const sc_0 = slice;
  const _mode = sc_0.loadIntBig(257);
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _value = sc_0.loadIntBig(257);
  const _bounce = sc_0.loadBit();
  const _init = loadStateInit(sc_0);
  return {
    $$type: "DeployParameters" as const,
    mode: _mode,
    body: _body,
    value: _value,
    bounce: _bounce,
    init: _init,
  };
}

export function loadTupleDeployParameters(source: TupleReader) {
  const _mode = source.readBigNumber();
  const _body = source.readCellOpt();
  const _value = source.readBigNumber();
  const _bounce = source.readBoolean();
  const _init = loadTupleStateInit(source);
  return {
    $$type: "DeployParameters" as const,
    mode: _mode,
    body: _body,
    value: _value,
    bounce: _bounce,
    init: _init,
  };
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
  const _mode = source.readBigNumber();
  const _body = source.readCellOpt();
  const _value = source.readBigNumber();
  const _bounce = source.readBoolean();
  const _init = loadGetterTupleStateInit(source);
  return {
    $$type: "DeployParameters" as const,
    mode: _mode,
    body: _body,
    value: _value,
    bounce: _bounce,
    init: _init,
  };
}

export function storeTupleDeployParameters(source: DeployParameters) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeNumber(source.value);
  builder.writeBoolean(source.bounce);
  builder.writeTuple(storeTupleStateInit(source.init));
  return builder.build();
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
    },
    parse: (src) => {
      return loadDeployParameters(src.loadRef().beginParse());
    },
  };
}

export type StdAddress = {
  $$type: "StdAddress";
  workchain: bigint;
  address: bigint;
};

export function storeStdAddress(src: StdAddress) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeInt(src.workchain, 8);
    b_0.storeUint(src.address, 256);
  };
}

export function loadStdAddress(slice: Slice) {
  const sc_0 = slice;
  const _workchain = sc_0.loadIntBig(8);
  const _address = sc_0.loadUintBig(256);
  return {
    $$type: "StdAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

export function loadTupleStdAddress(source: TupleReader) {
  const _workchain = source.readBigNumber();
  const _address = source.readBigNumber();
  return {
    $$type: "StdAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

export function loadGetterTupleStdAddress(source: TupleReader) {
  const _workchain = source.readBigNumber();
  const _address = source.readBigNumber();
  return {
    $$type: "StdAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

export function storeTupleStdAddress(source: StdAddress) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.workchain);
  builder.writeNumber(source.address);
  return builder.build();
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
    },
    parse: (src) => {
      return loadStdAddress(src.loadRef().beginParse());
    },
  };
}

export type VarAddress = {
  $$type: "VarAddress";
  workchain: bigint;
  address: Slice;
};

export function storeVarAddress(src: VarAddress) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeInt(src.workchain, 32);
    b_0.storeRef(src.address.asCell());
  };
}

export function loadVarAddress(slice: Slice) {
  const sc_0 = slice;
  const _workchain = sc_0.loadIntBig(32);
  const _address = sc_0.loadRef().asSlice();
  return {
    $$type: "VarAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

export function loadTupleVarAddress(source: TupleReader) {
  const _workchain = source.readBigNumber();
  const _address = source.readCell().asSlice();
  return {
    $$type: "VarAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

export function loadGetterTupleVarAddress(source: TupleReader) {
  const _workchain = source.readBigNumber();
  const _address = source.readCell().asSlice();
  return {
    $$type: "VarAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

export function storeTupleVarAddress(source: VarAddress) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.workchain);
  builder.writeSlice(source.address.asCell());
  return builder.build();
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
    },
    parse: (src) => {
      return loadVarAddress(src.loadRef().beginParse());
    },
  };
}

export type BasechainAddress = {
  $$type: "BasechainAddress";
  hash: bigint | null;
};

export function storeBasechainAddress(src: BasechainAddress) {
  return (builder: Builder) => {
    const b_0 = builder;
    if (src.hash !== null && src.hash !== undefined) {
      b_0.storeBit(true).storeInt(src.hash, 257);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadBasechainAddress(slice: Slice) {
  const sc_0 = slice;
  const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
  return { $$type: "BasechainAddress" as const, hash: _hash };
}

export function loadTupleBasechainAddress(source: TupleReader) {
  const _hash = source.readBigNumberOpt();
  return { $$type: "BasechainAddress" as const, hash: _hash };
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
  const _hash = source.readBigNumberOpt();
  return { $$type: "BasechainAddress" as const, hash: _hash };
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.hash);
  return builder.build();
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
    },
    parse: (src) => {
      return loadBasechainAddress(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: "Deploy";
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

export function loadTupleDeploy(source: TupleReader) {
  const _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

export function loadGetterTupleDeploy(source: TupleReader) {
  const _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

export function storeTupleDeploy(source: Deploy) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

export function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: "DeployOk";
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

export function loadTupleDeployOk(source: TupleReader) {
  const _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

export function loadGetterTupleDeployOk(source: TupleReader) {
  const _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

export function storeTupleDeployOk(source: DeployOk) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

export function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: "FactoryDeploy";
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _cashback = sc_0.loadAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

export function loadTupleFactoryDeploy(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

export function loadGetterTupleFactoryDeploy(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

export function storeTupleFactoryDeploy(source: FactoryDeploy) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

export function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type JettonTransfer = {
  $$type: "JettonTransfer";
  queryId: bigint;
  amount: bigint;
  destination: Address;
  responseDestination: Address;
  customPayload: Cell | null;
  forwardTonAmount: bigint;
  forwardPayload: Slice;
};

export function storeJettonTransfer(src: JettonTransfer) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(260734629, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.destination);
    b_0.storeAddress(src.responseDestination);
    if (src.customPayload !== null && src.customPayload !== undefined) {
      b_0.storeBit(true).storeRef(src.customPayload);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeCoins(src.forwardTonAmount);
    b_0.storeBuilder(src.forwardPayload.asBuilder());
  };
}

export function loadJettonTransfer(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 260734629) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _amount = sc_0.loadCoins();
  const _destination = sc_0.loadAddress();
  const _responseDestination = sc_0.loadAddress();
  const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _forwardTonAmount = sc_0.loadCoins();
  const _forwardPayload = sc_0;
  return {
    $$type: "JettonTransfer" as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  };
}

export function loadTupleJettonTransfer(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _amount = source.readBigNumber();
  const _destination = source.readAddress();
  const _responseDestination = source.readAddress();
  const _customPayload = source.readCellOpt();
  const _forwardTonAmount = source.readBigNumber();
  const _forwardPayload = source.readCell().asSlice();
  return {
    $$type: "JettonTransfer" as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  };
}

export function loadGetterTupleJettonTransfer(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _amount = source.readBigNumber();
  const _destination = source.readAddress();
  const _responseDestination = source.readAddress();
  const _customPayload = source.readCellOpt();
  const _forwardTonAmount = source.readBigNumber();
  const _forwardPayload = source.readCell().asSlice();
  return {
    $$type: "JettonTransfer" as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  };
}

export function storeTupleJettonTransfer(source: JettonTransfer) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.destination);
  builder.writeAddress(source.responseDestination);
  builder.writeCell(source.customPayload);
  builder.writeNumber(source.forwardTonAmount);
  builder.writeSlice(source.forwardPayload.asCell());
  return builder.build();
}

export function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
    },
    parse: (src) => {
      return loadJettonTransfer(src.loadRef().beginParse());
    },
  };
}

export type JettonTransferNotification = {
  $$type: "JettonTransferNotification";
  queryId: bigint;
  amount: bigint;
  sender: Address;
  forwardPayload: Slice;
};

export function storeJettonTransferNotification(
  src: JettonTransferNotification
) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1935855772, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.sender);
    b_0.storeBuilder(src.forwardPayload.asBuilder());
  };
}

export function loadJettonTransferNotification(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1935855772) {
    throw Error("Invalid prefix");
  }
  const _queryId = sc_0.loadUintBig(64);
  const _amount = sc_0.loadCoins();
  const _sender = sc_0.loadAddress();
  const _forwardPayload = sc_0;
  return {
    $$type: "JettonTransferNotification" as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    forwardPayload: _forwardPayload,
  };
}

export function loadTupleJettonTransferNotification(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _amount = source.readBigNumber();
  const _sender = source.readAddress();
  const _forwardPayload = source.readCell().asSlice();
  return {
    $$type: "JettonTransferNotification" as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    forwardPayload: _forwardPayload,
  };
}

export function loadGetterTupleJettonTransferNotification(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _amount = source.readBigNumber();
  const _sender = source.readAddress();
  const _forwardPayload = source.readCell().asSlice();
  return {
    $$type: "JettonTransferNotification" as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    forwardPayload: _forwardPayload,
  };
}

export function storeTupleJettonTransferNotification(
  source: JettonTransferNotification
) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.sender);
  builder.writeSlice(source.forwardPayload.asCell());
  return builder.build();
}

export function dictValueParserJettonTransferNotification(): DictionaryValue<JettonTransferNotification> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeJettonTransferNotification(src)).endCell()
      );
    },
    parse: (src) => {
      return loadJettonTransferNotification(src.loadRef().beginParse());
    },
  };
}

export type SetJettonWallet = {
  $$type: "SetJettonWallet";
  jettonWallet: Address;
};

export function storeSetJettonWallet(src: SetJettonWallet) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(3010105720, 32);
    b_0.storeAddress(src.jettonWallet);
  };
}

export function loadSetJettonWallet(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 3010105720) {
    throw Error("Invalid prefix");
  }
  const _jettonWallet = sc_0.loadAddress();
  return { $$type: "SetJettonWallet" as const, jettonWallet: _jettonWallet };
}

export function loadTupleSetJettonWallet(source: TupleReader) {
  const _jettonWallet = source.readAddress();
  return { $$type: "SetJettonWallet" as const, jettonWallet: _jettonWallet };
}

export function loadGetterTupleSetJettonWallet(source: TupleReader) {
  const _jettonWallet = source.readAddress();
  return { $$type: "SetJettonWallet" as const, jettonWallet: _jettonWallet };
}

export function storeTupleSetJettonWallet(source: SetJettonWallet) {
  const builder = new TupleBuilder();
  builder.writeAddress(source.jettonWallet);
  return builder.build();
}

export function dictValueParserSetJettonWallet(): DictionaryValue<SetJettonWallet> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSetJettonWallet(src)).endCell());
    },
    parse: (src) => {
      return loadSetJettonWallet(src.loadRef().beginParse());
    },
  };
}

export type Claim = {
  $$type: "Claim";
  user: Address;
  amount: bigint;
};

export function storeClaim(src: Claim) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2278860399, 32);
    b_0.storeAddress(src.user);
    b_0.storeInt(src.amount, 257);
  };
}

export function loadClaim(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2278860399) {
    throw Error("Invalid prefix");
  }
  const _user = sc_0.loadAddress();
  const _amount = sc_0.loadIntBig(257);
  return { $$type: "Claim" as const, user: _user, amount: _amount };
}

export function loadTupleClaim(source: TupleReader) {
  const _user = source.readAddress();
  const _amount = source.readBigNumber();
  return { $$type: "Claim" as const, user: _user, amount: _amount };
}

export function loadGetterTupleClaim(source: TupleReader) {
  const _user = source.readAddress();
  const _amount = source.readBigNumber();
  return { $$type: "Claim" as const, user: _user, amount: _amount };
}

export function storeTupleClaim(source: Claim) {
  const builder = new TupleBuilder();
  builder.writeAddress(source.user);
  builder.writeNumber(source.amount);
  return builder.build();
}

export function dictValueParserClaim(): DictionaryValue<Claim> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeClaim(src)).endCell());
    },
    parse: (src) => {
      return loadClaim(src.loadRef().beginParse());
    },
  };
}

export type Battle = {
  $$type: "Battle";
  winner: Address;
  loser: Address;
};

export function storeBattle(src: Battle) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(953628936, 32);
    b_0.storeAddress(src.winner);
    b_0.storeAddress(src.loser);
  };
}

export function loadBattle(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 953628936) {
    throw Error("Invalid prefix");
  }
  const _winner = sc_0.loadAddress();
  const _loser = sc_0.loadAddress();
  return { $$type: "Battle" as const, winner: _winner, loser: _loser };
}

export function loadTupleBattle(source: TupleReader) {
  const _winner = source.readAddress();
  const _loser = source.readAddress();
  return { $$type: "Battle" as const, winner: _winner, loser: _loser };
}

export function loadGetterTupleBattle(source: TupleReader) {
  const _winner = source.readAddress();
  const _loser = source.readAddress();
  return { $$type: "Battle" as const, winner: _winner, loser: _loser };
}

export function storeTupleBattle(source: Battle) {
  const builder = new TupleBuilder();
  builder.writeAddress(source.winner);
  builder.writeAddress(source.loser);
  return builder.build();
}

export function dictValueParserBattle(): DictionaryValue<Battle> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeBattle(src)).endCell());
    },
    parse: (src) => {
      return loadBattle(src.loadRef().beginParse());
    },
  };
}

export type WithdrawRequest = {
  $$type: "WithdrawRequest";
  amount: bigint;
};

export function storeWithdrawRequest(src: WithdrawRequest) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1488609783, 32);
    b_0.storeInt(src.amount, 257);
  };
}

export function loadWithdrawRequest(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1488609783) {
    throw Error("Invalid prefix");
  }
  const _amount = sc_0.loadIntBig(257);
  return { $$type: "WithdrawRequest" as const, amount: _amount };
}

export function loadTupleWithdrawRequest(source: TupleReader) {
  const _amount = source.readBigNumber();
  return { $$type: "WithdrawRequest" as const, amount: _amount };
}

export function loadGetterTupleWithdrawRequest(source: TupleReader) {
  const _amount = source.readBigNumber();
  return { $$type: "WithdrawRequest" as const, amount: _amount };
}

export function storeTupleWithdrawRequest(source: WithdrawRequest) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  return builder.build();
}

export function dictValueParserWithdrawRequest(): DictionaryValue<WithdrawRequest> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeWithdrawRequest(src)).endCell());
    },
    parse: (src) => {
      return loadWithdrawRequest(src.loadRef().beginParse());
    },
  };
}

export type OwnerWithdraw = {
  $$type: "OwnerWithdraw";
  amount: bigint;
};

export function storeOwnerWithdraw(src: OwnerWithdraw) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(318151818, 32);
    b_0.storeInt(src.amount, 257);
  };
}

export function loadOwnerWithdraw(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 318151818) {
    throw Error("Invalid prefix");
  }
  const _amount = sc_0.loadIntBig(257);
  return { $$type: "OwnerWithdraw" as const, amount: _amount };
}

export function loadTupleOwnerWithdraw(source: TupleReader) {
  const _amount = source.readBigNumber();
  return { $$type: "OwnerWithdraw" as const, amount: _amount };
}

export function loadGetterTupleOwnerWithdraw(source: TupleReader) {
  const _amount = source.readBigNumber();
  return { $$type: "OwnerWithdraw" as const, amount: _amount };
}

export function storeTupleOwnerWithdraw(source: OwnerWithdraw) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  return builder.build();
}

export function dictValueParserOwnerWithdraw(): DictionaryValue<OwnerWithdraw> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeOwnerWithdraw(src)).endCell());
    },
    parse: (src) => {
      return loadOwnerWithdraw(src.loadRef().beginParse());
    },
  };
}

export type AdminJettonWithdraw = {
  $$type: "AdminJettonWithdraw";
  amount: bigint;
};

export function storeAdminJettonWithdraw(src: AdminJettonWithdraw) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1567757798, 32);
    b_0.storeInt(src.amount, 257);
  };
}

export function loadAdminJettonWithdraw(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1567757798) {
    throw Error("Invalid prefix");
  }
  const _amount = sc_0.loadIntBig(257);
  return { $$type: "AdminJettonWithdraw" as const, amount: _amount };
}

export function loadTupleAdminJettonWithdraw(source: TupleReader) {
  const _amount = source.readBigNumber();
  return { $$type: "AdminJettonWithdraw" as const, amount: _amount };
}

export function loadGetterTupleAdminJettonWithdraw(source: TupleReader) {
  const _amount = source.readBigNumber();
  return { $$type: "AdminJettonWithdraw" as const, amount: _amount };
}

export function storeTupleAdminJettonWithdraw(source: AdminJettonWithdraw) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  return builder.build();
}

export function dictValueParserAdminJettonWithdraw(): DictionaryValue<AdminJettonWithdraw> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeAdminJettonWithdraw(src)).endCell()
      );
    },
    parse: (src) => {
      return loadAdminJettonWithdraw(src.loadRef().beginParse());
    },
  };
}

export type WalletMap$Data = {
  $$type: "WalletMap$Data";
  admin: Address;
  walletAmounts: Dictionary<Address, bigint>;
  myJettonWallet: Address | null;
};

export function storeWalletMap$Data(src: WalletMap$Data) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeAddress(src.admin);
    b_0.storeDict(
      src.walletAmounts,
      Dictionary.Keys.Address(),
      Dictionary.Values.BigInt(257)
    );
    b_0.storeAddress(src.myJettonWallet);
  };
}

export function loadWalletMap$Data(slice: Slice) {
  const sc_0 = slice;
  const _admin = sc_0.loadAddress();
  const _walletAmounts = Dictionary.load(
    Dictionary.Keys.Address(),
    Dictionary.Values.BigInt(257),
    sc_0
  );
  const _myJettonWallet = sc_0.loadMaybeAddress();
  return {
    $$type: "WalletMap$Data" as const,
    admin: _admin,
    walletAmounts: _walletAmounts,
    myJettonWallet: _myJettonWallet,
  };
}

export function loadTupleWalletMap$Data(source: TupleReader) {
  const _admin = source.readAddress();
  const _walletAmounts = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    Dictionary.Values.BigInt(257),
    source.readCellOpt()
  );
  const _myJettonWallet = source.readAddressOpt();
  return {
    $$type: "WalletMap$Data" as const,
    admin: _admin,
    walletAmounts: _walletAmounts,
    myJettonWallet: _myJettonWallet,
  };
}

export function loadGetterTupleWalletMap$Data(source: TupleReader) {
  const _admin = source.readAddress();
  const _walletAmounts = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    Dictionary.Values.BigInt(257),
    source.readCellOpt()
  );
  const _myJettonWallet = source.readAddressOpt();
  return {
    $$type: "WalletMap$Data" as const,
    admin: _admin,
    walletAmounts: _walletAmounts,
    myJettonWallet: _myJettonWallet,
  };
}

export function storeTupleWalletMap$Data(source: WalletMap$Data) {
  const builder = new TupleBuilder();
  builder.writeAddress(source.admin);
  builder.writeCell(
    source.walletAmounts.size > 0
      ? beginCell()
          .storeDictDirect(
            source.walletAmounts,
            Dictionary.Keys.Address(),
            Dictionary.Values.BigInt(257)
          )
          .endCell()
      : null
  );
  builder.writeAddress(source.myJettonWallet);
  return builder.build();
}

export function dictValueParserWalletMap$Data(): DictionaryValue<WalletMap$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeWalletMap$Data(src)).endCell());
    },
    parse: (src) => {
      return loadWalletMap$Data(src.loadRef().beginParse());
    },
  };
}

type WalletMap_init_args = {
  $$type: "WalletMap_init_args";
  admin: Address;
};

function initWalletMap_init_args(src: WalletMap_init_args) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeAddress(src.admin);
  };
}

async function WalletMap_init(admin: Address) {
  const __code = Cell.fromHex(
    "b5ee9c724102170100058700022cff008e88f4a413f4bcf2c80bed53208e8130e1ed43d90108020378e0020602012003040157b6277da89a1a400031c25f481e809ae580322db27f48003c48660d8272ff4800203a2dadbc4aa05b678d86300f0153b639fda89a1a400031c25f481e809ae580322db27f48003c48660d8272ff4800203a2dadbc5b678d8630050002210153b91d7ed44d0d200018e12fa40f404d72c01916d93fa4001e243306c1397fa400101d16d6de2db3c6c3180700022004e601d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e12fa40f404d72c01916d93fa4001e243306c1397fa400101d16d6de204925f04e07023d74920c21f953103d31f04de2182107362d09cbae30221821058ba61f7bae30221821038d73908bae30221821087d4a66fba090a0c0e01c05b02d33f31fa00fa4030813085256eb3f2f4810faaf84226206ef2d080c705f2f4541344db3c81010b05a010235e31810101216e955b59f4593098c801cf004133f441e258c87f01ca0055205023cef40001206e9430cf84809201cee2c9ed540f02d25b02810101d70030f842541344db3c813085226eb3f2f48200a65f5315bef2f48200eecf25c200f2f481010b5115a126103401810101216e955b59f4593098c801cf004133f441e221206ef2d080821014dc93807f706d21c85210cb00c9d02b1046105b040c5520c80f0b00e8556082100f8a7ea55008cb1f16cb3f5004fa0212cecef40001fa02cec94630157050346d036d5520c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0059c87f01ca0055205023cef40001206e9430cf84809201cee2c9ed5403e25b02fa40fa40308200e2ebf84224c705f2f48218e8d4a5100050348218ba43b740005164db3c82009e815317bef2f481010b07a110234650810101216e955b59f4593098c801cf004133f441e2430323db3c81010b06a010234540810101216e955b59f4593098c801cf004133f441e2010f0f0d0036c87f01ca0055205023cef40001206e9430cf84809201cee2c9ed5404e68ed45b02fa40810101d700308200e2ebf84224c705f2f4541343db3c81010b06a010234540810101216e955b59f4593098c801cf004133f441e201c87f01ca0055205023cef40001206e9430cf84809201cee2c9ed54e0218210b36a9178bae30221821012f69c8abae3022182105d7215e6ba0f101112004681010b23028101014133f40a6fa19401d70030925b6de2206eb395206ef2d080e03070005a5b3301fa40308200e2ebf84223c705f2f412c87f01ca0055205023cef40001206e9430cf84809201cee2c9ed5400d65b02810101d700308200e2ebf84223c705f2f47f220273036d6d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002c87f01ca0055205023cef40001206e9430cf84809201cee2c9ed5402dce302218210946a98b6ba8e525b02d33f30c8018210aff90f5758cb1fcb3fc913f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c87f01ca0055205023cef40001206e9430cf84809201cee2c9ed54e034c00003c12113b0e3025f03f2c082131602fe5b02810101d700308200e2ebf84223c705f2f4810e12246eb3f2f423206ef2d080821014dc93807f706d21c85210cb00c9d0281045104851394133c8556082100f8a7ea55008cb1f16cb3f5004fa0212cecef40001fa02cec941307050346d036d5520c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818a1415001a58cf8680cf8480f400f400cf810046e2f400c901fb0002c87f01ca0055205023cef40001206e9430cf84809201cee2c9ed54003802c87f01ca0055205023cef40001206e9430cf84809201cee2c9ed54cac444e5"
  );
  const builder = beginCell();
  builder.storeUint(0, 1);
  initWalletMap_init_args({ $$type: "WalletMap_init_args", admin })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

export const WalletMap_errors = {
  2: { message: "Stack underflow" },
  3: { message: "Stack overflow" },
  4: { message: "Integer overflow" },
  5: { message: "Integer out of expected range" },
  6: { message: "Invalid opcode" },
  7: { message: "Type check error" },
  8: { message: "Cell overflow" },
  9: { message: "Cell underflow" },
  10: { message: "Dictionary error" },
  11: { message: "'Unknown' error" },
  12: { message: "Fatal error" },
  13: { message: "Out of gas error" },
  14: { message: "Virtualization error" },
  32: { message: "Action list is invalid" },
  33: { message: "Action list is too long" },
  34: { message: "Action is invalid or not supported" },
  35: { message: "Invalid source address in outbound message" },
  36: { message: "Invalid destination address in outbound message" },
  37: { message: "Not enough Toncoin" },
  38: { message: "Not enough extra currencies" },
  39: { message: "Outbound message does not fit into a cell after rewriting" },
  40: { message: "Cannot process a message" },
  41: { message: "Library reference is null" },
  42: { message: "Library change action error" },
  43: {
    message:
      "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree",
  },
  50: { message: "Account state size exceeded limits" },
  128: { message: "Null reference exception" },
  129: { message: "Invalid serialization prefix" },
  130: { message: "Invalid incoming message" },
  131: { message: "Constraints error" },
  132: { message: "Access denied" },
  133: { message: "Contract stopped" },
  134: { message: "Invalid argument" },
  135: { message: "Code of a contract was not found" },
  136: { message: "Invalid standard address" },
  138: { message: "Not a basechain address" },
  3602: { message: "No Vault Linked" },
  4010: { message: "Rejecting Unverified Token" },
  12421: { message: "Contract not initialized" },
  40577: { message: "Loser has insufficient funds" },
  42591: { message: "Insufficient Balance" },
  58091: { message: "Not Admin" },
  61135: { message: "Amount must be positive" },
} as const;

export const WalletMap_errors_backward = {
  "Stack underflow": 2,
  "Stack overflow": 3,
  "Integer overflow": 4,
  "Integer out of expected range": 5,
  "Invalid opcode": 6,
  "Type check error": 7,
  "Cell overflow": 8,
  "Cell underflow": 9,
  "Dictionary error": 10,
  "'Unknown' error": 11,
  "Fatal error": 12,
  "Out of gas error": 13,
  "Virtualization error": 14,
  "Action list is invalid": 32,
  "Action list is too long": 33,
  "Action is invalid or not supported": 34,
  "Invalid source address in outbound message": 35,
  "Invalid destination address in outbound message": 36,
  "Not enough Toncoin": 37,
  "Not enough extra currencies": 38,
  "Outbound message does not fit into a cell after rewriting": 39,
  "Cannot process a message": 40,
  "Library reference is null": 41,
  "Library change action error": 42,
  "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
  "Account state size exceeded limits": 50,
  "Null reference exception": 128,
  "Invalid serialization prefix": 129,
  "Invalid incoming message": 130,
  "Constraints error": 131,
  "Access denied": 132,
  "Contract stopped": 133,
  "Invalid argument": 134,
  "Code of a contract was not found": 135,
  "Invalid standard address": 136,
  "Not a basechain address": 138,
  "No Vault Linked": 3602,
  "Rejecting Unverified Token": 4010,
  "Contract not initialized": 12421,
  "Loser has insufficient funds": 40577,
  "Insufficient Balance": 42591,
  "Not Admin": 58091,
  "Amount must be positive": 61135,
} as const;

const WalletMap_types: ABIType[] = [
  {
    name: "DataSize",
    header: null,
    fields: [
      {
        name: "cells",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "bits",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "refs",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "SignedBundle",
    header: null,
    fields: [
      {
        name: "signature",
        type: {
          kind: "simple",
          type: "fixed-bytes",
          optional: false,
          format: 64,
        },
      },
      {
        name: "signedData",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: false } },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounceable",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "code", type: { kind: "simple", type: "cell", optional: true } },
      { name: "data", type: { kind: "simple", type: "cell", optional: true } },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: false },
      },
    ],
  },
  {
    name: "MessageParameters",
    header: null,
    fields: [
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: false },
      },
    ],
  },
  {
    name: "DeployParameters",
    header: null,
    fields: [
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "init",
        type: { kind: "simple", type: "StateInit", optional: false },
      },
    ],
  },
  {
    name: "StdAddress",
    header: null,
    fields: [
      {
        name: "workchain",
        type: { kind: "simple", type: "int", optional: false, format: 8 },
      },
      {
        name: "address",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "VarAddress",
    header: null,
    fields: [
      {
        name: "workchain",
        type: { kind: "simple", type: "int", optional: false, format: 32 },
      },
      {
        name: "address",
        type: { kind: "simple", type: "slice", optional: false },
      },
    ],
  },
  {
    name: "BasechainAddress",
    header: null,
    fields: [
      {
        name: "hash",
        type: { kind: "simple", type: "int", optional: true, format: 257 },
      },
    ],
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "JettonTransfer",
    header: 260734629,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "destination",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "responseDestination",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "customPayload",
        type: { kind: "simple", type: "cell", optional: true },
      },
      {
        name: "forwardTonAmount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "forwardPayload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "JettonTransferNotification",
    header: 1935855772,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "forwardPayload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "SetJettonWallet",
    header: 3010105720,
    fields: [
      {
        name: "jettonWallet",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "Claim",
    header: 2278860399,
    fields: [
      {
        name: "user",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Battle",
    header: 953628936,
    fields: [
      {
        name: "winner",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "loser",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "WithdrawRequest",
    header: 1488609783,
    fields: [
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "OwnerWithdraw",
    header: 318151818,
    fields: [
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "AdminJettonWithdraw",
    header: 1567757798,
    fields: [
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "WalletMap$Data",
    header: null,
    fields: [
      {
        name: "admin",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "walletAmounts",
        type: { kind: "dict", key: "address", value: "int" },
      },
      {
        name: "myJettonWallet",
        type: { kind: "simple", type: "address", optional: true },
      },
    ],
  },
];

const WalletMap_opcodes = {
  Deploy: 2490013878,
  DeployOk: 2952335191,
  FactoryDeploy: 1829761339,
  JettonTransfer: 260734629,
  JettonTransferNotification: 1935855772,
  SetJettonWallet: 3010105720,
  Claim: 2278860399,
  Battle: 953628936,
  WithdrawRequest: 1488609783,
  OwnerWithdraw: 318151818,
  AdminJettonWithdraw: 1567757798,
};

const WalletMap_getters: ABIGetter[] = [
  {
    name: "getWalletAmount",
    methodId: 102715,
    arguments: [
      {
        name: "wallet",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "getAllWallets",
    methodId: 111055,
    arguments: [],
    returnType: { kind: "dict", key: "address", value: "int" },
  },
  {
    name: "getMyJettonWallet",
    methodId: 119255,
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: true },
  },
];

export const WalletMap_getterMapping: { [key: string]: string } = {
  getWalletAmount: "getGetWalletAmount",
  getAllWallets: "getGetAllWallets",
  getMyJettonWallet: "getGetMyJettonWallet",
};

const WalletMap_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "empty" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "JettonTransferNotification" },
  },
  { receiver: "internal", message: { kind: "typed", type: "WithdrawRequest" } },
  { receiver: "internal", message: { kind: "typed", type: "Battle" } },
  { receiver: "internal", message: { kind: "typed", type: "Claim" } },
  { receiver: "internal", message: { kind: "typed", type: "SetJettonWallet" } },
  { receiver: "internal", message: { kind: "typed", type: "OwnerWithdraw" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "AdminJettonWithdraw" },
  },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
];

export class WalletMap implements Contract {
  public static readonly storageReserve = 0n;
  public static readonly errors = WalletMap_errors_backward;
  public static readonly opcodes = WalletMap_opcodes;

  static async init(admin: Address) {
    return await WalletMap_init(admin);
  }

  static async fromInit(admin: Address) {
    const __gen_init = await WalletMap_init(admin);
    const address = contractAddress(0, __gen_init);
    return new WalletMap(address, __gen_init);
  }

  static fromAddress(address: Address) {
    return new WalletMap(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: WalletMap_types,
    getters: WalletMap_getters,
    receivers: WalletMap_receivers,
    errors: WalletMap_errors,
  };

  constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | null
      | JettonTransferNotification
      | WithdrawRequest
      | Battle
      | Claim
      | SetJettonWallet
      | OwnerWithdraw
      | AdminJettonWithdraw
      | Deploy
  ) {
    let body: Cell | null = null;
    if (message === null) {
      body = new Cell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "JettonTransferNotification"
    ) {
      body = beginCell()
        .store(storeJettonTransferNotification(message))
        .endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "WithdrawRequest"
    ) {
      body = beginCell().store(storeWithdrawRequest(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Battle"
    ) {
      body = beginCell().store(storeBattle(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Claim"
    ) {
      body = beginCell().store(storeClaim(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "SetJettonWallet"
    ) {
      body = beginCell().store(storeSetJettonWallet(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "OwnerWithdraw"
    ) {
      body = beginCell().store(storeOwnerWithdraw(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "AdminJettonWithdraw"
    ) {
      body = beginCell().store(storeAdminJettonWithdraw(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Deploy"
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getGetWalletAmount(provider: ContractProvider, wallet: Address) {
    const builder = new TupleBuilder();
    builder.writeAddress(wallet);
    const source = (await provider.get("getWalletAmount", builder.build()))
      .stack;
    const result = source.readBigNumber();
    return result;
  }

  async getGetAllWallets(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("getAllWallets", builder.build())).stack;
    const result = Dictionary.loadDirect(
      Dictionary.Keys.Address(),
      Dictionary.Values.BigInt(257),
      source.readCellOpt()
    );
    return result;
  }

  async getGetMyJettonWallet(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get("getMyJettonWallet", builder.build()))
      .stack;
    const result = source.readAddressOpt();
    return result;
  }
}
