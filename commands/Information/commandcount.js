const { MessageEmbed } = require('discord.js')

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
            .setColor('RANDOM')
            .setFooter({
              text: `Requested by ${message.author.tag}`,
              iconURL: `${client.user.displayAvatarURL()}`,
            })
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
