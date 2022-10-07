import fs from "fs";
import path from "path";
import { Entry } from "./entry";
import WildcardEntry from "./entry-wildcard";
import CompositeEntry from "./entry-composite";

export default class Classpath {
  private readonly bootClasspath: Entry;
  private readonly extClasspath: Entry;
  private readonly userClasspath: Entry;

  private constructor(bootClasspath: Entry, extClasspath: Entry, userClasspath: Entry) {
    this.bootClasspath = bootClasspath;
    this.extClasspath = extClasspath;
    this.userClasspath = userClasspath;
  }

  public static parse(jrePath?: string, classpath?: string): Classpath {
    const bootClasspath: Entry = Classpath.parseBootClasspath(jrePath);
    const extClasspath: Entry = Classpath.parseExtClasspath(jrePath);
    const userClasspath: Entry = Classpath.parseUserClasspath(classpath);
    return new Classpath(bootClasspath, extClasspath, userClasspath);
  }

  public async readClass(classname: string): Promise<ArrayBuffer> {
    classname = `${classname}.class`;
    try {
      return await this.bootClasspath.readClass(classname);
    } catch (e) {
      // empty error handle
    }

    try {
      return await this.extClasspath.readClass(classname);
    } catch (e) {
      // empty error handle
    }

    return this.userClasspath.readClass(classname);
  }

  private static parseBootClasspath(jrePath?: string): Entry {
    jrePath = Classpath.getJrePath(jrePath);

    const jreLibPath = path.resolve(__dirname, jrePath, "lib", "*");
    return new WildcardEntry(jreLibPath);
  }

  private static parseExtClasspath(jrePath?: string): Entry {
    jrePath = Classpath.getJrePath(jrePath);

    const jreExtPath = path.resolve(__dirname, jrePath, "lib", "ext", "*");
    return new WildcardEntry(jreExtPath);
  }

  private static parseUserClasspath(classpath?: string): Entry {
    if (classpath == null || classpath === "") {
      classpath = "./";
    }
    return new CompositeEntry(classpath);
  }

  private static getJrePath(jrePath?: string): string {
    if (jrePath != null && jrePath !== "") {
      const jreAbsPath = path.resolve(__dirname, jrePath);
      if (fs.existsSync(jreAbsPath)) {
        return jreAbsPath;
      }
    }

    let jreAbsPath = path.resolve(__dirname, "./jre");
    if (fs.existsSync(jreAbsPath)) {
      return jreAbsPath;
    }

    const javaHomePath = process.env["JAVA_HOME"];
    if (javaHomePath != null) {
      jreAbsPath = path.resolve(javaHomePath, "jre");
      if (fs.existsSync(jreAbsPath)) {
        return jreAbsPath;
      }
    }

    throw new Error("can not find jre folder!");
  }
}
