const chalk = require("chalk");
const fetch = require("node-fetch");
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
      /*
        Here we split the type into an array of items divided by a dash (-).
        Then we create a array to hold items.
        Now we make a loop and go through each item in the array of items split and uppercase the first letter.
        Then we push it to the array previously created.
        Lastly, we join the array with spaces and we got a human friendly log type!
      */
      const splitType = type.split("_");
      const humanFriendlySplitType = [];
      splitType.forEach((word) => {
        const upperCased = word.replace(
          word.charAt(0),
          word.charAt(0).toUpperCase()
        );
        humanFriendlySplitType.push(upperCased);
      });
      const humanFriendlyType = humanFriendlySplitType.join(" ");
      const color = parseInt(config.colors.logging[type].replace("#", ""), 16);
      const body = {
        embeds: [
          {
            color: color,
            title: humanFriendlyType,
            description: msg,
          },
        ],
      };
      // Send the data to the webhook
      fetch(process.env.LOGGING_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => {
        console.log(res);
      });
    }
  },
};
