export default class BytecodeReader {
  private code: DataView;
  private pc: number;

  constructor(code: ArrayBuffer) {
    this.code = new DataView(code);
    this.pc = 0;
  }

  public reset(code: ArrayBuffer, pc: number) {
    this.code = new DataView(code);
    this.pc = pc;
  }

  public readUint8() {
    const n = this.code.getUint8(this.pc);
    this.pc += 1;
    return n;
  }

  public readInt8() {
    const n = this.code.getInt8(this.pc);
    this.pc += 1;
    return n;
  }

  public readUint16() {
    const n = this.code.getUint16(this.pc);
    this.pc += 2;
    return n;
  }

  public readIn16() {
    const n = this.code.getInt16(this.pc);
    this.pc += 2;
    return n;
  }

  public readUint32() {
    const n = this.code.getUint32(this.pc);
    this.pc += 4;
    return n;
  }

  public readIn32() {
    const n = this.code.getInt32(this.pc);
    this.pc += 4;
    return n;
  }

  // used by lookupswitch and tableswitch
  public readIn32s(n: number) {
    const int32s = [];
    for (let i = 0; i < n; i += 1) {
      int32s.push(this.readIn32());
    }
    return int32s;
  }

  // used by lookupswitch and tableswitch
  public skipPadding() {
    while (this.pc % 4 != 0) {
      this.readUint8();
    }
  }
}
