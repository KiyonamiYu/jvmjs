import { parseCmd, Cmd } from "./cmd";
import Classpath from "./classpath/classpath";

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
  const classpath = Classpath.parse(cmd.jrePath, cmd.classpath);
  const classname = cmd.classname.replace(/(\.)/g, "/");
  const classBytes = await classpath.readClass(classname);
  console.log(classBytes);
}
