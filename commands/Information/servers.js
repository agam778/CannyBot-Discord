const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
var ee = require('../../botconfig/embed.json')
module.exports = {
  name: 'servers',
  category: 'Information',
  aliases: ['servername'],
  cooldown: '',
  usage: 'avatar [@USER] [global]',
  description: 'Shows the Avatar of a User',
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
    const backId = 'back'
    const forwardId = 'forward'
    const backButton = new MessageButton({
      style: 'SECONDARY',
      label: 'Back',
      emoji: '⬅️',
      customId: backId,
    })
    const forwardButton = new MessageButton({
      style: 'SECONDARY',
      label: 'Forward',
      emoji: '➡️',
      customId: forwardId,
    })

    // Put the following code wherever you want to send the embed pages:

    const { author, channel } = message
    const guilds = [...client.guilds.cache.values()]

    /**
     * Creates an embed with guilds starting from an index.
     * @param {number} start The index to start from.
     * @returns {Promise<MessageEmbed>}
     */
    const generateEmbed = async (start) => {
      const current = guilds.slice(start, start + 8)

      // You can of course customise this embed however you want
      return new MessageEmbed({
        title: `Showing guilds ${start + 1}-${start + current.length} out of ${
          guilds.length
        }`,
        fields: await Promise.all(
          current.map(async (guild) => ({
            name: guild.name,
            value: `**ID:** ${guild.id}\n**Owner:** ${
              (
                await guild.fetchOwner()
              ).user.tag
            }`,
            footertext: ee.footertext,
            footericon: ee.xfootericon,
          })),
        ),
      })
    }

    // Send the embed with the first 8 guilds
    const canFitOnOnePage = guilds.length <= 8
    const embedMessage = await channel.send({
      embeds: [await generateEmbed(0)],
      components: canFitOnOnePage
        ? []
        : [new MessageActionRow({ components: [forwardButton] })],
    })
    // Exit if there is only one page of guilds (no need for all of this)
    if (canFitOnOnePage) return

    // Collect button interactions (when a user clicks a button),
    // but only when the button as clicked by the original message author
    const collector = embedMessage.createMessageComponentCollector({
      filter: ({ user }) => user.id === author.id,
    })

    let currentIndex = 0
    collector.on('collect', async (interaction) => {
      // Increase/decrease index
      interaction.customId === backId
        ? (currentIndex -= 8)
        : (currentIndex += 8)
      // Respond to interaction by updating message with new embed
      await interaction.update({
        embeds: [await generateEmbed(currentIndex)],
        components: [
          new MessageActionRow({
            components: [
              // back button if it isn't the start
              ...(currentIndex ? [backButton] : []),
              // forward button if it isn't the end
              ...(currentIndex + 8 < guilds.length ? [forwardButton] : []),
            ],
          }),
        ],
      })
    })
  },
}
