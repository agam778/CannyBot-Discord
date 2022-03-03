const { MessageEmbed } = require('discord.js')
const ee = require('../../botconfig/embed.json')
const axios = require('axios')

module.exports = {
  name: 'fox',
  category: 'Random',
  aliases: ['randomfox'],
  cooldown: '',
  usage: 'fox',
  description: 'Get a random fox image.',
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
    axios.get(`https://some-random-api.ml/img/fox`).then(async (response) => {
      json = response.data
      const embed = new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`Here is a Fox!`)
        .setImage(json.link)
        .setFooter({ text: ee.footertext, iconURL: ee.footericon })
      message.reply({ embeds: [embed] })
    })
  },
}
