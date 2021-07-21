import { CommandInfo } from "../../typings";
export const info: CommandInfo = {
  name: "e",
  aliases: ["e", "fdw"],
  ownerOnly: false,
  nonOwnerAccessIDS: [],
  guildOnly: false,
  guildMemberPermsRequired: [],
};
export function run() {
  console.log("e");
}
