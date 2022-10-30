import { Slot } from "../../../types";

export default class LocalVars {
  private readonly slots: Slot[];

  constructor(maxLocals: number) {
    if (maxLocals < 0) {
      throw new Error("length of localVars must be greater than zero");
    }
    this.slots = new Array<Slot>(maxLocals);
  }

  public set(index: number, slot: Slot) {
    // 如果是 double 或者是 long，则占用两个位置（即 this.slots[index + 1] = undefined）
    this.slots[index] = slot;
  }

  public get<T>(index: number) {
    return this.slots[index] as T;
  }

  public getThis() {
    return this.get<boolean>(0);
  }
}
