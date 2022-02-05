const { MessageAttachment } = require("discord.js");
const fs = require("fs");
const https = require("https");

module.exports = {
  name: "caution",
  category: "ImageGen",
  aliases: [],
  cooldown: "",
  usage: "caution <text>",
  description: "Creates a caution image with specified text",
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 1,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "Please write something",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    var randomstring = require("randomstring");
    let randomchar = randomstring.generate(5);
    msg = await message.channel.send(`Please Wait...`);
    const url = `https://api.popcat.xyz/caution?text=${text}`;
    https.get(url, (res) => {
      const path = `${__dirname}/../../downloads/${message.author.id}-${randomchar}-caution.png`;
      const filePath = fs.createWriteStream(path);
      res.pipe(filePath);
      const attachment = new MessageAttachment(`${path}`);
      message.reply({ files: [attachment] });
      filePath.on("finish", () => {
        filePath.close();
        setTimeout(function () {
          msg.delete();
          fs.unlinkSync(
            `./downloads/${message.author.id}-${randomchar}-caution.png`
          );
        }, 5000);
      });
    });
  },
};
