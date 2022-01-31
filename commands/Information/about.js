const Discord = require("discord.js");
var ee = require("../../botconfig/embed.json");
const package = require("../../package.json");
const os = require("os");
module.exports = {
  name: "about",
  category: "Information",
  aliases: ["info"],
  cooldown: 5,
  usage: "about",
  description: "About CannyBot",
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
    const embed = new Discord.MessageEmbed()
      .setColor(ee.color)
      .setTitle("CannyBot")
      .setThumbnail(
        client.user.avatarURL({ format: "png", dynamic: true, size: 1024 })
      )
      .setDescription(
        "Canny bot is a nice and cool bot which has many features like Image Generation, Fun commands, Tech commands, Some Moderation commands and many more! More commands are being added daily and its in continuous development! Coded in discord.js v13 with hardwork of a single developer. This bot is being improved a lot and suggestions always accepted :D"
      )
      .addField("Version", package.version, true)
      .addField("Author", "agam778#9486", true)
      .addField("Discord.js", "v13", true)
      .addField("Node.js", process.version, true)
      .addField("CPU", `${os.cpus()[0].model}`, true)
      .addField("RAM", `${Math.round(os.totalmem() / 1000000000)} GB`, true)
      .addField("OS", `${os.platform()}`, true)
      .addField("Arch", `${os.arch()}`, true)
      .addField(
        "Uptime",
        `${Math.floor(client.uptime / 1000 / 60 / 60)} hours, ${Math.floor(
          (client.uptime / 1000 / 60) % 60
        )} minutes and ${Math.floor((client.uptime / 1000) % 60)} seconds`,
        true
      )
      .addField("Hostname", `${os.hostname()}`, true)
      .setFooter({ text: ee.footertext, iconURL: ee.footericon });
    message.reply({ embeds: [embed] });
  },
};
