const { MessageAttachment } = require("discord.js");
const fs = require("fs");
const https = require("https");
module.exports = {
  name: "neontxt",
  category: "ImageGen",
  aliases: ["neontext"],
  cooldown: "",
  usage: "neontxt <text>",
  description: "Creates a Neon Style Text Image of the text written",
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
    const url = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=alien-glow-anim-logo&text=${text}`;
    https.get(url, (res) => {
      const path = `${__dirname}/../../downloads/${message.author.id}-${randomchar}-neontxt.gif`;
      const filePath = fs.createWriteStream(path);
      res.pipe(filePath);
      filePath.on("finish", () => {
        filePath.close();
        const attachment = new MessageAttachment(`${path}`);
        message.reply({ files: [attachment] });
        setTimeout(function () {
          msg.delete();
          fs.unlinkSync(
            `./downloads/${message.author.id}-${randomchar}-neontxt.gif`
          );
        }, 5000);
      });
    });
  },
};
