const { MessageEmbed } = require('discord.js')

const axios = require('axios')

module.exports = {
  name: 'randompic',
  category: 'Random',
  aliases: ['randomimage'],
  cooldown: '',
  usage: 'randompic',
  description: 'Get a random image.',
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
      .get(
        `https://picsum.photos/v2/list?page=${Math.floor(
          Math.random() * 100,
        )}&limit=1`,
      )
      .then(async (response) => {
        json = response.data
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setTitle(`Random Image`)
          .setImage(json[0].download_url)
          .setFooter({
            text: `Requested by ${message.author.tag}`,
            iconURL: `${client.user.displayAvatarURL()}`,
          })
        message.reply({ embeds: [embed] })
      })
  },
}
