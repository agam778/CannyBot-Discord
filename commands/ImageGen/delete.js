const { MessageAttachment } = require("discord.js");
const fs = require("fs");
const https = require("https");
module.exports = {
  name: "delete",
  category: "ImageGen",
  aliases: ["del"],
  cooldown: "",
  usage: "delete [@User]",
  description: "Delete a mentioned user / yourself",
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
    const mention = message.mentions.users.first() || message.author;
    var randomstring = require("randomstring");
    let randomchar = randomstring.generate(5);
    msg = await message.channel.send(`Please Wait...`);
    const url = `https://api.no-api-key.com/api/v2/delete?image=${mention.displayAvatarURL(
      { format: "png" }
    )}`;
    https.get(url, (res) => {
      const path = `${__dirname}/../../downloads/${mention.id}-${randomchar}-delete.png`;
      const filePath = fs.createWriteStream(path);
      res.pipe(filePath);
      filePath.on("finish", () => {
        filePath.close();
        const attachment = new MessageAttachment(`${path}`);
        message.reply({ files: [attachment] });
        setTimeout(function () {
          msg.delete();
          fs.unlinkSync(`./downloads/${mention.id}-${randomchar}-delete.png`);
        }, 5000);
      });
    });
  },
};
