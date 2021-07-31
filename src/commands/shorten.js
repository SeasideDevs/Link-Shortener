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
        .setDescription("Hold on as I create your link!")
    );
    const fetch = require("node-fetch");
    const res = await fetch(
      `https://is.gd/create.php?format=simple&url=${args[0]}`
    );
    if (!res.ok) {
      return message.edit(
        new discord.MessageEmbed()
          .setColor(config.colors.error)
          .setTitle("An error ocurred!")
          .setDescription(
            "An unknown error occured! The developers have been notified and this command has been temporarily locked!"
          )
      );
    }
    const url = await res.text();
    msg.channel.send(
      new discord.MessageEmbed()
        .setColor(config.colors.main)
        .setTitle("success")
        .setDescription(`${url}`)
    );
  },
};
