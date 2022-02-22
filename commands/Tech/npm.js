const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const fs = require("fs");
const ee = require("../../botconfig/embed.json");

module.exports = {
  name: "npm",
  category: "Tech",
  aliases: [],
  cooldown: "",
  usage: "npm <package>",
  description: "Get info about a npm package",
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
    let npmpackage = args.join("+");
    if (!npmpackage) {
      return message.reply(`Please specify a npm package!`);
    }
    await message.reply(`Loading! Please Wait...`).then((msg) => {
      axios
        .get(`https://api.npms.io/v2/package/${npmpackage}`)
        .then((res) => {
          let data = res.data;
          let embed = new MessageEmbed()
            .setColor("RED")
            .setTitle(`${data.collected.metadata.name}`)
            .setURL(`${data.collected.metadata.links.npm}`)
            .setDescription(`${data.collected.metadata.description}`)
            .addField(
              `Version`,
              `${data.collected.metadata.version}`,
              (inline = true)
            )
            .addField(
              `Author`,
              `${data.collected.metadata.author.name}`,
              (inline = true)
            )
            .addField(
              `License`,
              `${data.collected.metadata.license}`,
              (inline = true)
            )
            .addField(
              `Github`,
              `${data.collected.metadata.links.repository}`,
              (inline = true)
            )
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setThumbnail(
              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/540px-Npm-logo.svg.png"
            );
          msg.edit({
            content: "Here's the info!",
            embeds: [embed],
          });
        })
        .catch((err) => {
          return msg.edit(`An error occured! \`\`\`js\n${err}\`\`\``);
        });
    });
  },
};
