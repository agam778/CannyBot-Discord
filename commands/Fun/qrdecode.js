const axios = require("axios");
module.exports = {
  name: "qrdecode",
  category: "Fun",
  aliases: [],
  cooldown: "",
  usage: "qrdecode <qrcode_image_link>",
  description: "Decode the given qrcode",
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, prefix) => {
    try {
      const attachment = message.attachments.first();
      const text = attachment ? attachment.url : args[0];
      msg = await message.channel.send("Decoding...");
      axios
        .get(`https://api.qrserver.com/v1/read-qr-code/?fileurl=${text}`)
        .then(async (response) => {
          json = response.data;
          let qr = json[0].symbol[0].data;
          message.reply("QR Code Decoded: `" + qr + "`");
        })
        .catch((err) => {
          console.log(err);
          message.reply("An Error Occured!");
        });
      setTimeout(function () {
        msg.delete();
      }, 5000);
    } catch (err) {
      message.reply("An Error Occured!");
      console.log(err);
    }
  },
};
