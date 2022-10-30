import { MethodInfo } from "./classfile/member-info";
import { Thread } from "./runtime-data-area";
import { newInstruction } from "./instructions";

export default function interpret(methodInfo: MethodInfo) {
  const codeAttr = methodInfo.codeAttribute();
  if (codeAttr == null) {
    throw new Error("bytecode is null, please check");
  }
  const bytecode = codeAttr.code;

  const thread = new Thread();
  const frame = thread.newFrame(bytecode, codeAttr.maxLocals, codeAttr.maxStack);
  thread.push(frame);

  loop(thread);
}

function loop(thread: Thread) {
  const frame = thread.pop();
  const bytecodeReader = frame.bytecodeReader;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const opcode = bytecodeReader.readUint8();
    const instruction = newInstruction(opcode);
    instruction.fetchOperands(bytecodeReader);
    instruction.execute(frame);
    console.log("==================");
    console.log(frame, instruction);
  }
}
