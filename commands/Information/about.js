const Discord = require('discord.js')

const package = require('../../package.json')
const os = require('os')
module.exports = {
  name: 'about',
  category: 'Information',
  aliases: ['info'],
  cooldown: '',
  usage: 'about',
  description: 'About the Bot',
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: '',
  argstoomany_message: '',
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`${client.user.username}`)
      .setThumbnail(
        client.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }),
      )
      .setDescription(
        `${
          client.user.username ? client.user.username : 'CannyBot'
        } is a nice and cool bot which has many features like Image Generation, Fun commands, Tech commands, Some Moderation commands and many more! More commands are being added daily and its in continuous development! Coded in discord.js v13 with hardwork of a single developer, \`agam778#9486\`.`,
      )
      .addField('Version', package.version, true)
      .addField('Author', 'agam778#9486', true)
      .addField('Discord.js', 'v13', true)
      .addField('Node.js', process.version, true)
      .addField('CPU', `${os.cpus()[0].model}`, true)
      .addField('RAM', `${Math.round(os.totalmem() / 1000000000)} GB`, true)
      .addField('OS', `${os.platform()}`, true)
      .addField('Arch', `${os.arch()}`, true)
      .addField(
        'Uptime',
        `${Math.floor(client.uptime / 1000 / 60 / 60)} hours, ${Math.floor(
          (client.uptime / 1000 / 60) % 60,
        )} minutes and ${Math.floor((client.uptime / 1000) % 60)} seconds`,
        true,
      )
      .addField('Hostname', `${os.hostname()}`, true)
      .addField('Source Code', 'https://github.com/agam778/CannyBot')
      .setFooter({
        text: `Requested by ${message.author.tag}`,
        iconURL: `${client.user.displayAvatarURL()}`,
      })
    message.reply({ embeds: [embed] })
  },
}
