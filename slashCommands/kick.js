const { MessageEmbed } = require("discord.js");
const ee = require("../botconfig/embed.json");
module.exports = {
  name: "kick",
  description: "Kicks a user",
  cooldown: [],
  memberpermissions: ["BAN_MEMBERS"],
  requiredroles: [],
  alloweduserids: [],
  options: [
    {
      User: {
        name: "user",
        description: "The user to kick",
        required: true,
      },
    },
    {
      String: {
        name: "reason",
        description: "The reason for the ban",
        required: false,
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
      const Target = interaction.options.getMember("user");

      if (Target.id === interaction.member.id)
        return interaction.reply({
          content: ":x: You can't kick yourself!",
          ephemeral: true,
        });

      if (Target.permissions.has("ADMINISTRATOR"))
        return interaction.reply({
          content: ":x: You can't kick an administrator!",
          ephemeral: true,
        });

      if (
        Target.roles.highest.position >=
        interaction.member.roles.highest.position
      )
        return interaction.followUp({
          content: ":x: You can't kick someone with a higher role than you!",
          ephemeral: true,
        });

      const Reason =
        interaction.options.getString("reason") || "No reason given";

      if (Reason.length > 512)
        return interaction.reply({
          content: ":x: The reason can't be longer than 512 characters!",
          ephemeral: true,
        });

      const Amount = interaction.options.getString("messages");

      Target.send(
        `You have been kicked from ${interaction.guild.name} for: ${Reason}`
      ).then(() => {
        setTimeout(() => {}, 4000);
        Target.kick(Reason);
      });

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Member kicked successfully!")
        .setImage(
          "https://c.tenor.com/esCHs7tm78UAAAAC/spongebob-squarepants-get-out.gif"
        )
        .setDescription(
          `**${Target.user.username}** has been kick for - ${Reason}`
        )
        .setFooter({ text: ee.footertext, iconURL: ee.footericon });

      interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.log(String(e.stack));
    }
  },
};
