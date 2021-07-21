"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var logger_1 = require("./functions/logger");
var fs_1 = require("fs");
var bot = new discord_js_1.default.Client({
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
var config = {
  prefix: ">>",
};
// Read all files in the commands directory and filter out ones that don't end in .js
var commandFiles = fs_1
  .readdirSync(__dirname + "/commands")
  .filter(function (file) {
    return file.endsWith(".js");
  });
// Create the collection where commands go
var commands = new discord_js_1.default.Collection();
// Require each command and add it to the collection
commandFiles.forEach(function (commandFile) {
  var _a = require("./commands/" + commandFile.replace(".js", "")),
    info = _a.info,
    run = _a.run;
  // Add the command to the commands collection
  commands.set(info.name, {
    info: info,
    run: run,
  });
});
// cooldowns.set(command!.info.name, new Discord.Collection());
bot.on("ready", function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      logger_1.log("Logged in as " + bot.user.tag, "SUCCESS");
      return [2 /*return*/];
    });
  });
});
bot.on("guildCreate", function (guild) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      logger_1.log("Joined " + guild.name + " (" + guild.id + ")", "INFO");
      return [2 /*return*/];
    });
  });
});
bot.on("guildDelete", function (guild) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      logger_1.log("Left " + guild.name + " (" + guild.id + ")", "INFO");
      return [2 /*return*/];
    });
  });
});
bot.on("message", function (msg) {
  return __awaiter(void 0, void 0, void 0, function () {
    var args, commandName, command;
    return __generator(this, function (_a) {
      console.log(msg);
      if (!msg.content.startsWith(config.prefix) || msg.author.bot)
        return [2 /*return*/];
      args = msg.content.slice(config.prefix.length).trim().split(/ +/);
      commandName = args.shift().toLowerCase();
      command = commands.get(commandName);
      if (!command) {
        return [
          2 /*return*/,
          msg.channel.send(
            "I can't seem to find that command. Make sure you didn't mispell it!"
          ),
        ];
      }
      return [2 /*return*/];
    });
  });
});
bot.login();
