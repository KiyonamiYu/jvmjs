import ClassReader from "../class-reader";
import { AttributeInfo, readAttribute } from "../attribute-info";
import { ConstantInfo } from "../constant-info";
import ConstantUtf8Info from "../constant-info/constant-info-utf8";

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

export default class MemberInfo {
  protected constructor(
    private readonly accessFlags: number,
    private readonly nameIndex: number,
    private readonly descriptorIndex: number,
    protected readonly attributes: AttributeInfo[],
    private readonly constantPool: ConstantInfo[] // ref of constant pool to get name
  ) {
    this.accessFlags = accessFlags;
    this.nameIndex = nameIndex;
    this.descriptorIndex = descriptorIndex;
    this.attributes = attributes;
    this.constantPool = constantPool;
  }

  protected static read0(classReader: ClassReader, constantPool: ConstantInfo[]) {
    const accessFlags = classReader.readUint16();
    const nameIndex = classReader.readUint16();
    const descriptorIndex = classReader.readUint16();
    const attributes = MemberInfo.readAttributes(classReader, constantPool);
    return {
      accessFlags,
      nameIndex,
      descriptorIndex,
      attributes,
    };
  }

  private static readAttributes(classReader: ClassReader, constantPool: ConstantInfo[]) {
    const attributeCount = classReader.readUint16();
    const attributes = new Array<AttributeInfo>(attributeCount);
    for (let i = 0; i < attributeCount; i += 1) {
      attributes[i] = readAttribute(classReader, constantPool);
    }
    return attributes;
  }

  public name() {
    const constantUtf8Info = this.constantPool[this.nameIndex] as ConstantUtf8Info;
    return constantUtf8Info.str;
  }

  public descriptor() {
    const constantUtf8Info = this.constantPool[this.descriptorIndex] as ConstantUtf8Info;
    return constantUtf8Info.str;
  }
}
