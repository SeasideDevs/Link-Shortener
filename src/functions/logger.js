import chalk from "chalk";
export function log(msg, type) {
  return console.log(chalk.greenBright(type), msg);
}
