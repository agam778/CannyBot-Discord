const { MessageAttachment } = require("discord.js");
const http = require("http");
const fs = require("fs");

module.exports = {
  name: "logo",
  category: "Tech",
  aliases: [],
  cooldown: 2,
  usage: "logo google.com (or other domain)",
  description: "Get the logo of mentioned company",
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
    msg = await message.channel.send(`Loading! Please Wait...`);
    var randomstring = require("randomstring");
    let randomchar = randomstring.generate(5);
    let domain = args.join(" ");
    if (!domain) {
      return message.channel.send(
        `Please specify a domain!\nUsage: ${prefix}logo google.com`
      );
    }
    http.get(
      `http://logo.clearbit.com/${domain}?format=png&size=512`,
      (res) => {
        if (res.statusCode === 404) {
          return message.channel.send(`Couldn't find a logo for ${domain}!`);
        } else {
          const path = `${__dirname}/../../downloads/${message.author.id}-${randomchar}-logo.png`;
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
        }
      }
    );
  },
};
