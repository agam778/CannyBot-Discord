const { MessageAttachment } = require("discord.js");
const fs = require("fs");
const https = require("https");
module.exports = {
  name: "wasted",
  category: "ImageGen",
  aliases: [],
  cooldown: "",
  usage: "wasted [@User]",
  description: "Oh no, A guy here got wasted 😳",
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    const mention = message.mentions.users.first() || message.author;
    var randomstring = require("randomstring");
    let randomchar = randomstring.generate(5);
    msg = await message.channel.send(`Please Wait...`);
    const url = `https://some-random-api.ml/canvas/wasted?avatar=${mention.displayAvatarURL(
      { format: "png" }
    )}`;
    https.get(url, (res) => {
      const path = `${__dirname}/../../downloads/${mention.id}-${randomchar}-wasted.png`;
      const filePath = fs.createWriteStream(path);
      res.pipe(filePath);
      filePath.on("finish", () => {
        filePath.close();
        const attachment = new MessageAttachment(`${path}`);
        message.reply({ files: [attachment] });
        setTimeout(function () {
          msg.delete();
          fs.unlinkSync(`./downloads/${mention.id}-${randomchar}-wasted.png`);
        }, 5000);
      });
    });
  },
};
