const { prompt } = require("enquirer");
(async () => {
const response = await prompt({
type: "input",
name: "name",
message: "What is your name?"
})
console.log(response)
})()
