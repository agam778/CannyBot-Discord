const { MessageAttachment } = require("discord.js");
const fs = require("fs");
const https = require("https");

module.exports = {
  name: "whowouldwin",
  category: "ImageGen",
  aliases: [],
  cooldown: "",
  usage: "whowouldwin <@USER1> <@USER2>",
  description: "Who would win!?",
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 2,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    const firstuser = message.mentions.users.first();
    const seconduser = message.mentions.users.last();
    var randomstring = require("randomstring");
    let randomchar = randomstring.generate(5);
    msg = await message.channel.send(`Please Wait...`);
    (async () => {
      const image = await client.nekobot.generate("whowouldwin", {
        user1: firstuser.displayAvatarURL({ format: "png" }),
        user2: seconduser.displayAvatarURL({ format: "png" }),
      });
      const url = `${image}`;
      https.get(url, (res) => {
        const path = `${__dirname}/../../downloads/${message.author.id}-${randomchar}-whowouldwin.png`;
        const filePath = fs.createWriteStream(path);
        res.pipe(filePath);
        filePath.on("finish", () => {
          filePath.close();
          const attachment = new MessageAttachment(`${path}`);
          message.reply({ files: [attachment] });
          setTimeout(function () {
            msg.delete();
            fs.unlinkSync(
              `./downloads/${message.author.id}-${randomchar}-whowouldwin.png`
            );
          }, 5000);
        });
      });
    })();
  },
};
