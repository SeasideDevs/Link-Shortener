const { log } = require("./logger");
const { parseConfig } = require("./config");
const config = parseConfig();

// TODO: Reduce vs Bypass cooldown modes
const set = async (cooldownItem, command, msg) => {
  let cooldownTimeInMS;
  let cooldownType = "normal";
  if (
    config.owner.ids
      .concat(command.access.nonOwnerAccessIDS)
      .includes(msg.author.id)
  ) {
    cooldownType = "reduced";
  }
  if (command.cooldowns[cooldownType].endsWith("d")) {
    const days = command.cooldowns[cooldownType].replace("d", "");
    cooldownTimeInMS = days * 24 * 60 * 60 * 1000;
  }

  if (command.cooldowns[cooldownType].endsWith("h")) {
    const hours = command.cooldowns[cooldownType].replace("h", "");
    cooldownTimeInMS = hours * 60 * 60 * 1000;
  }

  if (command.cooldowns[cooldownType].endsWith("m")) {
    const minutes = command.cooldowns[cooldownType].replace("m", "");
    cooldownTimeInMS = minutes * 60 * 1000;
  }

  if (command.cooldowns[cooldownType].endsWith("s")) {
    const seconds = command.cooldowns[cooldownType].replace("s", "");
    cooldownTimeInMS = seconds * 1000;
  }

  if (command.cooldowns[cooldownType].endsWith("ms")) {
    const milliseconds = command.cooldowns[cooldownType].replace("ms", "");
    cooldownTimeInMS = milliseconds;
  }

  // TODO: Change msg.user to msg.author
  cooldownItem.set(msg.user.id, {
    expiresAt: Date.now() + cooldownTimeInMS,
  });
};
module.exports = {
  async check(cooldownItem, cooldowns, command, msg) {
    // Run this is there is a cooldown in the collection
    if (cooldownItem) {
      if (Date.now() < cooldownItem.expiresAt) {
        return msg.channel.send(
          new Discord.MessageEmbed()
            .setColor(config.colors.error)
            .setTitle("Woah there! Slow down a little.")
            .setDescription(
              `You can run this command again in **${Math.round(
                cooldownItem.expiresAt - Date.now() / 1000
              )}** seconds!`
            )
        );
      }
    }

    // If there isn't any cooldown yet then make one and let the user run the command.
    if (!cooldownItem) {
      set(cooldowns, command, msg);
    }
  },
};
