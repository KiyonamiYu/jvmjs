import { Frame, BytecodeReader } from "../../runtime-data-area";
import { Instruction } from "../instruction";

// Push byte
export class BIPUSH implements Instruction {
  private value?: number; // u1

  fetchOperands(bytecodeReader: BytecodeReader): void {
    this.value = bytecodeReader.readInt8();
  }
  execute(frame: Frame): void {
    if (this.value == null) {
      throw Error("operand of BIPUSH is null");
    }
    frame.operandStack.push(this.value);
  }
}

// Push short
export class SIPUSH implements Instruction {
  private value?: number; // u2

  fetchOperands(bytecodeReader: BytecodeReader): void {
    this.value = bytecodeReader.readIn16();
  }
  execute(frame: Frame): void {
    if (this.value == null) {
      throw Error("operand of SIPUSH is null");
    }
    frame.operandStack.push(this.value);
  }
}
