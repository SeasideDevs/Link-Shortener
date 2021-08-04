const { prompt } = require("enquirer");
const chalk = require("chalk");
(async () => {
  const response = await prompt([
    {
      type: "input",
      name: "name",
      message:
        "Please enter the IDs of the bot owners.\n" +
        chalk.gray(
          "(They will be able to run owner only commands and will bypass/reduced cooldowns for themselves)"
        ),
      prefix: chalk.hex("#2ecc71")("?"),
      validate: (input) => {
        if (!input.matches(/[0-9]{18}/)) {
          return "I couldnt't find any IDs in your response!";
        }
        return true;
      },
    },
  ]);
  console.log(response);
})();
