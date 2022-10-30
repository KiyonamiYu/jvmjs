import { Index8Instruction, NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";

// Load float from local variable

function dload(frame: Frame, index: number) {
  const value = frame.localVars.get<number>(index);
  frame.operandStack.push(value);
}

export class DLOAD extends Index8Instruction {
  execute(frame: Frame): void {
    if (this.index == null) {
      throw new Error("index of DLOAD is null");
    }
    dload(frame, this.index);
  }
}

export class DLOAD_0 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    dload(frame, 0);
  }
}

export class DLOAD_1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    dload(frame, 1);
  }
}

export class DLOAD_2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    dload(frame, 2);
  }
}

export class DLOAD_3 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    dload(frame, 3);
  }
}
