import AttributeInfo from "./attribute-info";
import ClassReader from "../class-reader";

/*
attribute_info {
    u2 attribute_name_index;
    u4 attribute_length;
    u1 info[attribute_length];
}
*/

export default class UnparsedAttribute extends AttributeInfo {
  private constructor(private name: string, private length: number, private info: ArrayBuffer) {
    super();
    this.name = name;
    this.length = length;
    this.info = info;
  }

  public static read(classReader: ClassReader, name: string, length: number): UnparsedAttribute {
    const info = classReader.readBytes(length);
    return new UnparsedAttribute(name, length, info);
  }
}
