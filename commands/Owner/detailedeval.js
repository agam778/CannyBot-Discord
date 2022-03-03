const { MessageEmbed } = require(`discord.js`)
const { inspect } = require(`util`)
const ee = require('../../botconfig/embed.json')
module.exports = {
  name: `detailedeval`,
  category: `Owner`,
  aliases: [`deval`],
  description: `Eval a Command with Details!`,
  usage: `detailedeval <CODE>`,
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: process.env.ownerID,
  minargs: 1,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: '',
  argstoomany_message: '',
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
      let evaled
      if (
        args.join(` `).includes(`token`) ||
        args.join(` `).includes(`TOKEN`) ||
        args.join(` `).includes(`BOT_TOKEN`)
      ) {
        return message.reply('Yeah, and?')
      }
      evaled = await eval(args.join(` `))
      let string = inspect(evaled)
      if (
        string.includes(client.token) ||
        string.includes(`BOT_TOKEN`) ||
        string.includes(`TOKEN`) ||
        string.includes(`token`)
      ) {
        return message.reply('Yeah, and?')
      }
      if (string.length > 2000) {
        string = string.substring(0, 2000)
      }
      const embed = new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`${client.user.username} | Eval`)
        .setDescription(`\`\`\`js\n${string.substring(0, 2000)}\`\`\``)
        .setFooter({ text: ee.footertext, iconURL: ee.footericon })
      message.reply({ embeds: [embed] })
    } catch (e) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
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
