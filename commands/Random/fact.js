const { MessageEmbed } = require('discord.js')

const axios = require('axios')

module.exports = {
  name: 'fact',
  category: 'Random',
  aliases: ['randomfact'],
  cooldown: '',
  usage: 'fact',
  description: 'Get a random fact.',
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
    axios
      .get(`https://uselessfacts.jsph.pl/random.json?language=en`)
      .then(async (response) => {
        json = response.data
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setTitle(`Here is a fact.`)
          .setDescription(json.text)
          .setFooter({
            text: `Requested by ${message.author.tag}`,
            iconURL: `${client.user.displayAvatarURL()}`,
          })
        message.reply({ embeds: [embed] })
      })
  },
}
