const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");

module.exports = {
  name: "embed",
  category: "Fun",
  aliases: [],
  cooldown: "",
  usage: "embed title | description | imageurl",
  description: "Resends your Text in an embed",
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 1,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    let embed = new MessageEmbed();
    let embed_args = args.join(" ").split("|");
    embed.setTitle(embed_args[0]);
    embed_args[1] ? embed.setDescription(embed_args[1]) : null;
    embed_args[2] ? embed.setImage(embed_args[2]) : null;
    embed.setColor(ee.color);
    embed.setFooter({
      text: `${message.guild.name}`,
      iconURL: `${message.guild.iconURL()}`,
    });
    embed.setAuthor({
      name: message.author.tag,
      iconURL: message.author.displayAvatarURL(),
    });
    message.channel.send({ embeds: [embed] }).catch((err) => {
      message.reply(
        `Oops! An Error Occured!\n\`\`\`js\n${err}\n\`\`\`\nPlease follow this format to create embed: \`${prefix}embed title | description | imageurl\``
      );
    });
  },
};
