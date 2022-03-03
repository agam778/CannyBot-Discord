const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const config = require('../../botconfig/config.json')
var ee = require('../../botconfig/embed.json')
const { GetUser, GetGlobalUser } = require('../../handlers/functions')
const settings = require('../../botconfig/settings.json')
module.exports = {
  name: 'avatar',
  category: 'Information',
  aliases: ['useravatar'],
  cooldown: '',
  usage: 'avatar [@USER] [global]',
  description: 'Shows the Avatar of a User',
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
      var user
      try {
        if (args[1] && args[1].toLowerCase() == 'global') {
          args.pop()
          user = await GetGlobalUser(message, args)
        } else {
          user = await GetUser(message, args)
        }
      } catch (e) {
        return message.reply(e)
      }
      message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setAuthor({
              name: `Avatar from: ${user.tag}`,
              iconURL: user.displayAvatarURL({ dynamic: true }),
            })
            .setColor(ee.color)
            .addField(
              '-> PNG',
              `[\`LINK\`](${user.displayAvatarURL({ format: 'png' })})`,
              true,
            )
            .addField(
              '-> JPEG',
              `[\`LINK\`](${user.displayAvatarURL({ format: 'jpg' })})`,
              true,
            )
            .addField(
              '-> WEBP',
              `[\`LINK\`](${user.displayAvatarURL({ format: 'webp' })})`,
              true,
            )
            .setURL(
              user.displayAvatarURL({
                dynamic: true,
              }),
            )
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setImage(
              user.displayAvatarURL({
                dynamic: true,
                size: 512,
              }),
            ),
        ],
      })
    } catch (e) {
      console.log(String(e.stack))
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
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
