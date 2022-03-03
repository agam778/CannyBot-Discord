const tesseract = require('node-tesseract-ocr')
const https = require('https')
const fs = require('fs')
const { MessageEmbed } = require('discord.js')
const ee = require('../../botconfig/embed.json')
module.exports = {
  name: 'ocr',
  category: 'Fun',
  aliases: [],
  cooldown: '',
  usage: 'ocr [lang] <attach_image>',
  description: 'Extract text from image',
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: '',
  argstoomany_message: '',
  run: async (client, message, args, plusArgs, cmdUser, prefix) => {
    const config = {
      lang: args[0] || 'eng',
      oem: 3,
      psm: 3,
    }
    const attachment = message.attachments.first()
    if (!attachment) {
      return message.reply('Please attach an image!')
    }
    https.get(attachment.url, (res) => {
      const path = `${__dirname}/../../downloads/${message.author.id}-ocrimage.png`
      const filePath = fs.createWriteStream(path)
      res.pipe(filePath)
      filePath.on('finish', () => {
        filePath.close()
        tesseract
          .recognize(path, config)
          .then((text) => {
            if (!text) {
              return message.reply('Could not extract text from image!')
            }
            if (text.length > 2000) {
              text = text.substring(0, 2000)
            }
            const embed = new MessageEmbed()
              .setColor('#0099ff')
              .setTitle('Extracted Text Successfully!')
              .setDescription(`\`\`\`${text}\`\`\``)
              .setFooter({
                text: ee.footertext,
                iconURL: ee.footericon,
              })
            message.reply({ embeds: [embed] })
            setTimeout(function () {
              fs.unlinkSync(`./downloads/${message.author.id}-ocrimage.png`)
            }, 5000)
          })
          .catch((err) => {
            message.reply(`Oops! An error occured!\n\`\`\`js\n${err}\`\`\``)
          })
      })
    })
  },
}
