import { parseCmd, Cmd } from "./cmd";
import { Classpath } from "./classpath";
import { ClassFile } from "./classfile";

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
}
