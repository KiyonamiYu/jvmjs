import AttributeInfo from "./attribute-info";
import ClassReader from "../class-reader";

/*
LineNumberTable_attribute {
    u2 attribute_name_index;
    u4 attribute_length;
    u2 line_number_table_length;
    {   u2 start_pc;
        u2 line_number;
    } line_number_table[line_number_table_length];
}
*/
export default class LineNumberTableAttribute extends AttributeInfo {
  constructor(private lineNumberTable: LineNumberTableEntry[]) {
    super();
    this.lineNumberTable = lineNumberTable;
  }

  public static read(classReader: ClassReader): LineNumberTableAttribute {
    const length = classReader.readUint16();
    const lineNumberTable = new Array<LineNumberTableEntry>(length);
    for (let i = 0; i < length; i += 1) {
      lineNumberTable[i] = LineNumberTableEntry.read(classReader);
    }
    return new LineNumberTableAttribute(lineNumberTable);
  }
}

class LineNumberTableEntry {
  private constructor(private startPc: number, private lineNumber: number) {
    this.startPc = startPc;
    this.lineNumber = lineNumber;
  }

  public static read(classReader: ClassReader): LineNumberTableEntry {
    const startPc = classReader.readUint16();
    const lineNumber = classReader.readUint16();
    return new LineNumberTableEntry(startPc, lineNumber);
  }
}
