const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const axios = require("axios");

module.exports = {
  name: "randompic",
  category: "Random",
  aliases: ["randomimage"],
  cooldown: "",
  usage: "randompic",
  description: "Get a random image.",
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
    axios
      .get(
        `https://picsum.photos/v2/list?page=${Math.floor(
          Math.random() * 100
        )}&limit=1`
      )
      .then(async (response) => {
        json = response.data;
        const embed = new MessageEmbed()
          .setColor(ee.color)
          .setTitle(`Random Image`)
          .setImage(json[0].download_url)
          .setFooter({ text: ee.footertext, iconURL: ee.footericon });
        message.reply({ embeds: [embed] });
      });
  },
};
