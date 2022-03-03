const { MessageEmbed } = require('discord.js')
var ee = require('../../botconfig/embed.json')
module.exports = {
  name: 'commandcount',
  category: 'Information',
  aliases: ['cmdcount', 'commandamount', 'cmdamount'],
  cooldown: '',
  usage: 'commandcount',
  description: 'Shows the Amount of Commands an Categories',
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
          new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setTitle(`:gear: **[${client.commands.size}] Commands**`)
            .setDescription(
              `:gear: **[${client.categories.length}] Categories**`,
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
