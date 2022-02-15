const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const ms = require("ms");
module.exports = {
  name: "timeout",
  category: "Moderation",
  aliases: ["mute"],
  cooldown: 5,
  usage: "timeout <@USER> [TIME] [REASON]",
  description: "Timeout a user for a specified time",
  memberpermissions: ["BAN_MEMBERS"],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const giventime = ms(args[1]);
    let reason = args.slice(2).join(" ");
    if (!member)
      return message.reply("Please mention a valid member of this server");
    if (!giventime) return message.reply("Please specify a valid time");
    if (!reason) reason = "No reason provided";

    const time = giventime;
    if (giventime > ms("1w") || giventime < ms("1s") || isNaN(time))
      return message.reply("Please specify a valid time");

    const timeoutuser = await member.timeout(time, reason).catch((err) => {
      return message.reply(`An error occured! \`\`\`js\n${err}\`\`\``);
    });

    if (!timeoutuser) return message.reply("I cannot timeout this user!");
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Member timed out successfully!")
      .setImage("https://c.tenor.com/v8JBsczVfD4AAAAC/timeout.gif")
      .setDescription(
        `**${member.user.username}** has been timed out for ${msToTime(
          time
        )}!\nReason: ${reason}`
      )
      .setFooter({ text: ee.footertext, iconURL: ee.footericon });
    return message.reply({
      embeds: [embed],
    });
  },
};

function msToTime(ms) {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds < 60) return seconds + " Sec";
  else if (minutes < 60) return minutes + " Min";
  else if (hours < 24) return hours + " Hrs";
  else return days + " Days";
}
