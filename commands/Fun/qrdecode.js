const axios = require("axios");
module.exports = {
  name: "qrdecode",
  category: "Fun",
  aliases: [],
  cooldown: "",
  usage: "qrdecode <qrcode_image_link/attach_image>",
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
      await message.reply("Decoding...").then(async (msg) => {
        axios
          .get(`https://api.qrserver.com/v1/read-qr-code/?fileurl=${text}`)
          .then(async (response) => {
            json = response.data;
            let qr = json[0].symbol[0].data;
            msg.edit("QR Code Decoded: `" + qr + "`");
          })
          .catch((err) => {
            msg.edit(`Oops! An Error Occured.\n\`\`\`js\n${err}\n\`\`\``);
          });
      });
    } catch (err) {
      message.reply("An Error Occured!");
      console.log(err);
    }
  },
};
