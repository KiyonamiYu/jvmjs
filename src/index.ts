import { parseCmd, Cmd } from "./cmd";
import { DirEntry, WildcardEntry, ZipEntry } from "./classpath";

(function main() {
  const cmd = parseCmd();
  // the following code will not be executed if the command option is -v or -h
  startJVM(cmd);
})();

function startJVM(cmd: Cmd) {
  if (cmd.classpath != null) {
    console.log(`classpath: ${cmd.classpath}`);
  }
  console.log(`class: ${cmd.classname}`);
  if (cmd.args != null) {
    console.log(`args: ${cmd.args}`);
  }
}
