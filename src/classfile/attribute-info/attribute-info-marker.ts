import AttributeInfo from "./attribute-info";

// used in ClassFile, field_info, method_info

/*
Deprecated_attribute {
    u2 attribute_name_index;
    u4 attribute_length; // 0
}
*/
export class DeprecatedAttribute extends AttributeInfo {
  private constructor() {
    super();
  }

  public static read(): DeprecatedAttribute {
    return new DeprecatedAttribute();
  }
}

/*
Synthetic_attribute {
    u2 attribute_name_index;
    u4 attribute_length; // 0
}
*/
export class SyntheticAttribute extends AttributeInfo {
  private constructor() {
    super();
  }

  public static read(): DeprecatedAttribute {
    return new SyntheticAttribute();
  }
}
