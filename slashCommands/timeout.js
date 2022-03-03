const { MessageEmbed } = require('discord.js')
const ee = require('../botconfig/embed.json')
const ms = require('ms')
module.exports = {
  name: 'timeout',
  description: 'Timeouts a user',
  cooldown: [],
  memberpermissions: ['BAN_MEMBERS'],
  requiredroles: [],
  alloweduserids: [],
  options: [
    {
      User: {
        name: 'user',
        description: 'The user to timeout',
        required: true,
      },
    },
    {
      String: {
        name: 'time',
        description: 'The time to timeout the user for',
        required: true,
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
    const {
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
    const member = interaction.options.getMember('user')
    const giventime = ms(interaction.options.getString('time'))
    let reason = interaction.options.getString('reason')

    if (!reason) reason = 'No reason provided'

    const time = giventime

    if (giventime > ms('1w') || giventime < ms('1s') || isNaN(time))
      return interaction.reply({
        content: 'Please specify a valid time',
        ephemeral: true,
      })

    const timeoutuser = await member.timeout(time, reason).catch((err) => {
      return interaction.reply({
        content: `An error occured! \`\`\`js\n${err}\`\`\``,
        ephemeral: true,
      })
    })

    if (!timeoutuser)
      return interaction.reply('I cannot timeout this user!', {
        ephemeral: true,
      })
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Member timed out successfully!')
      .setImage('https://c.tenor.com/v8JBsczVfD4AAAAC/timeout.gif')
      .setDescription(
        `**${member.user.username}** has been timed out for ${msToTime(
          time,
        )}!\nReason: ${reason}`,
      )
      .setFooter({ text: ee.footertext, iconURL: ee.footericon })
    return interaction.reply({
      embeds: [embed],
    })
  },
}

function msToTime(ms) {
  let seconds = (ms / 1000).toFixed(1)
  let minutes = (ms / (1000 * 60)).toFixed(1)
  let hours = (ms / (1000 * 60 * 60)).toFixed(1)
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1)
  if (seconds < 60) return seconds + ' Sec'
  else if (minutes < 60) return minutes + ' Min'
  else if (hours < 24) return hours + ' Hrs'
  else return days + ' Days'
}
