import { Frame } from "./frame";

export default class Stack {
  private readonly maxSize: number;
  private size: number;
  private _top?: Frame; // stack is implemented as linked list

  constructor(maxSize: number) {
    if (maxSize <= 0) {
      throw new Error("length of jvm stack must be greater than zero");
    }
    this.maxSize = maxSize;
    this.size = 0;
  }

  public push(frame: Frame) {
    if (this.size >= this.maxSize) {
      throw new Error("java.lang.StackOverflowError");
    }

    frame.next = this._top;
    this._top = frame;
    this.size += 1;
  }

  public pop(): Frame {
    if (this._top == null) {
      throw new Error("jvm stack is empty");
    }

    const top = this._top;
    this._top = top.next;
    top.next = undefined;

    this.size -= 1;

    return top;
  }

  public top(): Frame {
    if (this._top == null) {
      throw new Error("jvm stack is empty");
    }
    return this._top;
  }
}
