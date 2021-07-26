module.exports = {
  name: "ping",
  aliases: ["latency"],
  ownerOnly: false,
  nonOwnerAccessIDS: [],
  guildOnly: false,
  guildMemberPermsRequired: [],
  async run(msg, bot, config) {
    msg.channel.send("pong or whatever");
  },
};
