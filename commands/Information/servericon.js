const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'servericon',
  category: 'Information',
  aliases: ['serveravatar'],
  cooldown: '',
  usage: 'servericon',
  description: 'Shows the Server Icon',
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
    try {
      message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setAuthor({
              name: `Avatar from: ${message.guild.name}`,
              iconURL: message.guild.iconURL({ dynamic: true }),
            })
            .setColor('RANDOM')
            .addField(
              '❱ PNG',
              `[\`LINK\`](${message.guild.iconURL({ format: 'png' })})`,
              true,
            )
            .addField(
              '❱ JPEG',
              `[\`LINK\`](${message.guild.iconURL({ format: 'jpg' })})`,
              true,
            )
            .addField(
              '❱ WEBP',
              `[\`LINK\`](${message.guild.iconURL({ format: 'webp' })})`,
              true,
            )
            .addField(
              '❱ GIF',
              `[\`LINK\`](${message.guild.iconURL({ format: 'gif' })})`,
              true,
            )
            .setURL(
              message.guild.iconURL({
                dynamic: true,
              }),
            )
            .setFooter({
              text: `Requested by ${message.author.tag}`,
              iconURL: `${client.user.displayAvatarURL()}`,
            })
            .setImage(
              message.guild.iconURL({
                dynamic: true,
                size: 256,
              }),
            ),
        ],
      })
    } catch (e) {
      console.log(String(e.stack))
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor('#e01e01')
            .setFooter({
              text: `Requested by ${message.author.tag}`,
              iconURL: `${client.user.displayAvatarURL()}`,
            })
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(
              `\`\`\`${
                e.message
                  ? String(e.message).substr(0, 2000)
                  : String(e).substr(0, 2000)
              }\`\`\``,
            ),
        ],
      })
    }
  },
}
