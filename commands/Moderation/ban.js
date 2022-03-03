const Discord = require('discord.js')
var ee = require('../../botconfig/embed.json')
module.exports = {
  name: 'ban',
  category: 'Moderation',
  aliases: [],
  cooldown: '',
  usage: 'ban <@USER> [REASON]',
  description: 'Bans a user from the server',
  memberpermissions: ['BAN_MEMBERS'],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: '',
  argstoomany_message: '',
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    let banMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0])
    if (!banMember)
      return message.channel.send(
        'Please mention a valid member of this server',
      )
    if (banMember.permissions.has('BAN_MEMBERS'))
      return message.channel.send('I cannot ban this user!')
    let reason = args.slice(1).join(' ')
    if (!reason) reason = 'No reason provided'
    if (!message.guild.me.permissions.has('BAN_MEMBERS'))
      return message.channel.send(
        'I do not have the permission to ban members!',
      )
    banMember
      .send(
        'You have been banned from ' + message.guild.name + ' for: ' + reason,
      )
      .then(() => {
        setTimeout(() => {}, 2000)
      })
    message.guild.members.ban(banMember, { reason: reason })
    var embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Member banned successfully!')
      .setImage('https://media1.giphy.com/media/hIgJpsDOgQQ2hsNpuT/giphy.gif')
      .setDescription(
        `**${banMember.user.username}** has been banned for - ${reason}`,
      )
      .setFooter({ text: ee.footertext, iconURL: ee.footericon })
    message.channel.send({ embeds: [embed] })
  },
}
