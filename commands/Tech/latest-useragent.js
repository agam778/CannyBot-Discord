const { MessageEmbed } = require('discord.js')
const ee = require('../../botconfig/embed.json')
const axios = require('axios')

module.exports = {
  name: 'latest-useragent',
  category: 'Tech',
  aliases: ['latest-ua', 'l-useragent', 'l-ua', 'useragent', 'ua'],
  cooldown: '',
  usage: 'latest-useragent windows/macos/linux/android/chromos/ios',
  description: 'Shows the latest user agent of different browsers and devices',
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 1,
  maxplusargs: 0,
  argsmissing_message: '',
  argstoomany_message: '',
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    await message.reply('Loading! Please wait...').then(async (msg) => {
      let url = `https://useragent.deta.dev/`
      axios.get(url).then(async (response) => {
        json = response.data
        msg.delete()
        if (text === 'windows') {
          message.reply({
            embeds: [
              new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Latest "Windows" User Agents:')
                .addFields(
                  {
                    name: 'Chrome',
                    value: `\`${json.windows.chrome}\``,
                  },
                  {
                    name: 'Firefox',
                    value: `\`${json.windows.firefox}\``,
                  },
                  {
                    name: 'Edge',
                    value: `\`${json.windows.edge}\``,
                  },
                  {
                    name: 'Opera',
                    value: `\`${json.windows.opera}\``,
                  },
                  {
                    name: 'Vivaldi',
                    value: `\`${json.windows.vivaldi}\``,
                  },
                )
                .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
            ],
          })
        } else if (text === 'macos') {
          message.reply({
            embeds: [
              new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Latest "Mac OS" User Agents:')
                .addFields(
                  {
                    name: 'Chrome',
                    value: `\`${json.macos.chrome}\``,
                  },
                  {
                    name: 'Firefox',
                    value: `\`${json.macos.firefox}\``,
                  },
                  {
                    name: 'Safari',
                    value: `\`${json.macos.safari}\``,
                  },
                  {
                    name: 'Edge',
                    value: `\`${json.macos.edge}\``,
                  },
                  {
                    name: 'Opera',
                    value: `\`${json.macos.opera}\``,
                  },
                  {
                    name: 'Vivaldi',
                    value: `\`${json.macos.vivaldi}\``,
                  },
                )
                .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
            ],
          })
        } else if (text === 'linux') {
          message.reply({
            embeds: [
              new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Latest "Linux" User Agents:')
                .addFields(
                  {
                    name: 'Chrome',
                    value: `\`${json.linux.chrome}\``,
                  },
                  {
                    name: 'Firefox',
                    value: `\`${json.linux.firefox}\``,
                  },
                  {
                    name: 'Opera',
                    value: `\`${json.linux.opera}\``,
                  },
                  {
                    name: 'Vivaldi',
                    value: `\`${json.linux.vivaldi}\``,
                  },
                )
                .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
            ],
          })
        } else if (text === 'android') {
          message.reply({
            embeds: [
              new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Latest "Android" User Agents:')
                .addFields(
                  {
                    name: 'Chrome',
                    value: `\`${json.android.android12.chrome}\``,
                  },
                  {
                    name: 'Firefox',
                    value: `\`${json.android.android12.firefox}\``,
                  },
                  {
                    name: 'Edge',
                    value: `\`${json.android.android12.edge}\``,
                  },
                  {
                    name: 'Opera',
                    value: `\`${json.android.android12.opera}\``,
                  },
                )
                .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
            ],
          })
        } else if (text === 'chromeos') {
          message.reply({
            embeds: [
              new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Latest "Chrome OS" User Agents:')
                .addFields(
                  {
                    name: 'x86_64',
                    value: `\`${json.chromeos.x86_64}\``,
                  },
                  {
                    name: 'armv7l',
                    value: `\`${json.chromeos.armv7l}\``,
                  },
                  {
                    name: 'aarch64',
                    value: `\`${json.chromeos.aarch64}\``,
                  },
                )
                .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
            ],
          })
        } else if (text === 'ios') {
          message.reply({
            embeds: [
              new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Latest "iOS" User Agents:')
                .addFields(
                  {
                    name: 'Chrome',
                    value: `\`${json.ios.chrome}\``,
                  },
                  {
                    name: 'Firefox',
                    value: `\`${json.ios.firefox}\``,
                  },
                  {
                    name: 'Safari',
                    value: `\`${json.ios.safari}\``,
                  },
                )
                .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
            ],
          })
        }
      })
    })
  },
}
