const { MessageAttachment } = require("discord.js");
const https = require("https");
const fs = require("fs");

module.exports = {
  name: "webshot",
  category: "Tech",
  aliases: [],
  cooldown: 2,
  usage: "webshot google.com (or other website)",
  description: "Get a screenshot of a website",
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
    let website = args.join(" ");
    if (!website) {
      return message.channel.send(`Please specify a website!`);
    }
    await message.channel.send(`Loading! Please Wait...`).then((msg) => {
      https.get(`https://api.popcat.xyz/screenshot?url=${website}`, (res) => {
        const path = `${__dirname}/../../downloads/${message.author.id}-${randomchar}-webshot.png`;
        const filePath = fs.createWriteStream(path);
        res.pipe(filePath);
        filePath.on("finish", async () => {
          filePath.close();
          const attachment = new MessageAttachment(`${path}`);
          message.reply({ files: [attachment] });
          setTimeout(function () {
            msg.delete();
            fs.unlinkSync(
              `./downloads/${message.author.id}-${randomchar}-logo.png`
            );
          }, 5000);
        });
      });
    });
  },
};
