const Discord = require('discord.js')
var ee = require('../../botconfig/embed.json')
module.exports = {
  name: 'kick',
  category: 'Moderation',
  aliases: [],
  cooldown: '',
  usage: 'kick <@USER> [REASON]',
  description: 'Kicks a user from the server',
  memberpermissions: ['KICK_MEMBERS'],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: '',
  argstoomany_message: '',
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    let kickMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0])

    if (!kickMember)
      return message.channel.send(
        'Please mention a valid member of this server',
      )
    if (kickMember.permissions.has('KICK_MEMBERS'))
      return message.channel.send('I cannot kick this user!')
    let reason = args.slice(1).join(' ')
    if (!reason) reason = 'No reason provided'
    if (!message.guild.me.permissions.has('KICK_MEMBERS'))
      return message.channel.send(
        'I do not have the permission to kick members!',
      )
    kickMember
      .send(
        'You have been kicked from ' + message.guild.name + ' for: ' + reason,
      )
      .then(() => {
        setTimeout(() => {}, 3000)
        kickMember.kick(reason)
      })
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Member kicked successfully!')
      .setImage(
        'https://c.tenor.com/esCHs7tm78UAAAAC/spongebob-squarepants-get-out.gif',
      )
      .setDescription(
        `**${kickMember.user.username}** has been kick for - ${reason}`,
      )
      .setFooter({ text: ee.footertext, iconURL: ee.footericon })
    message.channel.send({ embeds: [embed] })
  },
}
