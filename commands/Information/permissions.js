const { MessageEmbed } = require('discord.js')

const { GetUser } = require('../../handlers/functions')
module.exports = {
  name: 'permissions',
  category: 'Information',
  aliases: ['perms'],
  cooldown: '',
  usage: 'permissions [@USER]',
  description: 'Shows the Permissions of a Member',
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
    try {
      var user
      if (args[0]) {
        try {
          user = await GetUser(message, args)
        } catch (e) {
          if (!e) return message.reply('UNABLE TO FIND THE USER')
          return message.reply(e)
        }
      } else {
        user = message.author
      }
      if (!user || user == null || user.id == null || !user.id)
        message.reply('❌ Could not find the USER')
      try {
        const member = message.guild.members.cache.get(user.id)
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(
          member.user.displayAvatarURL({ dynamic: true, size: 512 }),
        )
        embeduserinfo.setAuthor({
          name:
            'Permissions from:   ' +
            member.user.username +
            '#' +
            member.user.discriminator,
          iconURL: member.user.displayAvatarURL({ dynamic: true }),
        })
        embeduserinfo.addField(
          '**❱ Permissions:**',
          `${message.member.permissions
            .toArray()
            .map((p) => `\`${p}\``)
            .join(', ')}`,
        )
        embeduserinfo.setColor('RANDOM')
        embeduserinfo.setFooter({
          text: `Requested by ${message.author.tag}`,
          iconURL: `${client.user.displayAvatarURL()}`,
        })
        //send the EMBED
        message.reply({ embeds: [embeduserinfo] })
      } catch (e) {
        console.log(e)
        //create the EMBED
        const embeduserinfo = new MessageEmbed()
        embeduserinfo.setThumbnail(
          user.displayAvatarURL({ dynamic: true, size: 512 }),
        )
        embeduserinfo.setAuthor({
          name:
            'Permissions from:   ' + user.username + '#' + user.discriminator,
          iconURL: user.displayAvatarURL({ dynamic: true }),
        })
        embeduserinfo.addField(
          '**❱ Permissions:**',
          `${message.member.permissions
            .toArray()
            .map((p) => `\`${p}\``)
            .join(', ')}`,
        )
        embeduserinfo.setColor('RANDOM')
        embeduserinfo.setFooter({
          text: `Requested by ${message.author.tag}`,
          iconURL: `${client.user.displayAvatarURL()}`,
        })
        //send the EMBED
        message.reply({ embeds: [embeduserinfo] })
      }
    } catch (e) {
      console.log(String(e.stack))
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor('#e01e01')
            .setFooter({
              text: `Requested by ${message.author.tag}`,
              iconURL: `${client.user.displayAvatarURL()}`,
            })
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(
              `\`\`\`${
                e.message
                  ? String(e.message).substr(0, 2000)
                  : String(e).substr(0, 2000)
              }\`\`\``,
            ),
        ],
      })
    }
  },
}
