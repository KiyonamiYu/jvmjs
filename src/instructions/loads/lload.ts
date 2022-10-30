import { Index8Instruction, NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";

// Load long from local variable

function lload(frame: Frame, index: number) {
  const value = frame.localVars.get<bigint>(index);
  frame.operandStack.push(value);
}

export class LLOAD extends Index8Instruction {
  execute(frame: Frame): void {
    if (this.index == null) {
      throw new Error("index of LLOAD is null");
    }
    lload(frame, this.index);
  }
}

export class LLOAD_0 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    lload(frame, 0);
  }
}

export class LLOAD_1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    lload(frame, 1);
  }
}

export class LLOAD_2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    lload(frame, 2);
  }
}

export class LLOAD_3 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    lload(frame, 3);
  }
}
