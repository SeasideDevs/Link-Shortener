const { ShardingManager } = require("discord.js");
const { log } = require("./functions/logger.js");
const manager = new ShardingManager(__dirname + "/bot.js", {
  token: process.env.BOT_TOKEN,
});

manager.on("shardCreate", (shard) => {
  log(`Shard #${shard.id} Started`, "shard_info");
  shard.on("death", () => {
    log(`Shard #{shard.id} died`, "shard_error");
  });
  shard.on("disconnect", () => {
    log(`Shard #${shard.id} was disconnected`, "shard_warning");
  });
  shard.on("reconnecting", () => {
    log(`Shard #${shard.id} is attempting to reconnect`, "shard_warning");
  });
});

manager.spawn();
