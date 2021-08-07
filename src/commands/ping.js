module.exports = {
  name: "ping",
  aliases: ["latency"],
  cacheRequired: false,
  access: {
    ownerOnly: false,
    nonOwnerAccessIDS: [],
    guildOnly: false,
    guildMemberPermsRequired: [],
  },
  cooldowns: {
    normal: "2",
    reduced: "1",
  },
  async run(msg, bot, discord, config, args) {
    // Send the embed
    const message = await msg.channel.send({
      embeds: [
        new discord.MessageEmbed()
          .setColor(config.colors.main)
          .setTitle("Pong?")
          .setDescription("Awaiting Results"),
      ],
    });
    const ping = {
      bot: message.createdTimestamp - msg.createdTimestamp,
      api: bot.ws.ping,
    };
    if ((ping.bot > 500) | (ping.api > 250)) {
      return config.colors.warn;
    }
    // Edit the embed with the ping
    await message.edit({
      embeds: [
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
          ),
      ],
    });
  },
};
