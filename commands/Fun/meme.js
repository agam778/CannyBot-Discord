const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const axios = require("axios");

module.exports = {
  name: "meme",
  category: "Fun",
  aliases: [],
  cooldown: "",
  usage: "meme",
  description: "Shows a meme (Make sure not to run it in #general 😂)",
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
    await message.reply("Loading! Please Wait...").then(async (msg) => {
      let url = `https://meme-api.herokuapp.com/gimme`;
      axios.get(url).then(async (response) => {
        json = response.data;
        msg.edit({
          content: "​",
          embeds: [
            new MessageEmbed()
              .setColor("RANDOM")
              .setTitle(`${json.title}`)
              .setAuthor({ name: `${json.author}` })
              .setDescription(`Upvotes: ${json.ups}`)
              .setImage(`${json.url}`)
              .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
          ],
        });
      });
    });
  },
};
