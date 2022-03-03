const { MessageEmbed } = require('discord.js')
const ee = require('../../botconfig/embed.json')
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
          .setColor(ee.color)
          .setTitle(`Here is a fact.`)
          .setDescription(json.text)
          .setFooter({ text: ee.footertext, iconURL: ee.footericon })
        message.reply({ embeds: [embed] })
      })
  },
}
