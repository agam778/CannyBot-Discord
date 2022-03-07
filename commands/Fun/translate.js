const { MessageEmbed } = require('discord.js')

const translate = require('@vitalets/google-translate-api')
module.exports = {
  name: 'translate',
  category: 'Fun',
  aliases: [],
  cooldown: '',
  usage: 'translate lang:<lang_code> text:<your_text>',
  description: 'Translate any text from auto detect to specified language.',
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 2,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: '',
  argstoomany_message: '',
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    var X = args.join(' ')
    var lang = X.replace(new RegExp('.*' + 'lang:'), '')
    var user_text = lang.replace(new RegExp('.*' + 'text:'), '')
    lang = lang.replace(user_text, '').replace('text:', '')
    lang = lang.replace(/ /g, '')
    translate(`${user_text}`, { to: `${lang}` })
      .then((res) => {
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setTitle(`Translated Text`)
          .addField(`Original Text (${res.from.language.iso})`, `${user_text}`)
          .addField(`Translated Text (${lang}) `, `${res.text}`)
          .setFooter({
            text: `Requested by ${message.author.tag}`,
            iconURL: `${client.user.displayAvatarURL()}`,
          })
        message.reply({ embeds: [embed] })
      })
      .catch((err) => {
        message.reply(`An Error Occured!\n\`\`\`js\n${err}\`\`\``)
      })
  },
}
