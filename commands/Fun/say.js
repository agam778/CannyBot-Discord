const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
  name: "say",
  category: "Fun",
  aliases: [],
  cooldown: "",
  usage: "say <TEXT>",
  description: "Resends your Text",
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 1,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "You are missing the text you wanna add to the message!",
  argstoomany_message: "You are having too many arguments for this Command!",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
      if (!args[0])
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter({ text: ee.footertext, iconURL: ee.footericon })
              .setTitle(`❌ ERROR | You didn't provided a Text`)
              .setDescription(`Usage: \`${prefix}say <Your Text>\``),
          ],
        });
      const replacedword = replaced(text);
      message.channel.send(
        replacedword.substr(0, 2000) + `\n- Said by ${message.author.tag}`
      );
    } catch (e) {
      message.reply(`Oops! An Error Occured!\n\`\`\`js\n" + e + "\n\`\`\``);
    }
  },
};

function replaced(string) {
  return string
    .replace(
      /(?<![A-Z])@everyone(?![A-Z])/gi,
      "<:attherate:899514552029438012>everyone"
    )
    .replace(
      /(?<![A-Z])@here(?![A-Z])/gi,
      "<:attherate:899514552029438012>here"
    )
    .replace(/(?<![A-Z])@(?![A-Z])/gi, "<:attherate:899514552029438012>");
}
