import { program } from "commander";

export interface Cmd {
  classpath?: string;
  classname?: string;
  args?: string[];
}

export function parseCmd(): Cmd {
  const cmd: Cmd = {};
  // default has `-h` option
  program
    .version("0.0.1", "-v, --version", "print the current version") // TODO read version from package.json
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

  const options = program.opts<{ classpath: string }>();
  if (options.classpath != null) {
    cmd.classpath = options.classpath;
  }
  return cmd;
}
