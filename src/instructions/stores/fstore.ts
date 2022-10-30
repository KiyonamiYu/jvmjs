import { Index8Instruction, NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";

// Store float into local variable

function fstore(frame: Frame, index: number) {
  const value = frame.operandStack.pop<number>();
  frame.localVars.set(index, value);
}

export class FSTORE extends Index8Instruction {
  execute(frame: Frame): void {
    if (this.index == null) {
      throw new Error("index of FSTORE is null");
    }
    fstore(frame, this.index);
  }
}

export class FSTORE_0 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    fstore(frame, 0);
  }
}

export class FSTORE_1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    fstore(frame, 1);
  }
}

export class FSTORE_2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    fstore(frame, 2);
  }
}

export class FSTORE_3 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    fstore(frame, 3);
  }
}
