import { Index8Instruction, NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";

// Store int into local variable

function istore(frame: Frame, index: number) {
  const value = frame.operandStack.pop<number>();
  frame.localVars.set(index, value);
}

export class ISTORE extends Index8Instruction {
  execute(frame: Frame): void {
    if (this.index == null) {
      throw new Error("index of ISTORE is null");
    }
    istore(frame, this.index);
  }
}

export class ISTORE_0 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    istore(frame, 0);
  }
}

export class ISTORE_1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    istore(frame, 1);
  }
}

export class ISTORE_2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    istore(frame, 2);
  }
}

export class ISTORE_3 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    istore(frame, 3);
  }
}
