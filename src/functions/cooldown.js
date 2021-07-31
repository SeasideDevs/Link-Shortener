const { log } = require("./logger");
const { MessageEmbed } = require("discord.js");
const { parseConfig } = require("./config");
const config = parseConfig();

// TODO: Reduce vs Bypass cooldown modes
const set = async (cooldowns, command, msg) => {
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
  } else if (command.cooldowns[cooldownType].endsWith("h")) {
    const hours = command.cooldowns[cooldownType].replace("h", "");
    cooldownTimeInMS = hours * 60 * 60 * 1000;
  } else if (command.cooldowns[cooldownType].endsWith("m")) {
    const minutes = command.cooldowns[cooldownType].replace("m", "");
    cooldownTimeInMS = minutes * 60 * 1000;
  } else if (command.cooldowns[cooldownType].endsWith("s")) {
    const seconds = command.cooldowns[cooldownType].replace("s", "");
    cooldownTimeInMS = seconds * 1000;
  } else if (command.cooldowns[cooldownType].endsWith("ms")) {
    const milliseconds = command.cooldowns[cooldownType].replace("ms", "");
    cooldownTimeInMS = milliseconds;
  } else {
    // If it doesn't end with either of the above letters then just default to seconds
    cooldownTimeInMS = command.cooldowns[cooldownType] * 1000;
  }

  cooldowns.get(command.name).set(msg.author.id, {
    expiresAt: Date.now() + cooldownTimeInMS,
  });
};
module.exports = {
  async check(cooldownItem, cooldowns, command, msg) {
    // Run this is there is a cooldown in the collection
    if (cooldownItem) {
      if (Date.now() < cooldownItem.expiresAt) {
        msg.channel.send(
          new MessageEmbed()
            .setColor(config.colors.error)
            .setTitle(config.general.cooldown.on_cooldown_error)
            .setDescription(
              config.general.cooldown.on_cooldown_error_description.replace(
                "$time$",
                ((cooldownItem.expiresAt - Date.now()) / 1000)
              )
            )
        );
        return true;
      }
      else cooldowns.get(command.name).delete(msg.author.id)
    }

    // If there isn't any cooldown yet then make one and let the user run the command.
    if (!cooldownItem) {
      set(cooldowns, command, msg);
    }
  },
};
