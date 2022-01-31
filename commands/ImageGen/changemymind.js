const { MessageAttachment } = require("discord.js");
const fs = require("fs");
const https = require("https");

module.exports = {
  name: "changemymind",
  category: "ImageGen",
  aliases: [],
  cooldown: "",
  usage: "changemymind <text>",
  description: "Creates an image with custom text saying 'Change My Mind'",
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
    (async () => {
      const image = await client.nekobot.generate("changemymind", {
        text: `${text}`,
      });
      const url = `${image}`;
      https.get(url, (res) => {
        const path = `${__dirname}/../../downloads/${message.author.id}-${randomchar}-changemymind.png`;
        const filePath = fs.createWriteStream(path);
        res.pipe(filePath);
        filePath.on("finish", () => {
          filePath.close();
          const attachment = new MessageAttachment(`${path}`);
          message.reply({ files: [attachment] });
          setTimeout(function () {
            msg.delete();
            fs.unlinkSync(
              `./downloads/${message.author.id}-${randomchar}-changemymind.png`
            );
          }, 5000);
        });
      });
    })();
  },
};
