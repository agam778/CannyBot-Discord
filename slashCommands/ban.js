const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ban',
  description: 'Ban a user', //the command description for Slash Command Overview
  cooldown: [],
  memberpermissions: ['KICK_MEMBERS'],
  requiredroles: [],
  alloweduserids: [],
  options: [
    {
      User: {
        name: 'user',
        description: 'The user to ban',
        required: true,
      },
    },
    {
      StringChoices: {
        name: 'delete',
        description: 'Delete messages',
        required: true,
        choices: [
          ["Don't Delete Messages", '0'],
          ['Previous 7 Days', '7'],
        ],
      },
    },
    {
      String: {
        name: 'reason',
        description: 'The reason for the ban',
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
      } = interaction
      const Target = interaction.options.getMember('user')

      if (Target.id === interaction.member.id)
        return interaction.reply({
          content: ":x: You can't ban yourself!",
          ephemeral: true,
        })

      if (Target.permissions.has('ADMINISTRATOR'))
        return interaction.reply({
          content: ":x: You can't ban an administrator!",
          ephemeral: true,
        })

      if (
        Target.roles.highest.position >=
        interaction.member.roles.highest.position
      )
        return interaction.followUp({
          content: ":x: You can't ban someone with a higher role than you!",
          ephemeral: true,
        })

      const Reason =
        interaction.options.getString('reason') || 'No reason given'

      if (Reason.length > 512)
        return interaction.reply({
          content: ":x: The reason can't be longer than 512 characters!",
          ephemeral: true,
        })

      const Amount = interaction.options.getString('messages')

      Target.send(
        `You have been banned from ${interaction.guild.name} for: ${Reason}`,
      ).then(() => {
        setTimeout(() => {}, 4000)
        Target.ban({ reason: Reason, days: Amount })
      })

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Member banned successfully!')
        .setImage('https://media1.giphy.com/media/hIgJpsDOgQQ2hsNpuT/giphy.gif')
        .setDescription(
          `**${Target.user.username}** has been banned for - ${Reason}`,
        )
        .setFooter({
          text: `Requested by ${message.author.tag}`,
          iconURL: `${client.user.displayAvatarURL()}`,
        })

      interaction.reply({ embeds: [embed] })
    } catch (e) {
      console.log(String(e.stack))
    }
  },
}
