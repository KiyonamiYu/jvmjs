import AttributeInfo from "./attribute-info";
import ClassReader from "../class-reader";
import { ConstantInfo } from "../constant-info";
import readAttribute from "./read";

// only used in method_info

/*
Code_attribute {
    u2 attribute_name_index;
    u4 attribute_length;
    u2 max_stack;
    u2 max_locals;
    u4 code_length;
    u1 code[code_length];
    u2 exception_table_length;
    {   u2 start_pc;
        u2 end_pc;
        u2 handler_pc;
        u2 catch_type;
    } exception_table[exception_table_length];
    u2 attributes_count;
    attribute_info attributes[attributes_count];
}
*/
export default class CodeAttribute extends AttributeInfo {
  private constructor(
    private maxStack: number,
    private maxLocals: number,
    private code: ArrayBuffer,
    private exceptionTable: ExceptionTableEntry[],
    private attributes: AttributeInfo[]
  ) {
    super();
    this.maxStack = maxStack;
    this.maxLocals = maxLocals;
    this.code = code;
    this.exceptionTable = exceptionTable;
    this.attributes = attributes;
  }

  public static read(classReader: ClassReader, constantPool: ConstantInfo[]): CodeAttribute {
    const maxStack = classReader.readUint16();
    const maxLocals = classReader.readUint16();
    const codeLength = classReader.readUint32();
    const code = classReader.readBytes(codeLength);
    const exceptionTable = CodeAttribute.readExceptionTable(classReader);
    const attributes = CodeAttribute.readAttributes(classReader, constantPool);
    return new CodeAttribute(maxStack, maxLocals, code, exceptionTable, attributes);
  }

  private static readExceptionTable(classReader: ClassReader): ExceptionTableEntry[] {
    const length = classReader.readUint16();
    const exceptionTable = new Array<ExceptionTableEntry>(length);
    for (let i = 0; i < length; i += 1) {
      exceptionTable[i] = ExceptionTableEntry.read(classReader);
    }
    return exceptionTable;
  }

  private static readAttributes(
    classReader: ClassReader,
    constantPool: ConstantInfo[]
  ): AttributeInfo[] {
    const attributeCount = classReader.readUint16();
    const attributes = new Array<AttributeInfo>(attributeCount);
    for (let i = 0; i < attributeCount; i += 1) {
      attributes[i] = readAttribute(classReader, constantPool);
    }
    return attributes;
  }
}

class ExceptionTableEntry {
  private constructor(
    private startPc: number,
    private endPc: number,
    private handlerPc: number,
    private catchType: number
  ) {
    this.startPc = startPc;
    this.endPc = endPc;
    this.handlerPc = handlerPc;
    this.catchType = catchType;
  }

  public static read(classReader: ClassReader): ExceptionTableEntry {
    const startPc = classReader.readUint16();
    const endPc = classReader.readUint16();
    const handlerPc = classReader.readUint16();
    const catchType = classReader.readUint16();
    return new ExceptionTableEntry(startPc, endPc, handlerPc, catchType);
  }
}
