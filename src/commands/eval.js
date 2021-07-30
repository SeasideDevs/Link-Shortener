module.exports = {
  name: "ping",
  aliases: ["latency"],
  access: {
    ownerOnly: true,
    nonOwnerAccessIDS: [],
    guildOnly: false,
    guildMemberPermsRequired: [],
  },
  cooldowns: {
    normal: "2",
    reduced: "0.5",
  },
  async run(msg, bot, discord, config) {
    console.log("evel");
  },
};
