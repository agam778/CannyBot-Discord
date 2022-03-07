const { MessageEmbed } = require('discord.js')

const axios = require('axios')

module.exports = {
  name: 'bird',
  category: 'Random',
  aliases: ['randombird'],
  cooldown: '',
  usage: 'bird',
  description: 'Get a random bird image.',
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
    axios.get(`https://some-random-api.ml/img/birb`).then(async (response) => {
      json = response.data
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Here is a Bird!`)
        .setImage(json.link)
        .setFooter({
          text: `Requested by ${message.author.tag}`,
          iconURL: `${client.user.displayAvatarURL()}`,
        })
      message.reply({ embeds: [embed] })
    })
  },
}
