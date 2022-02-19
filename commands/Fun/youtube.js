const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const search = require("youtube-search");
const opts = {
  maxResults: 1,
  key: process.env.youtube_token,
  type: "video",
};
const deepai = require("deepai");
const he = require("he");
module.exports = {
  name: "youtube",
  category: "Fun",
  aliases: [],
  cooldown: "",
  usage: "youtube <song_name>",
  description: "Search a video on YouTube!",
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 1,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text) => {
    const searchtext = text.replace(/[^\w\s]/gi, "").replace(/\s+/g, "+");
    search(searchtext, opts, function (err, results) {
      if (err) {
        message.reply(`Oops, An Error Occured!\n\`\`\`js\n${err}\n\`\`\``);
      } else {
        deepai.setApiKey(process.env.DEEPAI_TOKEN);
        (async function () {
          var resp = await deepai.callStandardApi("nsfw-detector", {
            image: results[0].thumbnails.high.url,
          });
          if (resp.output.nsfw_score > 0.1) {
            message.reply("This is NSFW!");
          } else {
            const ytlinks = new MessageActionRow().addComponents(
              new MessageButton()
                .setLabel("Watch Video")
                .setStyle("LINK")
                .setEmoji("▶️")
                .setURL(results[0].link),
              new MessageButton()
                .setLabel("Search More Videos")
                .setStyle("LINK")
                .setEmoji("🔎")
                .setURL(
                  "https://www.youtube.com/results?search_query=" +
                    searchtext.replace(/\s+/g, "+")
                )
            );
            const embed = new MessageEmbed()
              .setColor("RANDOM")
              .setAuthor({ name: results[0].channelTitle })
              .setTitle(he.decode(results[0].title))
              .setURL(results[0].link)
              .setDescription(
                `${results[0].description}\n\nPublished on: ${results[0].publishedAt}`
              )
              .setImage(results[0].thumbnails.high.url)
              .setFooter({ text: ee.footertext, iconURL: ee.footericon });
            message.reply({ embeds: [embed], components: [ytlinks] });
          }
        })();
      }
    });
  },
};
