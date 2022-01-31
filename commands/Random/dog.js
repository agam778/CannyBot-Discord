const { MessageEmbed, MessageAttachment } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const axios = require("axios");

module.exports = {
  name: "dog",
  category: "Random",
  aliases: ["randomdog"],
  cooldown: "",
  usage: "dog",
  description: "Get a random dog image.",
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
      .get(`https://dog.ceo/api/breeds/image/random`)
      .then(async (response) => {
        json = response.data;
        const embed = new MessageEmbed()
          .setColor(ee.color)
          .setTitle(`Here is a dog. Woof!`)
          .setImage(json.message)
          .setFooter({ text: ee.footertext, iconURL: ee.footericon });
        message.reply({ embeds: [embed] });
      });
  },
};
