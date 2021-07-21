const chalk = require("chalk");
module.exports = {
  log(msg, type) {
    return console.log(chalk.greenBright(type), msg);
  },
};
