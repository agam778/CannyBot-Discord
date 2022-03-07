const { MessageEmbed } = require('discord.js')

const settings = require('../../botconfig/settings.json')
module.exports = {
  name: 'help',
  category: 'Information',
  aliases: ['h', 'commandinfo', 'cmds', 'cmd', 'halp'],
  cooldown: '',
  usage: 'help [Commandname]',
  description: 'Returns all Commmands, or one specific command',
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
      if (args[0]) {
        const embed = new MessageEmbed()
        const cmd =
          client.commands.get(args[0].toLowerCase()) ||
          client.commands.get(client.aliases.get(args[0].toLowerCase()))
        if (!cmd) {
          return message.reply({
            embeds: [
              embed
                .setColor('#e01e01')
                .setDescription(
                  `No Information found for command **${args[0].toLowerCase()}**`,
                ),
            ],
          })
        }
        if (cmd.name) embed.addField('**Command name**', `\`${cmd.name}\``)
        if (cmd.name)
          embed.setTitle(`Detailed Information about:\`${cmd.name}\``)
        if (cmd.description)
          embed.addField('**Description**', `\`${cmd.description}\``)
        if (cmd.aliases)
          embed.addField(
            '**Aliases**',
            `\`${cmd.aliases.map((a) => `${a}`).join('`, `')}\``,
          )
        if (cmd.cooldown)
          embed.addField('**Cooldown**', `\`${cmd.cooldown} Seconds\``)
        else
          embed.addField(
            '**Cooldown**',
            `\`${settings.default_cooldown_in_sec} Second\``,
          )
        if (cmd.usage) {
          embed.addField('**Usage**', `\`${prefix}${cmd.usage}\``)
          embed.setFooter({ text: 'Syntax: <> = required, [] = optional' })
        }
        return message.reply({ embeds: [embed.setColor('RANDOM')] })
      } else {
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setThumbnail(
            'https://cdn.discordapp.com/emojis/748654505029009479.png',
          )
          .setTitle('Help Menu:')
          .setFooter({
            text: `To see command Descriptions and Information, type: ${prefix}help [CMD NAME]`,
            iconURL: client.user.displayAvatarURL(),
          })
        const commands = (category) => {
          return client.commands
            .filter((cmd) => cmd.category === category)
            .map((cmd) => `\`${cmd.name}\``)
        }
        try {
          for (let i = 0; i < client.categories.length; i += 1) {
            const current = client.categories[i]
            const items = commands(current)
            embed.addField(
              `**${current.toUpperCase()} [${items.length}]**`,
              `| ${items.join(', ')}`,
            )
          }
        } catch (e) {
          console.log(String(e.stack))
        }
        message.reply({ embeds: [embed] })
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
