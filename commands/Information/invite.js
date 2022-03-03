const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
var ee = require('../../botconfig/embed.json')
module.exports = {
  name: 'invite',
  category: 'Information',
  aliases: ['add'],
  cooldown: '',
  usage: 'invite',
  description: 'Sends you an invite link',
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
    const invitelinks = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Administrator Invite')
        .setStyle('LINK')
        .setEmoji('<a:blobdance:899523386458398740>')
        .setURL(
          'https://discord.com/api/oauth2/authorize?client_id=869085787310932060&permissions=8&scope=applications.commands%20bot',
        ),
      new MessageButton()
        .setLabel('Non-Administrator Invite')
        .setStyle('LINK')
        .setEmoji('<a:blobdance:899523386458398740>')
        .setURL(
          'https://discord.com/api/oauth2/authorize?client_id=869085787310932060&permissions=1257889000519&scope=applications.commands%20bot',
        ),
    )

    try {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle('Hey!')
            .setDescription(
              'Wow! Looks like you want to invite me ❤️, To do so, click the button below accordingly',
            )
            .setThumbnail(ee.footericon)
            .setColor(ee.color)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
        ],
        components: [invitelinks],
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
