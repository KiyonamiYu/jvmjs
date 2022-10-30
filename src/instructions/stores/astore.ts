import { Index8Instruction, NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";

// Store reference into local variable

function astore(frame: Frame, index: number) {
  const value = frame.operandStack.pop<number>();
  frame.localVars.set(index, value);
}

export class ASTORE extends Index8Instruction {
  execute(frame: Frame): void {
    if (this.index == null) {
      throw new Error("index of ASTORE is null");
    }
    astore(frame, this.index);
  }
}

export class ASTORE_0 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    astore(frame, 0);
  }
}

export class ASTORE_1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    astore(frame, 1);
  }
}

export class ASTORE_2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    astore(frame, 2);
  }
}

export class ASTORE_3 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    astore(frame, 3);
  }
}
