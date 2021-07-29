module.exports = {
  name: "ping",
  aliases: ["latency"],
  ownerOnly: false,
  nonOwnerAccessIDS: [],
  guildOnly: false,
  guildMemberPermsRequired: [],
  async run(msg, bot, discord, config) {
    // Send the embed
    const message = await msg.channel.send(
      new discord.MessageEmbed()
        .setColor(config.colors.main)
        .setTitle("Pong?")
        .setDescription("Awaiting Results")
    );
    // Edit the embed with the ping
    message.edit(
      message.embeds[0]
        .setTitle("Pong!")
        .setDescription(
          `**Latency:** ${Date.now() - message.createdAt}ms\n**API Latency**: ${
            bot.ws.ping
          }ms`
        )
    );
  },
};
