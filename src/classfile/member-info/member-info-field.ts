import MemberInfo from "./member-info";
import ClassReader from "../class-reader";
import { ConstantInfo } from "../constant-info";

export default class FieldInfo extends MemberInfo {
  public static read(classReader: ClassReader, constantPool: ConstantInfo[]): FieldInfo {
    const { accessFlags, nameIndex, descriptorIndex, attributes } = MemberInfo.read0(
      classReader,
      constantPool
    );
    return new FieldInfo(accessFlags, nameIndex, descriptorIndex, attributes, constantPool);
  }
}
