const chalk = require("chalk");
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
      throw new TypeError("Invalid logger type");
    }
    console.log(chalk.hex(config.colors.logging[type]));
  },
};
