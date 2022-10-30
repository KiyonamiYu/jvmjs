import { Frame } from "../runtime-data-area";
import { BytecodeReader } from "../runtime-data-area";

export interface Instruction {
  fetchOperands(bytecodeReader: BytecodeReader): void;
  execute(frame: Frame): void;
}

export abstract class NoOperandsInstruction implements Instruction {
  abstract execute(frame: Frame): void;

  fetchOperands(bytecodeReader: BytecodeReader): void {
    // nothing to do
  }
}

export abstract class BranchInstruction implements Instruction {
  private offset?: number;

  abstract execute(frame: Frame): void;

  fetchOperands(bytecodeReader: BytecodeReader): void {
    this.offset = bytecodeReader.readIn16();
  }
}

export abstract class Index8Instruction implements Instruction {
  protected index?: number;

  abstract execute(frame: Frame): void;

  fetchOperands(bytecodeReader: BytecodeReader): void {
    this.index = bytecodeReader.readUint8();
  }
}

export abstract class Index16Instruction implements Instruction {
  private index?: number;

  abstract execute(frame: Frame): void;

  fetchOperands(bytecodeReader: BytecodeReader): void {
    this.index = bytecodeReader.readUint16();
  }
}
