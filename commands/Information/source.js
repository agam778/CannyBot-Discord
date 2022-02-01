const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const package = require("../../package.json");
module.exports = {
  name: "source",
  category: "Information",
  aliases: ["sourcecode"],
  cooldown: 5,
  usage: "source",
  description: "Get the Source Code of CannyBot",
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
    const sourcecode = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Source Code")
        .setStyle("LINK")
        .setEmoji("📝")
        .setURL(package.repository.url)
    );
    const embed = new MessageEmbed()
      .setTitle("Source Code")
      .setDescription("You can get the Source Code of CannyBot here:")
      .setThumbnail(
        client.user.displayAvatarURL({ format: "png", dynamic: true })
      )
      .setFooter({ text: ee.footertext, iconURL: ee.footericon });
    message.reply({ embeds: [embed], components: [sourcecode] });
  },
};
