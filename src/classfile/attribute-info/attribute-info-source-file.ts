import AttributeInfo from "./attribute-info";
import ClassReader from "../class-reader";

// source file name
// only used in ClassFile

/*
SourceFile_attribute {
    u2 attribute_name_index;
    u4 attribute_length; // 2
    u2 sourcefile_index;
}
*/
export default class SourceFileAttribute extends AttributeInfo {
  private constructor(private sourceFileIndex: number) {
    super();
    this.sourceFileIndex = sourceFileIndex;
  }

  public static read(classReader: ClassReader): SourceFileAttribute {
    const sourceFileIndex = classReader.readUint16();
    return new SourceFileAttribute(sourceFileIndex);
  }
}
