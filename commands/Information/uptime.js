const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const { duration } = require("../../handlers/functions");
module.exports = {
  name: "uptime",
  category: "Information",
  aliases: [],
  cooldown: "",
  usage: "uptime",
  description: "Returns the duration on how long the Bot is online",
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setTitle(
              `:white_check_mark: **${
                client.user.username
              }** is online since:\n \`${duration(client.uptime)}\``
            ),
        ],
      });
    } catch (e) {
      console.log(String(e.stack));
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(
              `\`\`\`${
                e.message
                  ? String(e.message).substr(0, 2000)
                  : String(e).substr(0, 2000)
              }\`\`\``
            ),
        ],
      });
    }
  },
};
