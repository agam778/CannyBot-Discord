const { MessageEmbed } = require('discord.js')

const Genius = require('genius-lyrics')
const Client = new Genius.Client(process.env.GENIUS_TOKEN)
const { swap_pages } = require('../../handlers/functions')

module.exports = {
  name: 'lyrics',
  category: 'Fun',
  aliases: [],
  cooldown: '',
  usage: 'lyrics <song_name>',
  description: 'Get the lyrics of any song.',
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 1,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: '',
  argstoomany_message: '',
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    const searches = await Client.songs.search(text)
    const firstSong = searches[0]
    const song_title = firstSong.fullTitle
    const image = firstSong.image
    const artist = firstSong.artist.name || 'Unknown'
    const artist_image = firstSong.artist.image
    const lyrics = await firstSong.lyrics()
    swap_pages(client, message, lyrics, song_title, 700)
  },
}
