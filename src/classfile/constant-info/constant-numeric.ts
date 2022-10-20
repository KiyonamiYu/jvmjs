import ConstantInfo from "./constant-info";
import ClassReader from "../class-reader";

/*
CONSTANT_Integer_info {
    u1 tag;
    u4 bytes;
}
*/
export class ConstantIntegerInfo extends ConstantInfo {
  private constructor(private value: number) {
    super();
    this.value = value;
  }

  public static read(classReader: ClassReader): ConstantInfo {
    const value = classReader.readUint32();
    return new ConstantIntegerInfo(value);
  }
}

/*
CONSTANT_Long_info {
    u1 tag;
    u4 high_bytes;
    u4 low_bytes;
}
*/
export class ConstantLongInfo extends ConstantInfo {
  constructor(private value: bigint) {
    super();
    this.value = value;
  }
  public static read(classReader: ClassReader): ConstantInfo {
    const value = classReader.readUint64();
    return new ConstantLongInfo(value);
  }
}

/*
CONSTANT_Float_info {
    u1 tag;
    u4 bytes;
}
*/
export class ConstantFloatInfo extends ConstantInfo {
  private constructor(private value: number) {
    super();
    this.value = value;
  }

  public static read(classReader: ClassReader): ConstantInfo {
    const value = classReader.readUint32(); // TODO 将字节转化为 32 位浮点数
    return new ConstantFloatInfo(value as any as number);
  }
}

/*
CONSTANT_Double_info {
    u1 tag;
    u4 high_bytes;
    u4 low_bytes;
}
*/
export class ConstantDoubleInfo extends ConstantInfo {
  private constructor(private value: number) {
    super();
    this.value = value;
  }

  public static read(classReader: ClassReader): ConstantInfo {
    const value = classReader.readUint64(); // TODO 字节转化为 double
    return new ConstantDoubleInfo(value as any as number);
  }
}
