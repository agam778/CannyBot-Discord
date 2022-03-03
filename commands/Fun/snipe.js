const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'snipe',
  category: 'Fun',
  aliases: [],
  cooldown: '',
  usage: '',
  description: 'Shows a previously deleted/edited message',
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
    const snipe = client.snipes[message.channel.id]
    if (!snipe) return message.reply("There's nothing to snipe!")
    const embed = new MessageEmbed()
      .setAuthor({ name: snipe.author.tag })
      .setFooter({ text: `#${message.channel.name}` })
      .setTimestamp(snipe.createdAt)
      .setColor('RANDOM')
    snipe.content
      ? embed.addField('Original Message', `${snipe.content}`, true)
      : null
    snipe.image ? embed.setImage(snipe.image) : null
    snipe.newcontent
      ? embed.addField('New Message', `${snipe.newcontent}`, true)
      : null
    await message.reply({ embeds: [embed] })
  },
}
