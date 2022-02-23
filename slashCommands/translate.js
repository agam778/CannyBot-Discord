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
//       const Target = interaction.options.getMember("user");

//       if (Target.id === interaction.member.id)
//         return interaction.reply({
//           content: ":x: You can't ban yourself!",
//           ephemeral: true,
//         });

//       if (Target.permissions.has("ADMINISTRATOR"))
//         return interaction.reply({
//           content: ":x: You can't ban an administrator!",
//           ephemeral: true,
//         });

//       if (
//         Target.roles.highest.position >=
//         interaction.member.roles.highest.position
//       )
//         return interaction.followUp({
//           content: ":x: You can't ban someone with a higher role than you!",
//           ephemeral: true,
//         });

//       const Reason =
//         interaction.options.getString("reason") || "No reason given";

//       if (Reason.length > 512)
//         return interaction.reply({
//           content: ":x: The reason can't be longer than 512 characters!",
//           ephemeral: true,
//         });

//       const Amount = interaction.options.getString("messages");

//       Target.send(
//         `You have been banned from ${interaction.guild.name} for: ${Reason}`
//       ).then(() => {
//         setTimeout(() => {}, 4000);
//         Target.ban({ reason: Reason, days: Amount });
//       });

//       const embed = new MessageEmbed()
//         .setColor("RANDOM")
//         .setTitle("Member banned successfully!")
//         .setImage("https://media1.giphy.com/media/hIgJpsDOgQQ2hsNpuT/giphy.gif")
//         .setDescription(
//           `**${Target.user.username}** has been banned for - ${Reason}`
//         )
//         .setFooter({ text: ee.footertext, iconURL: ee.footericon });

//       interaction.reply({ embeds: [embed] });
//     } catch (e) {
//       console.log(String(e.stack));
//     }
//   },
// };
