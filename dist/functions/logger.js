"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
var chalk_1 = __importDefault(require("chalk"));
function log(msg, type) {
  if (!msg) {
    return new TypeError("No message provided.");
  }
  if (!type) {
    return new TypeError("No type provided.");
  }
  var loggers = [
    {
      name: "info",
      log: function () {
        console.log(chalk_1.default.whiteBright("INFO"), msg);
      },
    },
    {
      name: "error",
      log: function () {
        console.log(chalk_1.default.redBright("ERROR"), msg);
      },
    },
    {
      name: "success",
      log: function () {
        console.log(chalk_1.default.greenBright("SUCCESS"), msg);
      },
    },
    {
      name: "shard",
      log: function () {
        console.log(chalk_1.default.magentaBright("SHARD"), msg);
      },
    },
    {
      name: "warn",
      log: function () {
        console.log(chalk_1.default.yellowBright("WARN"), msg);
      },
    },
  ];
  var types = loggers.map(function (logger) {
    return logger.name;
  });
  var logtype = types.indexOf(type);
  loggers[logtype].log();
  return null;
}
exports.log = log;
