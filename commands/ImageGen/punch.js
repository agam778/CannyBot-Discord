const { MessageAttachment } = require("discord.js");
const fs = require("fs");
const https = require("https");

module.exports = {
  name: "punch",
  category: "ImageGen",
  aliases: [],
  cooldown: "",
  usage: "punch <@User>",
  description: "Punch a mentioned user!",
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
    if (!message.mentions.users.first())
      return message.channel.send("Please mention someone to punch!");
    if (message.mentions.users.first().id === message.author.id)
      return message.channel.send("Please mention someone else to punch!");
    const mention = message.mentions.users.first();
    var randomstring = require("randomstring");
    let randomchar = randomstring.generate(5);
    msg = await message.channel.send(`Please Wait...`);
    const url = `https://api.no-api-key.com/api/v2/punch?punch=${message.author.displayAvatarURL(
      { format: "png" }
    )}&punched=${mention.displayAvatarURL({ format: "png" })}`;
    https.get(url, (res) => {
      const path = `${__dirname}/../../downloads/${mention.id}-${randomchar}-punch.png`;
      const filePath = fs.createWriteStream(path);
      res.pipe(filePath);
      filePath.on("finish", () => {
        filePath.close();
        const attachment = new MessageAttachment(`${path}`);
        message.reply({ files: [attachment] });
        setTimeout(function () {
          msg.delete();
          fs.unlinkSync(`./downloads/${mention.id}-${randomchar}-punch.png`);
        }, 5000);
      });
    });
  },
};
