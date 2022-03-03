var { MessageEmbed } = require(`discord.js`)
var ee = require(`../../botconfig/embed.json`)
module.exports = {
  name: 'changename',
  category: 'Owner',
  aliases: ['changebotname', 'botname'],
  cooldown: '',
  usage: 'changename <NEW BOT NAME>',
  description: 'Changes the Name of the BOT',
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
      if (args.join(' ').length > 32) {
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter({ text: ee.footertext, iconURL: ee.footericon })
              .setTitle(
                `:x: Bot Name too long, can't have more then 32 Letters!`,
              ),
          ],
        })
      }
      client.user
        .setUsername(args.join(' '))
        .then((user) => {
          return message.reply({
            embeds: [
              new MessageEmbed()
                .setColor(ee.color)
                .setFooter({ text: ee.footertext, iconURL: ee.footericon })
                .setTitle(`Changed my Name to: \`${user.username}\``),
            ],
          })
        })
        .catch((e) => {
          return message.reply({
            embeds: [
              new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter({ text: ee.footertext, iconURL: ee.footericon })
                .setTitle(`:x: Something went Wrong`)
                .setDescription(
                  `\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``,
                ),
            ],
          })
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
