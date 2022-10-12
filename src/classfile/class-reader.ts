export default class ClassReader {
  private bytecode: DataView;
  private cursor: number;

  constructor(bytecode: ArrayBuffer) {
    this.bytecode = new DataView(bytecode);
    this.cursor = 0;
  }

  public readUint8() {
    const n = this.bytecode.getUint8(this.cursor);
    this.cursor += 1;
    return n;
  }

  public readUint16() {
    const n = this.bytecode.getUint16(this.cursor);
    this.cursor += 2;
    return n;
  }

  public readUint32() {
    const n = this.bytecode.getUint32(this.cursor);
    this.cursor += 4;
    return n;
  }

  public readUint64() {
    const n = this.bytecode.getBigUint64(this.cursor);
    this.cursor += 8;
    return n;
  }

  public readUint16s(): number[] {
    const unit16s = [];
    let n = this.readUint16(); // the number of uint16
    while (n > 0) {
      unit16s.push(this.readUint16());
      n -= 1;
    }
    return unit16s;
  }

  public readBytes(n: number): ArrayBuffer {
    const bytes = this.bytecode.buffer.slice(this.cursor, this.cursor + n);
    this.cursor += n;
    return bytes;
  }
}
