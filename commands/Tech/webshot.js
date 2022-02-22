const { MessageAttachment } = require("discord.js");
const fs = require("fs");
const pop = require("popcat-wrapper");

module.exports = {
  name: "webshot",
  category: "Tech",
  aliases: [],
  cooldown: "",
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
    await message.channel.send(`Loading! Please Wait...`).then(async (msg) => {
      const webshot = await pop.screenshot(website);
      const attachment = new MessageAttachment(
        webshot,
        `${randomchar}-webshot.png`
      );
      msg.delete();
      message.reply({ files: [attachment] });
    });
  },
};
