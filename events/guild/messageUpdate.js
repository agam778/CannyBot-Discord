//Import Modules
const config = require(`../../botconfig/config.json`)

const settings = require(`../../botconfig/settings.json`)
const { onCoolDown, replacemsg } = require('../../handlers/functions')
const Discord = require('discord.js')

module.exports = async (client, oldMessage, newMessage) => {
  if (oldMessage.partial) return // content is null

  client.snipes[oldMessage.channel.id] = {
    author: oldMessage.author,
    content: oldMessage.content,
    newcontent: newMessage.content,
    createdAt: newMessage.editedTimestamp,
  }
}
