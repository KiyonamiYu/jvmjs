import AttributeInfo from "./attribute-info";
import ClassReader from "../class-reader";

/*
LocalVariableTable_attribute {
    u2 attribute_name_index;
    u4 attribute_length;
    u2 local_variable_table_length;
    {   u2 start_pc;
        u2 length;
        u2 name_index;
        u2 descriptor_index;
        u2 index;
    } local_variable_table[local_variable_table_length];
}
*/
export default class LocalVariableTableAttribute extends AttributeInfo {
  private constructor(private localVariableTable: LocalVariableTableEntry[]) {
    super();
    this.localVariableTable = localVariableTable;
  }

  public static read(classReader: ClassReader): LocalVariableTableAttribute {
    const length = classReader.readUint16();
    const localVariableTable = new Array<LocalVariableTableEntry>(length);
    for (let i = 0; i < length; i += 1) {
      localVariableTable[i] = LocalVariableTableEntry.read(classReader);
    }
    return new LocalVariableTableAttribute(localVariableTable);
  }
}

class LocalVariableTableEntry {
  private constructor(
    private startPc: number,
    private length: number,
    private nameIndex: number,
    private descriptorIndex: number,
    private index: number
  ) {
    this.startPc = startPc;
    this.length = length;
    this.nameIndex = nameIndex;
    this.descriptorIndex = descriptorIndex;
    this.index = index;
  }

  public static read(classReader: ClassReader): LocalVariableTableEntry {
    const startPc = classReader.readUint16();
    const length = classReader.readUint16();
    const nameIndex = classReader.readUint16();
    const descriptorIndex = classReader.readUint16();
    const index = classReader.readUint16();
    return new LocalVariableTableEntry(startPc, length, nameIndex, descriptorIndex, index);
  }
}
