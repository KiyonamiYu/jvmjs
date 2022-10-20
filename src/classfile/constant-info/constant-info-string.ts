import ConstantInfo from "./constant-info";
import ClassReader from "../class-reader";

/*
CONSTANT_String_info {
    u1 tag;
    u2 string_index;
}
*/
export default class ConstantStringInfo extends ConstantInfo {
  private constructor(private stringIndex: number) {
    super();
    this.stringIndex = stringIndex;
  }

  public static read(classReader: ClassReader): ConstantStringInfo {
    const stringIndex = classReader.readUint16();
    return new ConstantStringInfo(stringIndex);
  }
}
