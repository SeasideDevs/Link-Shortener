import chalk from "chalk";
type LogType = "info" | "error" | "success" | "shard" | "warn";
export function log(msg: string, type: LogType): TypeError | null {
  if (!msg) {
    return new TypeError("No message provided.");
  }
  if (!type) {
    return new TypeError("No type provided.");
  }

  const loggers = [
    {
      name: "info",
      log: () => {
        console.log(chalk.whiteBright("INFO"), msg);
      },
    },
    {
      name: "error",
      log: () => {
        console.log(chalk.redBright("ERROR"), msg);
      },
    },
    {
      name: "success",
      log: () => {
        console.log(chalk.greenBright("SUCCESS"), msg);
      },
    },
    {
      name: "shard",
      log: () => {
        console.log(chalk.magentaBright("SHARD"), msg);
      },
    },
    {
      name: "warn",
      log: () => {
        console.log(chalk.yellowBright("WARN"), msg);
      },
    },
  ];

  const types = loggers.map((logger) => {
    return logger.name;
  });

  const logtype = types.indexOf(type);
  loggers[logtype].log();
  return null;
}
