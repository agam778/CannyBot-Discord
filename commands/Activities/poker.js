const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'poker',
  category: 'Activities',
  aliases: [],
  cooldown: '',
  usage: 'poker',
  description: 'Play poker with your friends on Discord!',
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
        'You must join a voice channel to play poker!',
      )

    if (!channel.permissionsFor(message.client.user).has('CONNECT'))
      return message.channel.send(
        "I don't have permission to join the voice channel",
      )

    if (!channel.permissionsFor(message.client.user).has('SPEAK'))
      return message.channel.send(
        "I don't have permission to speak in the voice channel",
      )

    const msg = await message.reply('Please Wait...')
    client.discordTogether
      .createTogetherCode(channel.id, 'poker')
      .then(async (invite) => {
        msg.delete()
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor('RED')
              .setTitle('Poker!')
              .setDescription(
                `[Click Here to start the activity!](${invite.code})`,
              )
              .setThumbnail(
                'https://logos.textgiraffe.com/logos/logo-name/Poker-designstyle-poker-m.png',
              )
              .setFooter({
                text: `Requested by ${message.author.tag}`,
                iconURL: `${client.user.displayAvatarURL()}`,
              }),
          ],
        })
      })
  },
}
