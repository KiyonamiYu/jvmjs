/*
CONSTANT_String_info {
    u1 tag;
    u2 string_index;
}
*/
import ConstantInfo from "./constant-info";
import ClassReader from "../class-reader";
import ConstantTag from "./constant-tag";

export default class ConstantClassInfo extends ConstantInfo {
  private constructor(private nameIndex: number) {
    super();
    this.nameIndex = nameIndex;
  }

  public static read(classReader: ClassReader): ConstantInfo {
    const nameIndex = classReader.readUint16();
    return new ConstantClassInfo(nameIndex);
  }
}
