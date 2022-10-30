import DirEntry from "../../src/classpath/entry-dir";
import ZipEntry from "../../src/classpath/entry-zip";
import { Frame } from "../../src/runtime-data-area";
import JObject from "../../src/runtime-data-area/stack/frame/object";

describe("local-vars", () => {
  test("normal", async () => {
    const frame = new Frame(100, 100);
    frame.localVars.set(0, 100);
    frame.localVars.set(1, -100);
    frame.localVars.set(2, 2997924580);
    frame.localVars.set(4, -2997924580);
    frame.localVars.set(6, 3.1415926);
    frame.localVars.set(7, 2.71828182845);
    frame.localVars.set(9, null);

    expect(frame.localVars.get<number>(0)).toBe(100);
    expect(frame.localVars.get<number>(1)).toBe(-100);
    expect(frame.localVars.get<bigint>(2)).toBe(2997924580);
    expect(frame.localVars.get<bigint>(4)).toBe(-2997924580);
    expect(frame.localVars.get<number>(6)).toBe(3.1415926);
    expect(frame.localVars.get<number>(7)).toBe(2.71828182845);
    expect(frame.localVars.get<JObject | null>(9)).toBe(null);
  });
});
