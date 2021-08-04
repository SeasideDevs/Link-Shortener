const Discord = require("discord.js");
const { log } = require("./functions/logger");
const { readdirSync } = require("fs");
const bot = new Discord.Client({
  disableMentions: "all",
  allowedMentions: {
    parse: ["users"],
  },
  presence: {
    activity: {
      name: "shortening links!",
      type: "COMPETING",
    },
  },
  ws: {
    intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
  },
});
bot.log = log;

// TODO: Debug logging is on the config parser file not here
const { parseConfig } = require("./functions/config");
const config = parseConfig();

// Read all files in the commands directory and filter out ones that don't end in .js
const commandFiles = readdirSync(__dirname + "/commands").filter((file) =>
  file.endsWith(".js")
);

// Create the collections where commands and cooldowns go
const commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
// Require each command and add it to the both collections
commandFiles.forEach((commandFile) => {
  const command = require(`./commands/${commandFile.replace(".js", "")}`);
  // Add the command to the commands and cooldowns collection
  commands.set(command.name, command);
  cooldowns.set(command.name, new Discord.Collection());
});

bot.on("ready", async () => {
  bot.log(`Logged in as ${bot.user.tag}`, "success");
});

bot.on("guildCreate", async (guild) => {
  bot.log(`Joined ${guild.name} (${guild.id})`, "join");
});

bot.on("guildDelete", async (guild) => {
  bot.log(`Left ${guild.name} (${guild.id})`, "leave");
});

bot.on("message", async (msg) => {
  if (msg.author.bot) return;
  let prefix;
  /*
    Go through each prefix and check if the msg starts with one of them.
    If one does the set the prefix variable to that.
    If no valid prefix was used then the variable stays undefined and we return
  */
  config.prefixes.list.forEach((listedPrefix) => {
    if (msg.content.startsWith(listedPrefix)) {
      prefix = listedPrefix;
    }
  });
  if (
    msg.content.startsWith(`<@!${bot.user.id}>`) &&
    config.prefixes.mention_prefix
  ) {
    prefix = `<@!${bot.user.id}>`;
  }
  if (!prefix) return;
  /* 
    Get the msg content with the prefix cut off.
    Then use trim() to remove useless white space at the start or finish.
    Lastly split the message content into an array of arguments.
    Then grab the command name item (first array item) and lowercase it.
  */
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  /*
    Check if the commandName is an empty string.
    If so then return an error message about not providing a command to run.
    If the command isn't a valid one then error
  */
  if (commandName === "") {
    return msg.channel.send(
      new Discord.MessageEmbed()
        .setColor(config.colors.error)
        .setTitle("You didn't provide a command!")
        .setDescription(
          `You didn't a provide a command to run! To see a list of available commands run **${prefix}help**`
        )
    );
  }
  const command = commands.get(commandName);
  if (!command && config.miscellaneous.show_command_not_found) {
    msg.react(config.emojis.error);
    return (errorMsg = await msg.channel.send(
      new Discord.MessageEmbed()
        .setColor(config.colors.error)
        .setTitle("Command not found!")
        .setDescription(
          `The command **${commandName}** doesn't exist! Make sure you didn't mispell it.`
        )
    ));
  }
  // Check if the user is allowed to use a owner only command
  if (command.access.ownerOnly) {
    if (
      !config.owner.ids
        .concat(command.access.nonOwnerAccessIDS)
        .includes(msg.author.id)
    ) {
      return msg.channel.send(
        new Discord.MessageEmbed()
          .setColor(config.colors.error)
          .setTitle("You can't use this comand!")
          .setDescription("Only authorized users have access to this command.")
      );
    }
  }

  const { check } = require("./functions/cooldown");
  let checkResult = await check(cooldowns, command, msg);
  if (checkResult) return;
  command.run(msg, bot, Discord, config, args);
});

bot.login();
