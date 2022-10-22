import ConstantInfo from "./constant-info";
import ClassReader from "../class-reader";

/*
CONSTANT_NameAndType_info {
    u1 tag;
    u2 name_index;
    u2 descriptor_index;
}
*/
export default class ConstantNameAndTypeInfo extends ConstantInfo {
  private constructor(private nameIndex: number, private descriptorIndex: number) {
    super();
    this.nameIndex = nameIndex;
    this.descriptorIndex = descriptorIndex;
  }

  public static read(classReader: ClassReader): ConstantNameAndTypeInfo {
    const nameIndex = classReader.readUint16();
    const descriptorIndex = classReader.readUint16();
    return new ConstantNameAndTypeInfo(nameIndex, descriptorIndex);
  }
}
