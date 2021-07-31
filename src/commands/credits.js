module.exports = {
  name: "credits",
  aliases: ["credit"],
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
    msg.channel.send(
      new discord.MessageEmbed()
        .setColor(config.colors.main)
        .setTitle("Credits")
        .setDescription("**X Daniel#0017** - Emote Designer")
    );
  },
};
