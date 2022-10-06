import path from "path";
import fs from "fs";
import JSZip from "jszip";
import { Entry } from "./entry";

export default class ZipEntry implements Entry {
  /**
   * zip file full path, like ../z.zip or /x/y/z.zip
   * (there are many class files in the zip)
   * @private
   */
  private readonly zipPath: string;

  constructor(zipPath: string) {
    this.zipPath = zipPath;
  }

  async readClass(classname: string): Promise<ArrayBuffer> {
    const zipPath = path.resolve(__dirname, this.zipPath);
    return new Promise<ArrayBuffer>((resolve, reject) => {
      fs.readFile(zipPath, null, (err, buffer) => {
        if (err != null) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    }).then((buffer: ArrayBuffer) => {
      return JSZip.loadAsync(buffer).then(async (zip: JSZip) => {
        const classFile: JSZip.JSZipObject | null = zip.file(classname);
        if (classFile == null) {
          throw new Error(`'${classname}' doesn't exist in '${this.zipPath}'!`);
        }
        return classFile.async("arraybuffer");
      });
    });
  }
}
