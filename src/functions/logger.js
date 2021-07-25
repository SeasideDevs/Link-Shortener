const chalk = require("chalk");
const { parseConfig } = require("./config");
const config = parseConfig();
module.exports = {
  log(msg, type) {
    const logTypes = [
      "join",
      "leave",
      "success",
      "info",
      "warning",
      "error",
      "debug",
      "shard_success",
      "shard_info",
      "shard_warning",
      "shard_error",
    ];
    if (!logTypes.includes(type)) {
      console.log(chalk.redBright("ERROR"), "Invalid Log Type");
      throw new TypeError("Invalid logger type");
    }
    // This just makes the type more human friendly for local logs
    const localHumanType = type.toUpperCase().replace("_", " ");
    if (config.logging.local[type]) {
      console.log(chalk.hex(config.colors.logging[type])(localHumanType), msg);
    }
  },
};
