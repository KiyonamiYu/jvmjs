import ClassReader from "./class-reader";
import { AttributeInfo, readAttribute } from "./attribute-info";
import { ConstantInfo } from "./constant-info";

/*
field_info {
    u2             access_flags;
    u2             name_index;
    u2             descriptor_index;
    u2             attributes_count;
    attribute_info attributes[attributes_count];
}
method_info {
    u2             access_flags;
    u2             name_index;
    u2             descriptor_index;
    u2             attributes_count;
    attribute_info attributes[attributes_count];
}
*/

export class MemberInfo {
  private accessFlags: number;
  private nameIndex: number;
  private descriptorIndex: number;
  attributes: AttributeInfo[];

  constructor(
    accessFlags: number,
    nameIndex: number,
    descriptorIndex: number,
    attributes: AttributeInfo[]
  ) {
    this.accessFlags = accessFlags;
    this.nameIndex = nameIndex;
    this.descriptorIndex = descriptorIndex;
    this.attributes = attributes;
  }

  public static read(classReader: ClassReader, constantPool: ConstantInfo[]) {
    const accessFlags = classReader.readUint16();
    const nameIndex = classReader.readUint16();
    const descriptorIndex = classReader.readUint16();
    const attributes = MemberInfo.readAttributes(classReader, constantPool);
    return new MemberInfo(accessFlags, nameIndex, descriptorIndex, attributes);
  }

  private static readAttributes(classReader: ClassReader, constantPool: ConstantInfo[]) {
    const attributeCount = classReader.readUint16();
    const attributes = new Array<AttributeInfo>(attributeCount); // TODO
    for (let i = 0; i < attributeCount; i += 1) {
      attributes[i] = readAttribute(classReader, constantPool);
    }
    return attributes;
  }
}
