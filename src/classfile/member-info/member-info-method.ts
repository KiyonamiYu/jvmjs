import MemberInfo from "./member-info";
import { CodeAttribute } from "../attribute-info";
import ClassReader from "../class-reader";
import { ConstantInfo } from "../constant-info";

export default class MethodInfo extends MemberInfo {
  public static read(classReader: ClassReader, constantPool: ConstantInfo[]): MethodInfo {
    const { accessFlags, nameIndex, descriptorIndex, attributes } = MemberInfo.read0(
      classReader,
      constantPool
    );
    return new MethodInfo(accessFlags, nameIndex, descriptorIndex, attributes, constantPool);
  }

  public codeAttribute(): CodeAttribute | null {
    for (let i = 0; i < this.attributes.length; i += 1) {
      const attribute = this.attributes[i];
      if (attribute instanceof CodeAttribute) {
        return attribute;
      }
    }
    return null;
  }
}
