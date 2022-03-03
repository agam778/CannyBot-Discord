const { MessageEmbed } = require('discord.js')
const ee = require('../../botconfig/embed.json')

module.exports = {
  name: 'poll',
  category: 'Fun',
  aliases: [],
  cooldown: '',
  usage:
    'poll <#channel> <poll title> | <option1> | <option2> | <option3> | <option4> | <option5>',
  description: 'Send a poll in the mentioned channel',
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 1,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: '',
  argstoomany_message: '',
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    const mentionedchannel = message.mentions.channels.first()
    if (!mentionedchannel) {
      return message.reply('Please mention a channel!')
    }
    const polltitle = args.slice(1).join(' ').split('|')[0]
    const polloption1 = args.slice(1).join(' ').split('|')[1]
    const polloption2 = args.slice(1).join(' ').split('|')[2]
    const polloption3 = args.slice(1).join(' ').split('|')[3] || ''
    const polloption4 = args.slice(1).join(' ').split('|')[4] || ''
    const polloption5 = args.slice(1).join(' ').split('|')[5] || ''

    if (args.slice(1).join(' ').split('|').length < 3) {
      return message.reply('Please enter a poll title and at least 2 options')
    }

    if (args.slice(1).join(' ').split('|').length > 6) {
      return message.reply('You can only have 5 options in a poll')
    }

    let option1, option2, option3, option4, option5
    option1 = '🇦'
    option2 = '🇧'
    if (polloption3) option3 = '🇨'
    if (polloption4) option4 = '🇩'
    if (polloption5) option5 = '🇪'

    const embed = new MessageEmbed()
      .setColor(ee.color)
      .setAuthor({
        name: `${message.author.username}`,
        iconURL: message.author.displayAvatarURL(),
      })
      .setTitle(`${polltitle}`)
      .setDescription(
        `${option1 || ''} ${polloption1} \n${option2 || ''} ${polloption2} \n${
          option3 || ''
        } ${polloption3} \n${option4 || ''} ${polloption4} \n${
          option5 || ''
        } ${polloption5}`,
      )
      .setFooter({
        text: ee.footertext,
        iconURL: ee.footericon,
      })

    mentionedchannel.send({ embeds: [embed] }).then(async (msg) => {
      await msg.react(option1)
      await msg.react(option2)
      if (polloption3) await msg.react(option3)
      if (polloption4) await msg.react(option4)
      if (polloption5) await msg.react(option5)
    })
  },
}
