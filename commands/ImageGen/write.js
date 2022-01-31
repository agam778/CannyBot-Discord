const { MessageAttachment } = require("discord.js");
const https = require("https");
const fs = require("fs");
module.exports = {
  name: "write",
  category: "ImageGen",
  aliases: [],
  cooldown: 5,
  usage: "write <text>",
  description: "Write text on an image [Use '%0A' for a new line]",
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
    user_text = text.replace(/ /g, "%20");
    if (text.length > 2000) {
      return message.channel.send("Text is too long!");
    }
    if (text.length < 1) {
      return message.channel.send("Text is too short!");
    }
    var randomstring = require("randomstring");
    let randomchar = randomstring.generate(5);
    msg = await message.channel.send(`Please Wait...`);
    const url = `https://apis.xditya.me/write?text=${user_text}`;
    https.get(url, (res) => {
      const path = `${__dirname}/../../downloads/${message.author.id}-${randomchar}-write.png`;
      const filePath = fs.createWriteStream(path);
      res.pipe(filePath);
      filePath.on("finish", () => {
        filePath.close();
        const attachment = new MessageAttachment(`${path}`);
        message.reply({ files: [attachment] });
        setTimeout(function () {
          msg.delete();
          fs.unlinkSync(
            `./downloads/${message.author.id}-${randomchar}-write.png`
          );
        }, 5000);
      });
    });
  },
};
