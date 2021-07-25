const chalk = require("chalk");
const { fetch } = require("node-fetch");
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
    // If the log type is enabled for local logging then go ahead
    if (config.logging.local[type]) {
      // This just makes the type more human friendly for local logs
      const localHumanType = type.toUpperCase().replace("_", " ");
      console.log(chalk.hex(config.colors.logging[type])(localHumanType), msg);
    }
    // If the log type is enabled for webhook logging then go ahead
    if (config.logging.webhook[type]) {
      // TODO: Implement hex to integer so colors work
      const body = {
        embeds: [
          {
            title: "",
          },
        ],
      };
      // Send the data to the webhook
      fetch(process.env.LOGGING_WEBHOOK, {
        method: "POST",
        body: JSON.stringify(body),
      });
    }
  },
};
