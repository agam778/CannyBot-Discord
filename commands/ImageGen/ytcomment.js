const { MessageAttachment } = require("discord.js");
const fs = require("fs");
const https = require("https");

module.exports = {
  name: "ytcomment",
  category: "ImageGen",
  aliases: [],
  cooldown: "",
  usage: "ytcomment <text>",
  description: "Generate a fake youtube comment",
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 1,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    var randomstring = require("randomstring");
    let randomchar = randomstring.generate(5);
    msg = await message.channel.send(`Please Wait...`);
    const url = `https://some-random-api.ml/canvas/youtube-comment?avatar=${message.author.displayAvatarURL(
      { format: "png", size: 1024 }
    )}&comment=${args.join("%20")}&username=${message.author.username}`;
    https.get(url, (res) => {
      const path = `${__dirname}/../../downloads/${message.author.id}-${randomchar}-ytcomment.png`;
      const filePath = fs.createWriteStream(path);
      res.pipe(filePath);
      filePath.on("finish", () => {
        filePath.close();
        const attachment = new MessageAttachment(`${path}`);
        message.reply({ files: [attachment] });
        setTimeout(function () {
          msg.delete();
          fs.unlinkSync(
            `./downloads/${message.author.id}-${randomchar}-ytcomment.png`
          );
        }, 5000);
      });
    });
  },
};
