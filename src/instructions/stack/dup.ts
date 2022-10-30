import { NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";
import { Slot } from "../../types";

// Duplicate the top operand stack value

/*
bottom -> top
[...][c][b][a]
             \_
               |
               V
[...][c][b][a][a]
*/
export class DUP extends NoOperandsInstruction {
  execute(frame: Frame): void {
    const slot = frame.operandStack.pop<Slot>();
    frame.operandStack.push(slot);
    frame.operandStack.push(slot); // TODO JObject 的复制问题
  }
}

/*
bottom -> top
[...][c][b][a]
          __/
         |
         V
[...][c][a][b][a]
*/
export class DUP_X1 extends NoOperandsInstruction {
  // TODO 像这种操作，如果是用来操作 Long 或者是 Double 就会有问题？可能只是为了方便操作这种两个字节的；但是我一直是以一个 Slot 代表；可以将 PushLong 插入空的 Slot
  execute(frame: Frame): void {
    const slot1 = frame.operandStack.pop<Slot>();
    const slot2 = frame.operandStack.pop<Slot>();
    frame.operandStack.push(slot1);
    frame.operandStack.push(slot2);
    frame.operandStack.push(slot1);
  }
}

/*
bottom -> top
[...][c][b][a]
       _____/
      |
      V
[...][a][c][b][a]
*/
export class DUP_X2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    const slot1 = frame.operandStack.pop<Slot>();
    const slot2 = frame.operandStack.pop<Slot>();
    const slot3 = frame.operandStack.pop<Slot>();
    frame.operandStack.push(slot1);
    frame.operandStack.push(slot3);
    frame.operandStack.push(slot2);
    frame.operandStack.push(slot1);
  }
}

// Duplicate the top one or two operand stack values
export class DUP2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    const slot1 = frame.operandStack.pop<Slot>();
    const slot2 = frame.operandStack.pop<Slot>();
    frame.operandStack.push(slot2);
    frame.operandStack.push(slot1);
    frame.operandStack.push(slot2);
    frame.operandStack.push(slot1);
  }
}

export class DUP2_X1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    const slot1 = frame.operandStack.pop<Slot>();
    const slot2 = frame.operandStack.pop<Slot>();
    const slot3 = frame.operandStack.pop<Slot>();
    frame.operandStack.push(slot2);
    frame.operandStack.push(slot1);
    frame.operandStack.push(slot3);
    frame.operandStack.push(slot2);
    frame.operandStack.push(slot1);
  }
}

export class DUP2_X2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    const slot1 = frame.operandStack.pop<Slot>();
    const slot2 = frame.operandStack.pop<Slot>();
    const slot3 = frame.operandStack.pop<Slot>();
    const slot4 = frame.operandStack.pop<Slot>();
    frame.operandStack.push(slot2);
    frame.operandStack.push(slot1);
    frame.operandStack.push(slot4);
    frame.operandStack.push(slot3);
    frame.operandStack.push(slot2);
    frame.operandStack.push(slot1);
  }
}
