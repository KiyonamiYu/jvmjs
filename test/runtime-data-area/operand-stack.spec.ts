import DirEntry from "../../src/classpath/entry-dir";
import ZipEntry from "../../src/classpath/entry-zip";
import { Frame } from "../../src/runtime-data-area";
import JObject from "../../src/runtime-data-area/stack/frame/object";

describe("local-vars", () => {
  test("normal", async () => {
    const frame = new Frame(100, 100);
    frame.operandStack.push(100);
    frame.operandStack.push(-100);
    frame.operandStack.push(2997924580);
    frame.operandStack.push(-2997924580);
    frame.operandStack.push(3.1415926);
    frame.operandStack.push(2.71828182845);
    frame.operandStack.push(null);

    expect(frame.operandStack.pop<JObject | null>()).toBe(null);
    expect(frame.operandStack.pop<number>()).toBe(2.71828182845);
    expect(frame.operandStack.pop<number>()).toBe(3.1415926);
    expect(frame.operandStack.pop<bigint>()).toBe(-2997924580);
    expect(frame.operandStack.pop<bigint>()).toBe(2997924580);
    expect(frame.operandStack.pop<number>()).toBe(-100);
    expect(frame.operandStack.pop<number>()).toBe(100);
  });
});
