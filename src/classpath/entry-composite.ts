import { delimiter } from "path";
import { Entry } from "./entry";
import ZipEntry from "./entry-zip";
import DirEntry from "./entry-dir";
import WildcardEntry from "./entry-wildcard";

export default class CompositeEntry implements Entry {
  private readonly entries: Entry[];

  constructor(pathList: string) {
    this.entries = pathList.split(delimiter).map((path) => {
      if ([".jar", ".JAR", ".zip", ".ZIP"].some((suffix) => path.endsWith(suffix))) {
        return new ZipEntry(path);
      }
      if (path.endsWith("*")) {
        return new WildcardEntry(path);
      }
      return new DirEntry(path);
    });
  }

  // equals readClass function of WildcardEntry
  public async readClass(classname: string): Promise<ArrayBuffer> {
    for (let i = 0; i < this.entries.length; i += 1) {
      try {
        return await this.entries[i].readClass(classname);
      } catch (e) {
        // empty error handle
      }
    }
    throw new Error(`there are no class named ${classname}`);
  }
}
