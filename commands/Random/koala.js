const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const axios = require("axios");

module.exports = {
  name: "koala",
  category: "Random",
  aliases: ["randomkoala"],
  cooldown: "",
  usage: "koala",
  description: "Get a random koala image.",
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
    axios.get(`https://some-random-api.ml/img/koala`).then(async (response) => {
      json = response.data;
      const embed = new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`Here is a Koala!`)
        .setImage(json.link)
        .setFooter({ text: ee.footertext, iconURL: ee.footericon });
      message.reply({ embeds: [embed] });
    });
  },
};
