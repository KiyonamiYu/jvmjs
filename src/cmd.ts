import { program } from "commander";

export interface Cmd {
  classpath?: boolean;
  classname?: string;
  args?: string[];
}

export function parseCmd(): Cmd {
  const cmd: Cmd = {};
  // default have `-h` option
  program
    .version("0.0.1", "-v, --version", "print the current version") // TODO read version from package.json
    .option("--classpath <cp>", "classpath")
    .argument("<class>", "class")
    .argument("[args]", "args")
    .action((classname, args) => {
      cmd.classname = classname;
      if (args != null) {
        cmd.args = args;
      }
    });
  program.parse(process.argv);
  return cmd;
}
