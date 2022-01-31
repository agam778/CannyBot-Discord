const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const axios = require("axios");

module.exports = {
  name: "cat",
  category: "Random",
  aliases: ["randomcat"],
  cooldown: "",
  usage: "cat",
  description: "Get a random cat image.",
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
      .get(`https://api.thecatapi.com/v1/images/search?mime_types=gif,png`)
      .then(async (response) => {
        json = response.data;
        const embed = new MessageEmbed()
          .setColor(ee.color)
          .setTitle(`Here is a cat. Meow!`)
          .setImage(json[0].url)
          .setFooter({ text: ee.footertext, iconURL: ee.footericon });
        message.reply({ embeds: [embed] });
      });
  },
};
