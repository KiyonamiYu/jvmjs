import { Index8Instruction, NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";

// Store long into local variable

function lstore(frame: Frame, index: number) {
  const value = frame.operandStack.pop<bigint>();
  frame.localVars.set(index, value);
}

export class LSTORE extends Index8Instruction {
  execute(frame: Frame): void {
    if (this.index == null) {
      throw new Error("index of LSTORE is null");
    }
    lstore(frame, this.index);
  }
}

export class LSTORE_0 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    lstore(frame, 0);
  }
}

export class LSTORE_1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    lstore(frame, 1);
  }
}

export class LSTORE_2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    lstore(frame, 2);
  }
}

export class LSTORE_3 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    lstore(frame, 3);
  }
}
