const { MessageAttachment } = require("discord.js");
const fs = require("fs");
const https = require("https");

module.exports = {
  name: "mask",
  category: "ImageGen",
  aliases: [],
  cooldown: "",
  usage: "mask [@USER]",
  description: "Dude Why do you wear that mask all the time?",
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
    const url = `https://api.weky.xyz/canvas/mask?image=${mention.displayAvatarURL(
      { format: "png", size: 1024 }
    )}`;
    https.get(url, (res) => {
      const path = `${__dirname}/../../downloads/${mention.id}-${randomchar}-mask.png`;
      const filePath = fs.createWriteStream(path);
      res.pipe(filePath);
      filePath.on("finish", () => {
        filePath.close();
        const attachment = new MessageAttachment(`${path}`);
        message.reply({ files: [attachment] });
        setTimeout(function () {
          msg.delete();
          fs.unlinkSync(`./downloads/${mention.id}-${randomchar}-mask.png`);
        }, 5000);
      });
    });
  },
};
