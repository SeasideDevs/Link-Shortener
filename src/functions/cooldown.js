const { MessageEmbed } = require("discord.js");
const { parseConfig } = require("./config");
const config = parseConfig();

const set = async (cooldowns, command, msg) => {
  let cooldownTimeInMS;
  let cooldownType = "normal";
  if (
    config.owner.ids
      .concat(command.access.nonOwnerAccessIDS)
      .includes(msg.author.id)
  ) {
    if (config.owner.reduce_cooldowns) {
      if (!config.owner.reduce_cooldowns_blacklist.includes(msg.author.id)) {
        cooldownType = "reduced";
      }
    }
    if (config.owner.bypass_cooldowns) {
      if (!config.owner.bypass_cooldowns_blacklist.includes(msg.author.id)) {
        return cooldowns.get(command.name).set(msg.author.id, {
          expiresAt: Date.now(),
        });
      }
    }
  }

  // If it doesn't end with either of the above letters then just default to seconds
  cooldownTimeInMS = command.cooldowns[cooldownType] * 1000;

  cooldowns.get(command.name).set(msg.author.id, {
    expiresAt: Date.now() + cooldownTimeInMS,
  });
};
module.exports = {
  async check(cooldowns, command, msg) {
    const cooldownItem = cooldowns.get(command.name).get(msg.author.id);
    // Run this is there is a cooldown in the collection
    if (cooldownItem) {
      if (Date.now() < cooldownItem.expiresAt) {
        const timeLeftInMS = cooldownItem.expiresAt - Date.now();
        const timeLeftInSeconds = Math.round(timeLeftInMS / 1000);
        await msg.reply({
          embeds: [
            new MessageEmbed()
              .setColor(config.colors.error)
              .setTitle("Slow down there!")
              .setDescription(
                `You can use this command again in **${timeLeftInSeconds}** ${
                  timeLeftInSeconds === 1 ? "second" : "seconds"
                }!`
              ),
          ],
          allowedMentions: {
            repliedUser: true,
          },
        });
        return true;
      } else cooldowns.get(command.name).delete(msg.author.id);
    }

    // If there isn't any cooldown yet then make one and let the user run the command.
    if (!cooldownItem) {
      set(cooldowns, command, msg);
    }
  },
};
