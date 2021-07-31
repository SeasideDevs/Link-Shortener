module.exports = {
  name: "ping",
  aliases: ["latency"],
  access: {
    ownerOnly: false,
    nonOwnerAccessIDS: [],
    guildOnly: false,
    guildMemberPermsRequired: [],
  },
  cooldowns: {
    normal: "2",
    reduced: "60s",
  },
  async run(msg, bot, discord, config) {
    // Send the embed
    const message = await msg.channel.send(
      new discord.MessageEmbed()
        .setColor(config.colors.main)
        .setTitle("Pong?")
        .setDescription("Awaiting Results")
    );
    const ping = {
      bot: Date.now() - message.createdAt,
      api: bot.ws.ping,
    };
    if ((ping.bot > 500) | (ping.api > 250)) {
      return config.colors.warn;
    }
    // Edit the embed with the ping
    message.edit(
      message.embeds[0]
        .setTitle("Pong!")
        .setColor(
          (ping.bot > 500) | (ping.api > 250)
            ? config.colors.warn
            : config.colors.main
        )
        .setDescription(
          `${
            ping.bot > 500 ? config.emojis.warn : config.emojis.success
          } **Latency:** ${ping.bot}ms\n${
            ping.api > 250 ? config.emojis.warn : config.emojis.success
          } **API Latency**: ${ping.api}ms`
        )
    );
  },
};
