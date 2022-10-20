import ConstantInfo from "./constant-info";
import ClassReader from "../class-reader";

class ConstantMemberInfo extends ConstantInfo {
  protected constructor(private classIndex: number, private nameAndTypeIndex: number) {
    super();
    this.classIndex = classIndex;
    this.nameAndTypeIndex = nameAndTypeIndex;
  }

  public static read(classReader: ClassReader): ConstantMemberInfo {
    const classIndex = classReader.readUint16();
    const nameAndTypeIndex = classReader.readUint16();
    return new ConstantMemberInfo(classIndex, nameAndTypeIndex);
  }
}

/**
 * CONSTANT_Fieldref_info {
 *     u1 tag;
 *     u2 class_index;
 *     u2 name_and_type_index;
 * }
 */
export class ConstantFieldrefInfo extends ConstantMemberInfo {}

/**
 * CONSTANT_Methodref_info {
 *     u1 tag;
 *     u2 class_index;
 *     u2 name_and_type_index;
 * }
 */
export class ConstantMethodrefInfo extends ConstantMemberInfo {}

/**
 * CONSTANT_InterfaceMethodref_info {
 *     u1 tag;
 *     u2 class_index;
 *     u2 name_and_type_index;
 * }
 */
export class ConstantInterfaceMethodrefInfo extends ConstantMemberInfo {}
