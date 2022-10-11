import { program } from "commander";

export interface Cmd {
  jrePath?: string;
  classpath?: string;
  classname: string; // required
  args?: string[];
}

export function parseCmd(): Cmd {
  const cmd: Cmd = {} as Cmd;
  // includes '-h' option by default
  program
    .version("0.0.1", "-v, --version", "print the current version") // TODO read version from package.json
    .option("-Xjre <jrePath>", "path to jre")
    .option("-cp, --classpath <cp>", "classpath")
    .argument("<class>", "class")
    .argument("[args...]", "args")
    .action((classname, args) => {
      cmd.classname = classname;
      if (args != null) {
        cmd.args = args;
      }
    });

  program.parse(process.argv);

  const options = program.opts<{ classpath: string; Xjre: string }>();
  console.log(options);
  if (options.classpath != null) {
    cmd.classpath = options.classpath;
  }
  if (options.Xjre != null) {
    cmd.jrePath = options.Xjre;
  }
  return cmd;
}
