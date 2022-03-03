const axios = require('axios')

module.exports = {
  name: 'ascii',
  description: 'Convert text to ascii', //the command description for Slash Command Overview
  cooldown: [],
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  options: [
    {
      String: {
        name: 'text',
        description: 'The text to convert.',
        required: true,
      },
    },
  ],
  run: async (client, interaction) => {
    try {
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
      const text = interaction.options.getString('text')
      const encoded = text
        .replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
          return '&#' + i.charCodeAt(0) + ';'
        })
        .replace(/\s/g, '&nbsp;')
      axios
        .get(`https://api.dhravya.me/ascii?font=standard&text=${encoded}`)
        .then((res) => {
          json = res.data
          let textcontent = ''
          if (res.data.error) {
            return interaction.reply({
              content: `An error occured!\n\`\`\`js\n${json.data.errorMessage}\`\`\``,
              ephemeral: true,
            })
          }
          interaction.reply({
            content: `${textcontent}\`\`\`${json.data.Ascii}\`\`\``,
          })
        })
    } catch (err) {
      return interaction.reply({
        content: `An error occured!\n\`\`\`js\n${err}\`\`\``,
        ephemeral: true,
      })
    }
  },
}
