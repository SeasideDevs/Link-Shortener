"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var logger_1 = require("./functions/logger");
var manager = new discord_js_1.ShardingManager("bot.js", {
  token: process.env.BOT_TOKEN,
});
manager.on("shardCreate", function (shard) {
  logger_1.log("Shard #" + shard.id + " Started", "SHARD INFO");
  shard.on("death", function () {
    logger_1.log("Shard #{shard.id} died", "SHARD ERROR");
  });
  shard.on("disconnect", function () {
    logger_1.log("Shard #" + shard.id + " was disconnected", "SHARD ERROR");
  });
  shard.on("reconnecting", function () {
    logger_1.log(
      "Shard #" + shard.id + " is attempting to reconnect",
      "SHARD WARN"
    );
  });
});
manager.spawn();
