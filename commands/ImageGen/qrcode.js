const { MessageAttachment } = require('discord.js')
const fs = require('fs')
var QRCode = require('qrcode')

module.exports = {
  name: 'qrcode',
  category: 'ImageGen',
  aliases: [],
  cooldown: '',
  usage: 'qrcode <text>',
  description: 'Generate a qrcode of the given text.',
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 1,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: '',
  argstoomany_message: '',
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    const path = `${__dirname}/../../downloads/${message.author.id}-qrcode.png`
    await message
      .reply('<a:WindowsLoading:855012778251124776> Generating QR Code...')
      .then(async (msg) => {
        QRCode.toDataURL(`${text}`, { width: '200' }, function (err, url) {
          let base64Image = url.split(';base64,').pop()
          fs.writeFile(
            path,
            base64Image,
            { encoding: 'base64' },
            function (err) {
              if (err) throw err
              const attachment = new MessageAttachment(path)
              msg.edit({
                content: 'Here is the QR Code.',
                files: [attachment],
              })
            },
          )
          setTimeout(function () {
            fs.unlinkSync(path)
          }, 5000)
        })
      })
  },
}
