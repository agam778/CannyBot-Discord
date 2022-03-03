const prefixModel = require('../../models/prefix')
module.exports = {
  name: 'showprefix',
  category: 'Information',
  aliases: [],
  cooldown: '',
  usage: 'showprefix',
  description: 'Show the current prefix of your server',
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
    const data = await prefixModel.findOne({
      GuildID: message.guild.id,
    })
    if (data) {
      message.reply(
        `The current prefixes are:\n1: **\`${data.Prefix}\`**\n2. <@${client.user.id}>`,
      )
    } else if (!data) {
      message.reply(
        `The current prefixes are:\n1: **\`${process.env.PREFIX}\`**\n2. <@${client.user.id}>`,
      )
    }
  },
}
