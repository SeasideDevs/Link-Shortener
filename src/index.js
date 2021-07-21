const { ShardingManager } = require("discord.js");
const { log } = require("./functions/logger.js");
const manager = new ShardingManager(__dirname + "/bot.js", {
  token: process.env.BOT_TOKEN,
});

manager.on("shardCreate", (shard) => {
  log(`Shard #${shard.id} Started`, "SHARD INFO");
  shard.on("death", () => {
    log(`Shard #{shard.id} died`, "SHARD ERROR");
  });
  shard.on("disconnect", () => {
    log(`Shard #${shard.id} was disconnected`, "SHARD ERROR");
  });
  shard.on("reconnecting", () => {
    log(`Shard #${shard.id} is attempting to reconnect`, "SHARD WARN");
  });
});

manager.spawn();
