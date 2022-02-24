const { MessageAttachment } = require("discord.js");
const { validateMIMEType } = require("validate-image-type");
const fs = require("fs");
const axios = require("axios");
const randomstring = require("randomstring");

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
    let website = args.join(" ");
    if (!website) {
      return message.channel.send(`Please specify a website!`);
    }
    const randomchar = randomstring.generate({
      length: 5,
      charset: "alphabetic",
    });
    const url = `https://capture-website-api.herokuapp.com/capture?url=${website}`;
    const path = `${__dirname}/../../downloads/${randomchar}-webshot.png`;
    await message
      .reply(`<a:WindowsLoading:855012778251124776> Please Wait...`)
      .then(async (msg) => {
        const writer = fs.createWriteStream(path);
        const download = await axios({
          url,
          method: "GET",
          responseType: "stream",
        })
          .then(async (response, err) => {
            if (err)
              return msg.edit({
                content: `<a:wrong:946005824327786547> An error occured!\n\`\`\`js\n${err}\`\`\``,
              });
            response.data.pipe(writer);
            return new Promise((resolve, reject) => {
              writer.on("finish", resolve);
              writer.on("error", reject);
            });
          })
          .then(() => {
            const result = validateMIMEType(path, {
              allowMimeTypes: [
                "image/jpeg",
                "image/gif",
                "image/png",
                "image/svg+xml",
              ],
            });
            if (!result.ok) {
              msg.edit({
                content: `<a:wrong:946005824327786547> An error occured!`,
                files: [
                  new MessageAttachment(
                    `${__dirname}/../../downloads/${randomchar}-webshot.png`,
                    `error.txt`
                  ),
                ],
              });
              fs.unlinkSync(path);
              return;
            }
            const attachment = new MessageAttachment(`${path}`);
            msg.edit({
              content: `Screenshot of: \`${website}\``,
              files: [attachment],
            });
            setTimeout(function () {
              fs.unlinkSync(path);
            }, 5000);
          })
          .catch((err) => {
            msg.edit({
              content: `<a:wrong:946005824327786547> An error occured!\n\`\`\`js\n${err}\`\`\``,
            });
            fs.unlinkSync(path);
          });
      });
  },
};
