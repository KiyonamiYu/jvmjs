import fs from "fs";
import path from "path";
import { Entry } from "./entry";
import ZipEntry from "./entry-zip";

export default class WildcardEntry implements Entry {
  private readonly entries: Entry[];
  // path end of '*'
  constructor(dirname: string) {
    if (!dirname.endsWith("*")) {
      throw new Error(`${path} doesn't end of wildcard!`);
    }
    this.entries = [];
    dirname = dirname.slice(0, dirname.length - 1); // delete '*'
    dirname = path.resolve(__dirname, dirname);

    // traverse all zips and generate corresponding zip entries
    fs.readdirSync(dirname, { withFileTypes: true }).forEach((dirent) => {
      const currentPath = path.resolve(dirname, dirent.name);
      if (
        dirent.isFile() &&
        [".jar", ".JAR"].some((suffix: string) => currentPath.endsWith(suffix))
      ) {
        this.entries.push(new ZipEntry(currentPath));
        return;
      }
    });
  }

  public async readClass(classname: string): Promise<ArrayBuffer> {
    const readClassPromises = this.entries.map((entry) => entry.readClass(classname));
    // 'Promise.any' returns a single promise that fulfills as soon as any of the promises in the iterable fulfills, with the value of the fulfilled promise.
    return Promise.any(readClassPromises).catch(() => {
      throw new Error(`there are no class named ${classname}`);
    });
  }
}
