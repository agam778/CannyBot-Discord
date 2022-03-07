const { MessageEmbed } = require(`discord.js`)
const { inspect } = require(`util`)

module.exports = {
  name: `eval`,
  category: `Owner`,
  aliases: [`evaluate`, 'evaluate', 'eval'],
  description: `Eval a Command!`,
  usage: `eval <CODE>`,
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
    } catch (e) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor('#e01e01')
            .setFooter(
              `Requested by ${message.author.tag}`,
              `${client.user.displayAvatarURL()}`,
            )
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
