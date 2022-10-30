import { Index8Instruction, NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";

// Load int from local variable

function iload(frame: Frame, index: number) {
  const value = frame.localVars.get<number>(index);
  frame.operandStack.push(value);
}

export class ILOAD extends Index8Instruction {
  execute(frame: Frame): void {
    if (this.index == null) {
      throw new Error("index of ILOAD is null");
    }
    iload(frame, this.index);
  }
}

export class ILOAD_0 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    iload(frame, 0);
  }
}

export class ILOAD_1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    iload(frame, 1);
  }
}

export class ILOAD_2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    iload(frame, 2);
  }
}

export class ILOAD_3 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    iload(frame, 3);
  }
}
