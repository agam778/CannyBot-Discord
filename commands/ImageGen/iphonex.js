const { MessageAttachment } = require("discord.js");
const fs = require("fs");
const https = require("https");

module.exports = {
  name: "iphonex",
  category: "ImageGen",
  aliases: [],
  cooldown: "",
  usage: "iphonex <imageurl>",
  description: "Fill an Image into an iPhone X",
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
    const urlofimage = args[0];
    if (!urlofimage) {
      message.channel.send("Please give a url of an image!");
      return;
    }
    var randomstring = require("randomstring");
    let randomchar = randomstring.generate(5);
    msg = await message.channel.send(`Please Wait...`);
    (async () => {
      const image = await client.nekobot.generate("iphonex", {
        url: `${urlofimage}`,
      });
      const url = `${image}`;
      https.get(url, (res) => {
        const path = `${__dirname}/../../downloads/${message.author.id}-${randomchar}-iphonex.png`;
        const filePath = fs.createWriteStream(path);
        res.pipe(filePath);
        filePath.on("finish", () => {
          filePath.close();
          const attachment = new MessageAttachment(`${path}`);
          message.reply({ files: [attachment] });
          setTimeout(function () {
            msg.delete();
            fs.unlinkSync(
              `./downloads/${message.author.id}-${randomchar}-iphonex.png`
            );
          }, 5000);
        });
      });
    })();
  },
};
