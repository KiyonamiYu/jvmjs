import { NoOperandsInstruction } from "../instruction";
import { Frame } from "../../runtime-data-area";

// Push null
export class ACONST_NULL extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(null);
  }
}

// Push double
export class DCONST_0 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(0.0);
  }
}

export class DCONST_1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(1.0);
  }
}

// Push float
export class FCONST_0 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(0.0);
  }
}

export class FCONST_1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(1.0);
  }
}

export class FCONST_2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(2.0);
  }
}

// Push int constant
export class ICONST_M1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(-1);
  }
}

export class ICONST_0 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(0);
  }
}

export class ICONST_1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(1);
  }
}

export class ICONST_2 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(2);
  }
}

export class ICONST_3 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(3);
  }
}

export class ICONST_4 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(4);
  }
}

export class ICONST_5 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(5);
  }
}

// Push long constant
export class LCONST_0 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(0);
  }
}

export class LCONST_1 extends NoOperandsInstruction {
  execute(frame: Frame): void {
    frame.operandStack.push(1);
  }
}
