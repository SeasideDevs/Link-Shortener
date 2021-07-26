module.exports = {
  name: "ping",
  aliases: ["latency"],
  ownerOnly: false,
  nonOwnerAccessIDS: [],
  guildOnly: false,
  guildMemberPermsRequired: [],
  async run(msg, bot, config) {
    const message = await msg.channel.send("Pong?");
    message.edit(`Pong!\n${Date.now() - message.createdTimestamp}ms`);
  },
};
