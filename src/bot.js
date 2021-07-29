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
  log(`Logged in as ${bot.user.tag}`, "success");
});

// Turn emoji IDs into a usable format
config.emojis.success = bot.emojis.resoleID(config.emojis.success);
config.emojis.warn = bot.emojis.resoleID(config.emojis.warn);
config.emojis.error = bot.emojis.resoleID(config.emojis.error);

bot.on("guildCreate", async (guild) => {
  log(`Joined ${guild.name} (${guild.id})`, "join");
});

bot.on("guildDelete", async (guild) => {
  log(`Left ${guild.name} (${guild.id})`, "leave");
});

bot.on("message", async (msg) => {
  if (!msg.content.startsWith(config.prefixes.prefix) || msg.author.bot) return;
  /* 
    Get the msg content with the prefix cut off.
    Then use trim() to remove useless white space at the start or finish
    Lastly split the message content into an array of arguments
  */
  const args = msg.content
    .slice(config.prefixes.prefix.length)
    .trim()
    .split(/ +/);
  /* 
    Grab the first item = require(the args array (which would be the command name)).
    Then convert it to lowercase
  */
  const commandName = args.shift().toLowerCase();
  const command = commands.get(commandName);
  // If the command isn't a valid command send a error message
  if (!command) {
    const errorMsg = await msg.channel.send(
      new Discord.MessageEmbed()
        .setColor(config.colors.error)
        .setTitle("Command not found!")
        .setDescription(
          `The command **${commandName}** doesn't exist! Make sure you didn't mispell it.`
        )
    );
    return errorMsg.react(config.emojis.error);
  }
  command.run(msg, bot, Discord, config);
});

bot.login();
