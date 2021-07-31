module.exports = {
  name: "shorten",
  aliases: ["cut"],
  access: {
    ownerOnly: false,
    nonOwnerAccessIDS: [],
    guildOnly: false,
    guildMemberPermsRequired: [],
  },
  cooldowns: {
    normal: "8",
    reduced: "6",
  },
  async run(msg, bot, discord, config, args) {
    const message = await msg.channel.send(
      new discord.MessageEmbed()
        .setColor(config.colors.main)
        .setTitle("Generating Link")
        .setDescription("Please wait while I create your link!")
    );
    const fetch = require("node-fetch");
    const res = await fetch(
      `https://is.gd/create.php?format=simple&url=${args[0]}`
    );
    if (!res.ok) {
      log("An error occured while trying to shorten a link", "error");
      return message.edit(
        new discord.MessageEmbed()
          .setColor(config.colors.error)
          .setTitle("An error ocurred!")
          .setDescription(
            `${config.emojis.error} An unknown error occured! The developers have already been notified! If this keeps happening join the [support server](https://is.gd/rickroll)!`
          )
      );
    }
    const url = await res.text();
    message.edit(
      new discord.MessageEmbed()
        .setColor(config.colors.main)
        .setTitle("Here's your link!")
        .setDescription(`${config.emojis.success} ${url}`)
    );
  },
};
