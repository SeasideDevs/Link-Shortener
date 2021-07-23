const { parse } = require("@iarna/toml");
const { readFileSync, readdirSync } = require("fs");
const parseConfig = () => {
  const configFile = readFileSync(__dirname + "/../config.toml", {
    encoding: "utf-8",
  });
  return parse(configFile);
};

module.exports = { parseConfig };
