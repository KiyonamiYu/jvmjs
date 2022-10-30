import { Index8Instruction, NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";
import { JObject } from "../../types";

// Load reference from local variable

function aload(frame: Frame, index: number) {
  const value = frame.localVars.get<JObject | null>(index);
  frame.operandStack.push(value);
}

export class ALOAD extends Index8Instruction {
  execute(frame: Frame): void {
    if (this.index == null) {
      throw new Error("index of ALOAD is null");
    }
    aload(frame, this.index);
  }
}

export class ALOAD_0 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    aload(frame, 0);
  }
}

export class ALOAD_1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    aload(frame, 1);
  }
}

export class ALOAD_2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    aload(frame, 2);
  }
}

export class ALOAD_3 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    aload(frame, 3);
  }
}
