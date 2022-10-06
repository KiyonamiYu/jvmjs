import path from "path";
import fs from "fs";
import { Entry } from "./entry";

/**
 * dirname/xx.class
 */
export default class DirEntry implements Entry {
  private readonly dirname: string;

  constructor(dirname: string) {
    this.dirname = dirname;
  }

  async readClass(classname: string): Promise<ArrayBuffer> {
    const filename = path.resolve(__dirname, this.dirname, classname);
    return new Promise((resolve, reject) => {
      fs.readFile(filename, null, (err, buffer) => {
        if (err != null) {
          reject(err);
        } else {
          resolve(buffer.buffer);
        }
      });
    });
  }
}
