const { MessageEmbed } = require('discord.js')
const ee = require('../../botconfig/embed.json')

module.exports = (client, message) => {
  if (process.env.EVENT_LOG_CHANNEL) {
    client.on('guildCreate', async (guild) => {
      const guildcreateembed = new MessageEmbed()
        .setColor('#22bb33')
        .setFooter({ text: ee.footertext, iconURL: ee.footericon })
        .setTitle(`${client.user.username} has been added to a new guild!`)
        .addFields(
          {
            name: 'Guild Name',
            value: `\`${guild.name}\``,
            inline: true,
          },
          {
            name: 'Guild ID',
            value: `\`${guild.id}\``,
            inline: true,
          },
        )
        .setTimestamp()
      try {
        client.channels.cache
          .get(process.env.EVENT_LOG_CHANNEL)
          .send({ embeds: [guildcreateembed] })
      } catch (err) {
        console.log(err)
      }
    })
  }
}
