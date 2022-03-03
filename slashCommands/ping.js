const { MessageEmbed } = require('discord.js')
const config = require('../botconfig/config.json')
const ee = require('../botconfig/embed.json')
const settings = require('../botconfig/settings.json')
module.exports = {
  name: 'ping',
  description: 'Pings the bot', //the command description for Slash Command Overview
  cooldown: [],
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  options: [
    //OPTIONAL OPTIONS, make the array empty / dont add this option if you don't need options!
    //INFORMATIONS! You can add Options, but mind that the NAME MUST BE LOWERCASED! AND NO SPACES!!!, for the CHOCIES you need to add a array of arrays; [ ["",""] , ["",""] ]
    //{"Integer": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getInteger("ping_amount")
    //{"String": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getString("ping_amount")
    //{"User": { name: "ping_a_user", description: "To Ping a user lol", required: false }}, //to use in the code: interacton.getUser("ping_a_user")
    //{"Channel": { name: "what_channel", description: "To Ping a Channel lol", required: false }}, //to use in the code: interacton.getChannel("what_channel")
    //{"Role": { name: "what_role", description: "To Ping a Role lol", required: false }}, //to use in the code: interacton.getRole("what_role")
    //{"IntChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", 1], ["Discord Api", 2]] }, //here the second array input MUST BE A NUMBER // TO USE IN THE CODE: interacton.getInteger("what_ping")
    // {
    //   StringChoices: {
    //     name: "what_ping",
    //     description: "What Ping do you want to get?",
    //     required: true,
    //     choices: [
    //       ["Bot", "botping"],
    //       ["Discord Api", "api"],
    //     ],
    //   },
    // }, //here the second array input MUST BE A STRING // TO USE IN THE CODE: interacton.getString("what_ping")
  ],
  run: async (client, interaction) => {
    try {
      //console.log(interaction, StringOption)

      //things u can directly access in an interaction!
      const {
        member,
        channelId,
        guildId,
        applicationId,
        commandName,
        deferred,
        replied,
        ephemeral,
        options,
        id,
        createdTimestamp,
      } = interaction
      const { guild } = member
      const pingEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Hey! Why ping?')
        .setThumbnail('https://i.gifer.com/8158.gif')
        .addFields({
          name: 'Btw Pong!',
          value: `\`${client.ws.ping}ms\``,
          inline: true,
        })
        .setFooter({ text: ee.footertext, iconURL: ee.footericon })

      interaction.reply({ embeds: [pingEmbed] })
    } catch (e) {
      console.log(String(e.stack))
    }
  },
}
