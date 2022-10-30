import { NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";
import { Slot } from "../../types";

export class POP extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.pop<Slot>();
  }
}

export class POP2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.pop<Slot>();
    frame.operandStack.pop<Slot>();
  }
}
