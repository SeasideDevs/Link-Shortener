module.exports = {
  name: "eval",
  aliases: ["e"],
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
  async run(msg, bot, discord, config, args) {
    console.log("evel");
  },
};
