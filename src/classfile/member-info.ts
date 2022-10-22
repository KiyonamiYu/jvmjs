import ClassReader from "./class-reader";
import { AttributeInfo, readAttribute } from "./attribute-info";
import { ConstantInfo } from "./constant-info";
import ConstantClassInfo from "./constant-info/constant-info-class";
import ConstantUtf8Info from "./constant-info/constant-info-utf8";
import { ConstantFieldrefInfo } from "./constant-info/constant-info-memberref";

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
  constructor(
    private accessFlags: number,
    private readonly nameIndex: number,
    private descriptorIndex: number,
    private attributes: AttributeInfo[],
    private readonly constantPool: ConstantInfo[] // ref of constant pool to get name
  ) {
    this.accessFlags = accessFlags;
    this.nameIndex = nameIndex;
    this.descriptorIndex = descriptorIndex;
    this.attributes = attributes;
    this.constantPool = constantPool;
  }

  public static read(classReader: ClassReader, constantPool: ConstantInfo[]) {
    const accessFlags = classReader.readUint16();
    const nameIndex = classReader.readUint16();
    const descriptorIndex = classReader.readUint16();
    const attributes = MemberInfo.readAttributes(classReader, constantPool);
    return new MemberInfo(accessFlags, nameIndex, descriptorIndex, attributes, constantPool);
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
}
