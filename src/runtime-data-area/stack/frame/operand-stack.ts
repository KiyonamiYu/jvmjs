import { Slot } from "../../../types";

export default class OperandStack {
  private size: number;
  private readonly slots: Slot[];

  constructor(maxStack: number) {
    if (maxStack <= 0) {
      throw new Error("length of operand stack must be greater than zero");
    }
    this.slots = new Array<Slot>(maxStack);
    this.size = 0;
  }

  public push(value: Slot) {
    if (this.size >= this.slots.length) {
      throw new Error("length of operand stack must be less than max");
    }
    this.slots[this.size] = value;
    this.size += 1;
  }
  public pop<T>() {
    this.size -= 1;
    if (this.size < 0) {
      throw new Error("length of operand stack must be greater than zero");
    }
    return this.slots[this.size] as T;
  }
}
