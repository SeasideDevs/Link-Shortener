module.exports = {
  name: "credits",
  aliases: ["credit"],
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
    msg.channel.send({
      embeds: [
        new discord.MessageEmbed()
          .setColor(config.colors.main)
          .setTitle("Credits")
          .setDescription("**X Daniel#0017** - Emote Designer"),
      ],
    });
  },
};
