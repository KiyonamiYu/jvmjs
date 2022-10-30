import LocalVars from "./local-vars";
import OperandStack from "./operand-stack";
import BytecodeReader from "./bytecode-reader";
export default class Frame {
  public readonly localVars: LocalVars;
  public readonly operandStack: OperandStack;
  public next?: Frame; // stack is implemented as linked list
  public readonly bytecodeReader: BytecodeReader; // reference of bytecode reader
  // TODO
  constructor(bytecode: ArrayBuffer, maxLocals: number, maxStack: number) {
    this.localVars = new LocalVars(maxLocals);
    this.operandStack = new OperandStack(maxStack);
    this.bytecodeReader = new BytecodeReader(bytecode);
  }
}
