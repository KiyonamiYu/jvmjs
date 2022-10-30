import { parseCmd, Cmd } from "./cmd";
import { Classpath } from "./classpath";
import { ClassFile } from "./classfile";
import { MethodInfo } from "./classfile/member-info";
import interpret from "./interpreter";

(async function main() {
  const cmd = parseCmd();
  // the following code will not be executed if the command option is '-v' or '-h'
  await startJVM(cmd);
})();

async function startJVM(cmd: Cmd) {
  if (cmd.jrePath != null) {
    console.log(`jrePath: ${cmd.jrePath}`);
  }
  if (cmd.classpath != null) {
    console.log(`classpath: ${cmd.classpath}`);
  }
  console.log(`class: ${cmd.classname}`);
  if (cmd.args != null) {
    console.log(`args: ${cmd.args}`);
  }
  const classname = cmd.classname.replace(/(\.)/g, "/");
  // 解析路径，生成 Classpath
  const classpath: Classpath = Classpath.parse(cmd.jrePath, cmd.classpath);
  // 通过 Classpath 去加载字节码（指定类）
  const bytecode = await classpath.readClass(classname);
  // 将字节码解析成 ClassFile
  const classFile = ClassFile.read(bytecode);
  console.log(classFile);
  const mainMethod = getMainMethod(classFile);
  if (mainMethod == null) {
    throw new Error(`Main method not found in class ${cmd.classname}`);
  }
  interpret(mainMethod);
}

function getMainMethod(classFile: ClassFile): MethodInfo | null {
  for (let i = 0; i < classFile.methods.length; i += 1) {
    const method = classFile.methods[i];
    if (method.name() === "main" && method.descriptor() === "([Ljava/lang/String;)V") {
      return method;
    }
  }
  return null;
}
