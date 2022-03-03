module.exports = {
  name: 'dm',
  category: 'Owner',
  aliases: ['senddm'],
  cooldown: 5,
  usage: 'dm <@USER> <message>',
  description: 'Sends a direct message to a specified member',
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: process.env.ownerID,
  minargs: 2,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: '',
  argstoomany_message: '',
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    let sendmsguser = message.mentions.users.first()
    let givenmsg = args.slice(1).join(' ')
    if (!givenmsg)
      return message.channel.send('Kek you forgot to tell what to send')
    sendmsguser.send(givenmsg)
    message.react('✅')
  },
}
