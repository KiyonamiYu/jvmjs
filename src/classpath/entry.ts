import { delimiter } from "path";

export interface Entry {
  readClass(classname: string): Promise<ArrayBuffer>;
}
