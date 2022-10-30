import { Index8Instruction, NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";

// Load float from local variable

function fload(frame: Frame, index: number) {
  const value = frame.localVars.get<number>(index);
  frame.operandStack.push(value);
}

export class FLOAD extends Index8Instruction {
  execute(frame: Frame): void {
    if (this.index == null) {
      throw new Error("index of FLOAD is null");
    }
    fload(frame, this.index);
  }
}

export class FLOAD_0 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    fload(frame, 0);
  }
}

export class FLOAD_1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    fload(frame, 1);
  }
}

export class FLOAD_2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    fload(frame, 2);
  }
}

export class FLOAD_3 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    fload(frame, 3);
  }
}
