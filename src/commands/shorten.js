module.exports = {
  name: "shorten",
  aliases: ["is.gd"],
  cacheRequired: true,
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
    const message = await msg.channel.send({
      embeds: [
        new discord.MessageEmbed()
          .setColor(config.colors.main)
          .setTitle("Generating Link")
          .setDescription("Please wait while I create your link!"),
      ],
    });
    /*
      Check the cache to see if it contains the link the user wants to shorten.
      If so send that instead of sending a new request
    */
    if (bot.cache.get(this.name).get(args[0])) {
      return message.edit({
        embeds: [
          new discord.MessageEmbed()
            .setColor(config.colors.main)
            .setTitle("Here's your link!")
            .setDescription(
              `${config.emojis.success} ${bot.cache
                .get(this.name)
                .get(args[0])}`
            ),
        ],
      });
    }
    const fetch = require("node-fetch");
    const errors = [
      {
        apiProvided:
          "Error: Sorry, the URL you entered is on our internal blacklist. It may have been used abusively in the past, or it may link to another URL redirection service.",
        humanReadableTitle: "Unable to shorten!",
        humanReadableDescription: `${config.emojis.error} The link you provided can't be shortened! It was either abused in the past or it's another URL shortener.`,
      },
      {
        apiProvided: "Error: Please enter a valid URL to shorten",
        humanReadableTitle: "Invalid URL!",
        humanReadableDescription: `${config.emojis.error} The link you provided is invalid! Please try again with a valid link.`,
      },
      {
        apiProvided:
          "Error: Sorry, this URL doesn't seem to be of a type we recognise. We check URL schemes against a whitelist to cut down on junk submissions - if you'd like us to add support for a specific protocol, please get in touch.",
        humanReadableTitle: "Invalid Scheme!",
        humanReadableDescription: `${config.emojis.error} The link you provided isn't a valid scheme (http, https, ftp, etc)! Please try again with a valid scheme.`,
      },
    ];
    const res = await fetch(
      `https://is.gd/create.php?format=simple&url=${args[0]}`
    );
    if (!res.ok) {
      const text = await res.text();
      const apiErrors = await errors.map((error) => error.apiProvided);
      const errorIndex = apiErrors.indexOf(text);
      if (errorIndex > -1) {
        return message.edit({
          embeds: [
            new discord.MessageEmbed()
              .setColor(config.colors.error)
              .setTitle(errors[errorIndex].humanReadableTitle)
              .setDescription(errors[errorIndex].humanReadableDescription),
          ],
        });
      }
      bot.log("An error occured while trying to shorten a link", "error");
      return message.edit({
        embeds: [
          new discord.MessageEmbed()
            .setColor(config.colors.error)
            .setTitle("An error ocurred!")
            .setDescription(
              `${config.emojis.error} An unknown error occured! The developers have already been notified! If this keeps happening join the [support server](https://is.gd/rickroll)!`
            ),
        ],
      });
    }
    const url = await res.text();
    bot.cache.get(this.name).set(args[0], url);
    message.edit({
      embeds: [
        new discord.MessageEmbed()
          .setColor(config.colors.main)
          .setTitle("Here's your link!")
          .setDescription(`${config.emojis.success} ${url}`),
      ],
    });
  },
};
