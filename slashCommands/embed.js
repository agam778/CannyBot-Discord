const { MessageEmbed } = require('discord.js')
const ee = require('../botconfig/embed.json')
module.exports = {
  name: 'embed',
  description: 'Generate an Embed', //the command description for Slash Command Overview
  cooldown: [],
  memberpermissions: ['KICK_MEMBERS'],
  requiredroles: [],
  alloweduserids: [],
  options: [
    {
      String: {
        name: 'title',
        description: 'The title of the embed',
        required: true,
      },
    },
    {
      String: {
        name: 'description',
        description: 'The description of the embed',
        required: true,
      },
    },
    {
      String: {
        name: 'imageurl',
        description: 'The image url of the embed',
        required: false,
      },
    },
  ],
  run: async (client, interaction) => {
    const {
      member,
      channelId,
      guildId,
      applicationId,
      commandName,
      deferred,
      replied,
      ephemeral,
      options,
      id,
      createdTimestamp,
    } = interaction
    const embed = new MessageEmbed()
    const title = options.getString('title')
    const description = options.getString('description')
    const imageurl = options.getString('imageurl')
    embed.setAuthor({
      name: interaction.user.tag,
      iconURL: interaction.user.displayAvatarURL(),
    })
    embed.setTitle(title)
    embed.setDescription(description)

    if (imageurl && !imageurl.startsWith('http')) {
      return interaction.reply({
        content: 'Image URL must start with http or https',
        ephemeral: true,
      })
    }
    imageurl ? embed.setImage(imageurl) : null
    embed.setColor(ee.color)
    embed.setFooter({
      text: `${interaction.guild.name}`,
      iconURL: `${interaction.guild.iconURL()}`,
    })
    interaction.channel.send({ embeds: [embed] })
    interaction.reply({
      content: 'Embed Sent! ✅',
      ephemeral: true,
    })
  },
}
