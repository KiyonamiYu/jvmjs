import ConstantInfo from "./constant-info";
import ClassReader from "../class-reader";
import ConstantTag from "./constant-tag";

/*
CONSTANT_Class_info {
    u1 tag;
    u2 name_index;
}
*/
export default class ConstantClassInfo extends ConstantInfo {
  private constructor(public readonly nameIndex: number) {
    super();
    this.nameIndex = nameIndex;
  }

  public static read(classReader: ClassReader): ConstantInfo {
    const nameIndex = classReader.readUint16();
    return new ConstantClassInfo(nameIndex);
  }
}
