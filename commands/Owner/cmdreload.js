var { MessageEmbed } = require(`discord.js`)

module.exports = {
  name: `cmdreload`,
  category: `Owner`,
  aliases: [`commandreload`],
  description: `Reloads a command`,
  usage: `cmdreload <CMD>`,
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: process.env.ownerID,
  minargs: 1,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: '',
  argstoomany_message: '',
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
      let thecmd =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.get(client.aliases.get(args[0].toLowerCase()))
      if (thecmd) {
        try {
          delete require.cache[
            require.resolve(
              `../../commands/${thecmd.category}/${thecmd.name}.js`,
            )
          ]
          client.commands.delete(thecmd.name)
          const pull = require(`../../commands/${thecmd.category}/${thecmd.name}.js`)
          client.commands.set(thecmd.name, pull)
          return message.reply({
            embeds: [
              new MessageEmbed()
                .setColor('RANDOM')
                .setFooter({
                  text: `Requested by ${message.author.tag}`,
                  iconURL: `${client.user.displayAvatarURL()}`,
                })
                .setTitle(`Reloaded: \`${args[0]}\``),
            ],
          })
        } catch (e) {
          return message.reply({
            embeds: [
              new MessageEmbed()
                .setColor('RANDOM')
                .setFooter({
                  text: `Requested by ${message.author.tag}`,
                  iconURL: `${client.user.displayAvatarURL()}`,
                })
                .setTitle(`:x: Could not reload: \`${args[0]}\``)
                .setDescription(
                  `\`\`\`${
                    e.message
                      ? String(e.message).substr(0, 2000)
                      : e.stack
                      ? String(e.stack).substr(0, 2000)
                      : String(e).substr(0, 2000)
                  }\`\`\``,
                ),
            ],
          })
        }
      } else {
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor('#e01e01')
              .setFooter({
                text: `Requested by ${message.author.tag}`,
                iconURL: `${client.user.displayAvatarURL()}`,
              })
              .setTitle(`:x: Could not find: \`${args[0]}\``),
          ],
        })
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
