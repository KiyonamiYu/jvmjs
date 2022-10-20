import AttributeInfo from "./attribute-info";
import ClassReader from "../class-reader";

// the value of a constant expression
// only used in field_info

/*
ConstantValue_attribute {
    u2 attribute_name_index;
    u4 attribute_length; // 2
    u2 constantvalue_index;
}
*/
export default class ConstantValueAttribute extends AttributeInfo {
  private constructor(private constantValueIndex: number) {
    super();
    this.constantValueIndex = constantValueIndex;
  }

  public static read(classReader: ClassReader): ConstantValueAttribute {
    const constantValueIndex = classReader.readUint16();
    return new ConstantValueAttribute(constantValueIndex);
  }
}
