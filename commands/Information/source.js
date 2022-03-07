const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

const package = require('../../package.json')
module.exports = {
  name: 'source',
  category: 'Information',
  aliases: ['sourcecode'],
  cooldown: '',
  usage: 'source',
  description: 'Get the Source Code of the bot',
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
    const sourcecode = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Source Code')
        .setStyle('LINK')
        .setEmoji('📝')
        .setURL(package.repository.url),
    )
    const embed = new MessageEmbed()
      .setTitle('Source Code')
      .setDescription(
        `You can get the Source Code of ${client.user.username} here:`,
      )
      .setThumbnail(
        client.user.displayAvatarURL({ format: 'png', dynamic: true }),
      )
      .setFooter({
        text: `Requested by ${message.author.tag}`,
        iconURL: `${client.user.displayAvatarURL()}`,
      })
    message.reply({ embeds: [embed], components: [sourcecode] })
  },
}
