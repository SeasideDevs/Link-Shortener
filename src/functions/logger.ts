import chalk from "chalk";
type BasicLogType = "SUCCESS" | "INFO" | "WARN" | "ERROR";
type ShardLogType = `SHARD ${BasicLogType}`;
type WebServerLogType = `WEB SERVER ${BasicLogType}`;
type LogType = BasicLogType | ShardLogType | WebServerLogType;
export function log(msg: string, type: LogType): TypeError | null {
  console.log(chalk.greenBright(type), msg);
  return null;
}
