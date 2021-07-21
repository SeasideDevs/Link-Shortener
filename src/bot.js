import Discord from "discord.js";
import { log } from "./functions/logger";
import { readdirSync } from "fs";
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

const config = {
  prefix: ">>",
};

// Read all files in the commands directory and filter out ones that don't end in .js
const commandFiles = readdirSync(__dirname + "/commands").filter((file) =>
  file.endsWith(".js")
);

// Create the collection where commands go
const commands = new Discord.Collection();
// Require each command and add it to the collection
commandFiles.forEach((commandFile) => {
  const { info, run } = require(`./commands/${commandFile.replace(".js", "")}`);
  // Add the command to the commands collection
  commands.set(info.name, {
    info: info,
    run: run,
  });
});

// cooldowns.set(command!.info.name, new Discord.Collection());

bot.on("ready", async () => {
  log(`Logged in as ${bot.user.tag}`, "SUCCESS");
});

bot.on("guildCreate", async (guild) => {
  log(`Joined ${guild.name} (${guild.id})`, "INFO");
});

bot.on("guildDelete", async (guild) => {
  log(`Left ${guild.name} (${guild.id})`, "INFO");
});

bot.on("message", async (msg) => {
  if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;
  /* 
    Get the msg content with the prefix cut off.
    Then use trim() to remove useless white space at the start or finish
    Lastly split the message content into an array of arguments
  */
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
  console.log(args);
  /* 
    Grab the first item from the args array (which would be the command name).
    Then convert it to lowercase
  */
  const commandName = args.shift().toLowerCase();
  const command = commands.get(commandName);
  console.log(command);
  // If the command isn't a valid command send a error message
  if (!command) {
    return msg.channel.send(
      "I can't seem to find that command. Make sure you didn't mispell it!"
    );
  }
});

bot.login();
