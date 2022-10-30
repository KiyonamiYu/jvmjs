import { NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";

export default class NOP extends NoOperandsInstruction {
  execute(frame: Frame): void {
    // do nothing
  }
}
