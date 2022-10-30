import { Frame, Stack } from "./stack";

/*
JVM
  Thread
    pc
    Stack
      Frame
        LocalVars
        OperandStack
*/
export default class Thread {
  private pc: number;
  public readonly stack: Stack;

  constructor() {
    this.pc = 0;
    this.stack = new Stack(1024); // TODO
  }
  public newFrame(bytecode: ArrayBuffer, maxLocals: number, maxStack: number) {
    return new Frame(bytecode, maxLocals, maxStack);
  }
  public push(frame: Frame) {
    this.stack.push(frame);
  }
  public pop(): Frame {
    return this.stack.pop();
  }
}
