import { Index8Instruction, NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";

// Store double into local variable

function dstore(frame: Frame, index: number) {
  const value = frame.operandStack.pop<number>();
  frame.localVars.set(index, value);
}

export class DSTORE extends Index8Instruction {
  execute(frame: Frame): void {
    if (this.index == null) {
      throw new Error("index of DSTORE is null");
    }
    dstore(frame, this.index);
  }
}

export class DSTORE_0 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    dstore(frame, 0);
  }
}

export class DSTORE_1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    dstore(frame, 1);
  }
}

export class DSTORE_2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    dstore(frame, 2);
  }
}

export class DSTORE_3 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    dstore(frame, 3);
  }
}
