import AttributeInfo from "./attribute-info";
import ClassReader from "../class-reader";

// indicate source file name
// only used in ClassFile

/*
SourceFile_attribute {
    u2 attribute_name_index;
    u4 attribute_length; // 2
    u2 sourcefile_index;
}
*/
export default class ExceptionsAttribute extends AttributeInfo {
  private constructor(private exceptionIndexTable: number[]) {
    super();
    this.exceptionIndexTable = exceptionIndexTable;
  }

  public static read(classReader: ClassReader): ExceptionsAttribute {
    const exceptionIndexTable = classReader.readUint16s();
    return new ExceptionsAttribute(exceptionIndexTable);
  }
}
