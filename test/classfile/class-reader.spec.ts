import ClassReader from "../../src/classfile/class-reader";

describe("read bytecode of class", () => {
  test("readUint8", () => {
    const bytes = Uint8Array.from([0, 1, 2, 255, 4, 5]).buffer;

    const classReader = new ClassReader(bytes);

    const uint80 = classReader.readUint8();
    expect(uint80).toBe(0);
    const uint81 = classReader.readUint8();
    expect(uint81).toBe(1);
    classReader.readUint8();
    const uint83 = classReader.readUint8();
    expect(uint83).toBe(255);
    const uint84 = classReader.readUint8();
    expect(uint84).toBe(4);
  });

  test("readUint16", () => {
    const bytes = Uint8Array.from([0, 1, 0, 255, 4, 5, 48, 48]).buffer;

    const classReader = new ClassReader(bytes);

    const uint160 = classReader.readUint16();
    expect(uint160).toBe(1);
    const uint161 = classReader.readUint16();
    expect(uint161).toBe(255);
    classReader.readUint16(); // skip 4, 5
    const uint163 = classReader.readUint16();
    expect(uint163).toBe(12336);
  });

  test("readUint32", () => {
    const bytes = Uint8Array.from([0, 0, 0, 1, 0, 0, 48, 48, 49, 49, 49, 49]).buffer;

    const classReader = new ClassReader(bytes);

    const n1 = classReader.readUint32();
    expect(n1).toBe(1);
    const n2 = classReader.readUint32();
    expect(n2).toBe(12336);
    const n3 = classReader.readUint32();
    expect(n3).toBe(825307441);
  });

  test("readUint64", () => {
    const bytes = Uint8Array.from([
      0, 0, 0, 0, 0, 0, 0, 1, 0, 49, 49, 49, 49, 49, 49, 48, 0, 0, 1, 1, 1, 1, 1, 1,
    ]).buffer;

    const classReader = new ClassReader(bytes);

    const n1 = classReader.readUint64();
    expect(n1).toBe(1n);
    const n2 = classReader.readUint64();
    expect(n2).toBe(13846361207288112n);
    const n3 = classReader.readUint64();
    expect(n3).toBe(1103823438081n);
  });

  test("readUint16s", () => {
    const bytes = Uint8Array.from([0, 4, 0, 1, 0, 255, 4, 5, 48, 48]).buffer;
    const classReader = new ClassReader(bytes);

    const nums = classReader.readUint16s();
    expect(nums).toStrictEqual([1, 255, 1029, 12336]);
  });

  test("readBytes", () => {
    const bytes = Uint8Array.from([0, 4, 0, 1, 0, 255, 4, 5, 48, 48]).buffer;
    const classReader = new ClassReader(bytes);

    classReader.readUint8();
    const subBytes = classReader.readBytes(9);
    expect(subBytes).toStrictEqual(bytes.slice(1));
  });
});
