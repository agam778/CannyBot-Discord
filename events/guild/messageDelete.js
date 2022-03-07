//Import Modules
const config = require(`../../botconfig/config.json`)

const settings = require(`../../botconfig/settings.json`)
const { onCoolDown, replacemsg } = require('../../handlers/functions')
const Discord = require('discord.js')

module.exports = async (client, message) => {
  if (message.partial || (message.embeds.length && !message.content)) return // content is null or deleted embed

  client.snipes[message.channel.id] = {
    author: message.author,
    content: message.content,
    createdAt: message.createdTimestamp,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null,
  }
}
