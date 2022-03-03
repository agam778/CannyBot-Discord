const { MessageEmbed } = require('discord.js')
const ee = require('../../botconfig/embed.json')

module.exports = {
  name: 'puttparty',
  category: 'Activities',
  aliases: [],
  cooldown: '',
  usage: 'puttparty',
  description: 'Play "Puttparty" together with your friends on Discord!',
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
    const channel = message.member.voice.channel
    if (!channel)
      return message.channel.send(
        'You must join a voice channel to play Puttparty!',
      )

    if (!channel.permissionsFor(message.client.user).has('CONNECT'))
      return message.channel.send(
        "I don't have permission to join the voice channel",
      )

    if (!channel.permissionsFor(message.client.user).has('SPEAK'))
      return message.channel.send(
        "I don't have permission to speak in the voice channel",
      )

    const msg = await message.channel.send('Please Wait...')
    client.discordTogether
      .createTogetherCode(channel.id, 'puttparty')
      .then(async (invite) => {
        msg.delete()
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor('RED')
              .setTitle('Puttparty!')
              .setDescription(
                `[Click Here to start the activity!](${invite.code})`,
              )
              .setThumbnail(
                'https://www.graphicsprings.com/filestorage/stencils/084a905bb0bb38fedf776f5f0c5f66b8.png',
              )
              .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
          ],
        })
      })
  },
}
