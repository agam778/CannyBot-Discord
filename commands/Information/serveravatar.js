const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
var ee = require("../../botconfig/embed.json");
module.exports = {
  name: "serveravatar",
  category: "Information",
  aliases: ["savatar"],
  cooldown: 5,
  usage: "serveravatar",
  description: "Shows the Server Avatar",
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
          new Discord.MessageEmbed()
            .setAuthor(
              `Avatar from: ${message.guild.name}`,
              message.guild.iconURL({ dynamic: true }),
              "https://discord.gg/c8aAV4cARB"
            )
            .setColor(ee.color)
            .addField(
              "❱ PNG",
              `[\`LINK\`](${message.guild.iconURL({ format: "png" })})`,
              true
            )
            .addField(
              "❱ JPEG",
              `[\`LINK\`](${message.guild.iconURL({ format: "jpg" })})`,
              true
            )
            .addField(
              "❱ WEBP",
              `[\`LINK\`](${message.guild.iconURL({ format: "webp" })})`,
              true
            )
            .addField(
              "❱ GIF",
              `[\`LINK\`](${message.guild.iconURL({ format: "gif" })})`,
              true
            )
            .setURL(
              message.guild.iconURL({
                dynamic: true,
              })
            )
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setImage(
              message.guild.iconURL({
                dynamic: true,
                size: 256,
              })
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
