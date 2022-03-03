const { MessageEmbed } = require('discord.js')
var ee = require('../../botconfig/embed.json')
module.exports = {
  name: 'purge',
  category: 'Moderation',
  aliases: ['delete', 'clean'],
  cooldown: '',
  usage: 'purge <NO_OF_MESSAGES>',
  description: 'Purges the number of messages given in the channel.',
  memberpermissions: ['MANAGE_MESSAGES'],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: '',
  argstoomany_message: '',
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    var amount = Number(args[0])
    var adding = 1
    var newamount = amount + adding
    if (newamount > 100) {
      return message.channel.send('Please give a number less than 100!')
    }
    if (newamount < 1) {
      return message.channel.send('Please give a number greater than 0!')
    }
    message.channel
      .bulkDelete(newamount)
      .then((messages) => {
        var number = messages.size
        var subtracting = 1
        var newnumber = number - subtracting
        message.channel
          .send(
            `Purged \`${newnumber}\` messages <a:purgebroom:869136905617436692>`,
          )
          .then((msg) => {
            setTimeout(function () {
              msg.delete()
            }, 3000)
          })
      })
      .catch((e) => {
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
      })
  },
}
