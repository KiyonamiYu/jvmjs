import ConstantInfo from "./constant-info";
import ClassReader from "../class-reader";
import ConstantTag from "./constant-tag";

/*
CONSTANT_MethodType_info {
    u1 tag;
    u2 descriptor_index;
}
*/
export class ConstantMethodTypeInfo extends ConstantInfo {
  private constructor(private descriptorIndex: number) {
    super();
    this.descriptorIndex = descriptorIndex;
  }

  public static read(classReader: ClassReader): ConstantMethodTypeInfo {
    const descriptorIndex = classReader.readUint16();
    return new ConstantMethodTypeInfo(descriptorIndex);
  }
}

/*
CONSTANT_MethodHandle_info {
    u1 tag;
    u1 reference_kind;
    u2 reference_index;
}
*/
export class ConstantMethodHandleInfo extends ConstantInfo {
  private constructor(private referenceKind: number, private referenceIndex: number) {
    super();
    this.referenceKind = referenceKind;
    this.referenceIndex = referenceIndex;
  }

  public static read(classReader: ClassReader): ConstantMethodHandleInfo {
    const referenceKind = classReader.readUint8();
    const referenceIndex = classReader.readUint16();
    return new ConstantMethodHandleInfo(referenceKind, referenceIndex);
  }
}

/*
CONSTANT_InvokeDynamic_info {
    u1 tag;
    u2 bootstrap_method_attr_index;
    u2 name_and_type_index;
}
*/
export class ConstantInvokeDynamicInfo extends ConstantInfo {
  private constructor(private bootstrapMethodAttrIndex: number, private nameAndTypeIndex: number) {
    super();
    this.bootstrapMethodAttrIndex = bootstrapMethodAttrIndex;
    this.nameAndTypeIndex = nameAndTypeIndex;
  }

  public static read(classReader: ClassReader): ConstantInvokeDynamicInfo {
    const bootstrapMethodAttrIndex = classReader.readUint16();
    const nameAndTypeIndex = classReader.readUint16();
    return new ConstantInvokeDynamicInfo(bootstrapMethodAttrIndex, nameAndTypeIndex);
  }
}
