module.exports = {
  name: "eval",
  aliases: ["e"],
  cacheRequired: false,
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
    const startDate = await Date.now();
    let results;
    try {
      await eval(args.join(" "));
    } catch (error) {
      return msg.channel.send({
        embeds: [
          new discord.MessageEmbed()
            .setColor(config.colors.error)
            .setTitle("Eval")
            .addField("📤 Code", "```javascript\n" + args.join(" ") + "\n```")
            .addField("📥 Result", "```javascript\n" + error.stack + "\n```")
            .setFooter(`Finished in ${Date.now() - startDate}ms`),
        ],
      });
    }

    msg.channel.send({
      embeds: [
        new discord.MessageEmbed()
          .setColor(config.colors.main)
          .setTitle("Eval")
          .addField("📤 Code", "```javascript\n" + args.join(" ") + "\n```")
          .addField("📥 Result", "```javascript\n" + results + "\n```")
          .setFooter(`Finished in ${Date.now() - startDate}ms`),
      ],
    });
  },
};
