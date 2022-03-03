const { MessageEmbed } = require('discord.js')
const ee = require('../../botconfig/embed.json')
module.exports = {
  name: 'ping',
  category: 'Information',
  aliases: ['latency'],
  cooldown: '',
  usage: 'ping',
  description: 'Gives u information on how fast the Bot is',
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
      var date = Date.now()
      message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setThumbnail('https://i.gifer.com/8158.gif')
            .setTitle('Hey! Why Ping?')
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .addFields({
              name: 'Btw Pong!',
              value: `\`${client.ws.ping}ms\``,
              inline: true,
            }),
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
