const { MessageAttachment } = require("discord.js");
const fs = require("fs");
var QRCode = require("qrcode");

module.exports = {
  name: "qrcode",
  category: "ImageGen",
  aliases: [],
  cooldown: "",
  usage: "Qrcode <text>",
  description: "Generate a qrcode of the given text.",
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 1,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    msg = await message.channel.send("Generating QR Code...");
    QRCode.toDataURL(`${text}`, { width: "200" }, function (err, url) {
      let base64Image = url.split(";base64,").pop();
      fs.writeFile(
        `./downloads/${message.author.id}-qrcode.png`,
        base64Image,
        { encoding: "base64" },
        function (err) {
          if (err) throw err;
          const attachment = new MessageAttachment(
            `${__dirname}/../../downloads/${message.author.id}-qrcode.png`
          );
          message.reply({ files: [attachment] });
        }
      );
      setTimeout(function () {
        msg.delete();
        fs.unlinkSync(`./downloads/${message.author.id}-qrcode.png`);
      }, 5000);
    });
  },
};
