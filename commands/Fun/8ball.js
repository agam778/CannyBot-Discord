const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const ee = require("../../botconfig/embed.json");
const Thumbnail = [
  "https://www.lcmb.co.uk/wp-content/uploads/Crystal-ball.png",
  "https://emojipedia-us.s3.amazonaws.com/source/skype/289/crystal-ball_1f52e.png",
  "https://www.pikpng.com/pngl/b/576-5768393_transparent-clipart-crystal-ball-png-download.png",
  "http://assets.stickpng.com/thumbs/5e91d91ad083e200047f0606.png",
  "https://cdn4.iconfinder.com/data/icons/carnival-and-amusement-filled-outline/64/crystal_fortune-512.png",
  "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/47211/crystal-ball-emoji-clipart-md.png",
];
module.exports = {
  name: "8ball",
  category: "Fun",
  aliases: ["8b"],
  cooldown: "",
  usage: "8ball <Your Question>",
  description: "Get to know your fortune :)",
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 1,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    const randomThumbnail =
      Thumbnail[Math.floor(Math.random() * Thumbnail.length)];
    msg = await message.channel.send(`Loading a response! Please Wait...`);
    let url = `https://8ball.delegator.com/magic/JSON/${text}`;
    axios.get(url).then((response) => {
      json = response.data;
      msg.delete();
      message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Here you go:")
            .setAuthor({ name: client.user.username })
            .setThumbnail(randomThumbnail)
            .addFields(
              {
                name: "Question:",
                value: `${json.magic.question}`,
                inline: true,
              },
              {
                name: "Answer:",
                value: `${json.magic.answer}`,
                inline: true,
              },
              { name: "Type:", value: `${json.magic.type}`, inline: true }
            )
            .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
        ],
      });
    });
  },
};
