const { MessageEmbed } = require("discord.js");
const ee = require("../botconfig/embed.json");
const translate = require("@vitalets/google-translate-api");
module.exports = {
  name: "translate",
  description: "Translate text to specified language", //the command description for Slash Command Overview
  cooldown: [],
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  options: [
    {
      String: {
        name: "lang",
        description:
          "The language code to translate to. For example: en, es, fr, etc.",
        required: true,
      },
    },
    {
      String: {
        name: "text",
        description: "The text to translate.",
        required: true,
      },
    },
  ],
  run: async (client, interaction) => {
    try {
      const {
        member,
        channelId,
        guildId,
        applicationId,
        commandName,
        deferred,
        replied,
        ephemeral,
        options,
        id,
        createdTimestamp,
      } = interaction;

      const langcode = interaction.options.getString("lang");
      const text = interaction.options.getString("text");
      translate(`${text}`, { to: `${langcode}` }).then((res) => {
        const embed = new MessageEmbed()
          .setColor(ee.color)
          .setTitle(`Translated Text`)
          .addField(`Original Text (${res.from.language.iso})`, `${text}`)
          .addField(`Translated Text (${langcode}) `, `${res.text}`)
          .setFooter({ text: ee.footertext, iconURL: ee.footericon });
        interaction.reply({ embeds: [embed] });
      });
    } catch (err) {
      interaction.reply({
        content: `An error occured!\n\`\`\`js\n${err}\`\`\``,
        ephemeral: true,
      });
    }
  },
};
