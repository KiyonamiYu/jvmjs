import { NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";
import { Slot } from "../../types";

export class SWAP extends NoOperandsInstruction {
  execute(frame: Frame): void {
    const slot1 = frame.operandStack.pop<Slot>();
    const slot2 = frame.operandStack.pop<Slot>();
    frame.operandStack.push(slot1);
    frame.operandStack.push(slot2);
  }
}
