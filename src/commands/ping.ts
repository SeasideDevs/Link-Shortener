import { CommandInfo } from "../../typings";
export const info: CommandInfo = {
  name: "ping",
  aliases: ["latency"],
  ownerOnly: false,
  nonOwnerAccessIDS: [],
  guildOnly: false,
  guildMemberPermsRequired: [],
};
export function run() {
  console.log("e");
}
