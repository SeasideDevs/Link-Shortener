const { DiscordAPIError } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "support", "commands"],
  cacheRequired: false,
  access: {
    ownerOnly: false,
    nonOwnerAccessIDS: [],
    guildOnly: false,
    guildMemberPermsRequired: [],
  },
  cooldowns: {
    normal: "1",
    reduced: "0.5",
  },
  async run(msg, bot, discord, config, args) {
    let commandData = [];
    bot.commands.forEach((command) => {
      commandData.push({
        name: command.name,
        aliases: command.aliases,
        ownerOnly: command.access.ownerOnly,
        accessIDS: command.access.nonOwnerAccessIDS,
        cooldown: command.cooldowns.normal,
      });
    });

    let commandNames = "";
    commandData.forEach((command) => {
      commandNames = `${commandNames} ${command.name}`;
    });

    msg.reply({
      embeds: [
        new discord.MessageEmbed()
          .setColor(config.colors.main)
          .setTitle("Help")
          .addField("Commands", commandNames),
      ],
    });
  },
};
