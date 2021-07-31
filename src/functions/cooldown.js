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

  // If it doesn't end with either of the above letters then just default to seconds
  cooldownTimeInMS = command.cooldowns[cooldownType] * 1000;

  cooldowns.get(command.name).set(msg.author.id, {
    expiresAt: Date.now() + cooldownTimeInMS,
  });
};
module.exports = {
  async check(cooldownItem, cooldowns, command, msg) {
    // Run this is there is a cooldown in the collection
    if (cooldownItem) {
      if (Date.now() < cooldownItem.expiresAt) {
        await msg.channel.send(
          new MessageEmbed()
            .setColor(config.colors.error)
            .setTitle("Slow down there!")
            .setDescription(
              `You can use this command again in **${
                cooldownItem.expiresAt - Date.now() / 1000
              }** seconds!`
            )
        );
        return true;
      } else cooldowns.get(command.name).delete(msg.author.id);
    }

    // If there isn't any cooldown yet then make one and let the user run the command.
    if (!cooldownItem) {
      set(cooldowns, command, msg);
    }
  },
};
