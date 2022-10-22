import ConstantInfo from "./constant-info";
import ClassReader from "../class-reader";

/*
CONSTANT_Utf8_info {
    u1 tag;
    u2 length;
    u1 bytes[length];
}
*/
export default class ConstantUtf8Info extends ConstantInfo {
  private constructor(public readonly str: string) {
    super();
    this.str = str;
  }

  public static read(classReader: ClassReader): ConstantUtf8Info {
    const len = classReader.readUint16();
    const bytes = classReader.readBytes(len);
    const str = ConstantUtf8Info.decodeMUTF8(bytes);
    return new ConstantUtf8Info(str);
  }

  private static decodeMUTF8(bytes: ArrayBuffer) {
    // TODO MUTF8
    return new TextDecoder().decode(bytes);
  }
}
