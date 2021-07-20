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

const commandFiles = readdirSync("./commands");
const commands = new Discord.Collection();

bot.on("ready", async () => {
  log(`Logged in as ${bot.user!.tag}`, "SUCCESS");
});

bot.on("guildCreate", async (guild) => {
  log(`Joined ${guild.name} (${guild.id})`, "INFO");
});

bot.on("guildDelete", async (guild) => {
  log(`Left ${guild.name} (${guild.id})`, "INFO");
});

bot.on("message", async (msg) => {
  if (msg.author.bot) return;
});
