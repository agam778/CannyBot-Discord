const { MessageAttachment } = require("discord.js");
const fs = require("fs");
const https = require("https");
module.exports = {
  name: "timecard",
  category: "ImageGen",
  aliases: [],
  cooldown: "",
  usage: "timecard <text>",
  description: "Creates a SpongeBob Timecard with your text!",
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
    var randomstring = require("randomstring");
    let randomchar = randomstring.generate(5);
    msg = await message.channel.send(`Please Wait...`);
    const url = `https://cool-api.xyz/spongebob-timecard?text=${text}`;
    https.get(url, (res) => {
      const path = `${__dirname}/../../downloads/${message.author.id}-${randomchar}-timecard.png`;
      const filePath = fs.createWriteStream(path);
      res.pipe(filePath);
      filePath.on("finish", () => {
        filePath.close();
        const attachment = new MessageAttachment(`${path}`);
        message.reply({ files: [attachment] });
        setTimeout(function () {
          msg.delete();
          fs.unlinkSync(
            `./downloads/${message.author.id}-${randomchar}-timecard.png`
          );
        }, 5000);
      });
    });
  },
};
