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
  console.log(chalk_1.default.greenBright(type), msg);
  return null;
}
exports.log = log;
