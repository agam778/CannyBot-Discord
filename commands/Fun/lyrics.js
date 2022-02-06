const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const Genius = require("genius-lyrics");
const Client = new Genius.Client(process.env.genius_token);
module.exports = {
  name: "lyrics",
  category: "Fun",
  aliases: [],
  cooldown: "",
  usage: "lyrics <song_name>",
  description: "Get the lyrics of any song :)",
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
    const searches = await Client.songs.search(text);
    const firstSong = searches[0];
    const song_title = firstSong.fullTitle;
    const image = firstSong.image;
    const artist = firstSong.artist.name || "Unknown";
    const artist_image = firstSong.artist.image;
    const lyrics = await firstSong.lyrics();
    const part1 = lyrics.slice(0, lyrics.length / 2);
    const part2 = lyrics.slice(lyrics.length / 2);

    const embed1 = new MessageEmbed()
      .setTitle(song_title)
      .setAuthor({
        name: artist,
        iconURL: artist_image,
      })
      .setColor(ee.color)
      .setDescription(part1)
      .setThumbnail(image);
    const embed2 = new MessageEmbed()
      .setColor(ee.color)
      .setDescription(part2)
      .setFooter({ text: ee.footertext, iconURL: ee.footericon });

    message.reply({ embeds: [embed1, embed2] });
  },
};
