//Import Modules
const config = require(`../../botconfig/config.json`)

const settings = require(`../../botconfig/settings.json`)
const { onCoolDown, replacemsg } = require('../../handlers/functions')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const mongoprefix = require('../../models/prefix')
module.exports = async (client, message) => {
  if (!message.guild || !message.channel || message.author.bot) return
  if (message.channel.partial) await message.channel.fetch()
  if (message.partial) await message.fetch()
  // now if prefix is in db, we will use that otherwise we will use the default prefix
  const prefix = await mongoprefix
    .findOne({
      GuildID: message.guild.id,
    })
    .then((res) => {
      if (res) return res.Prefix
      else return process.env.PREFIX
    })

  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})`,
  )
  if (!prefixRegex.test(message.content)) return
  const [, mPrefix] = message.content.match(prefixRegex)
  const args = message.content
    .slice(mPrefix.length)
    .trim()
    .split(/ +/)
    .filter(Boolean)
  const cmd = args.length > 0 ? args.shift().toLowerCase() : null
  if (cmd.length == 0) {
    if (mPrefix.includes(client.user.id)) {
      message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setFooter({
              text: `Requested by ${message.author.tag}`,
              iconURL: `${client.user.displayAvatarURL()}`,
            })
            .setTitle(`:thumbsup: **My Prefix here, is __\`${prefix}\`__**`),
        ],
      })
    }
    return
  }
  let command = client.commands.get(cmd)
  if (!command) command = client.commands.get(client.aliases.get(cmd))
  if (command) {
    if (onCoolDown(message, command)) {
      return message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor('#e01e01')
            .setFooter({
              text: `Requested by ${message.author.tag}`,
              iconURL: `${client.user.displayAvatarURL()}`,
            })
            .setTitle(
              replacemsg(settings.messages.cooldown, {
                prefix: prefix,
                command: command,
                timeLeft: onCoolDown(message, command),
              }),
            ),
        ],
      })
    }
    try {
      //if Command has specific permission return error
      if (
        command.memberpermissions &&
        command.memberpermissions.length > 0 &&
        !message.member.permissions.has(command.memberpermissions)
      ) {
        return message
          .reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor('#e01e01')
                .setFooter({
                  text: `Requested by ${message.author.tag}`,
                  iconURL: `${client.user.displayAvatarURL()}`,
                })
                .setTitle(
                  replacemsg(settings.messages.notallowed_to_exec_cmd.title),
                )
                .setDescription(
                  replacemsg(
                    settings.messages.notallowed_to_exec_cmd.description
                      .memberpermissions,
                    {
                      command: command,
                      prefix: prefix,
                    },
                  ),
                ),
            ],
          })
          .then((msg) => {
            setTimeout(() => {
              msg.delete().catch((e) => {
                console.log(String(e))
              })
            }, settings.timeout.notallowed_to_exec_cmd.memberpermissions)
          })
          .catch((e) => {
            console.log(String(e))
          })
      }
      //if Command has specific needed roles return error
      if (
        command.requiredroles &&
        command.requiredroles.length > 0 &&
        message.member.roles.cache.size > 0 &&
        !message.member.roles.cache.some((r) =>
          command.requiredroles.includes(r.id),
        )
      ) {
        return message
          .reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor('#e01e01')
                .setFooter({
                  text: `Requested by ${message.author.tag}`,
                  iconURL: `${client.user.displayAvatarURL()}`,
                })
                .setTitle(
                  replacemsg(settings.messages.notallowed_to_exec_cmd.title),
                )
                .setDescription(
                  replacemsg(
                    settings.messages.notallowed_to_exec_cmd.description
                      .requiredroles,
                    {
                      command: command,
                      prefix: prefix,
                    },
                  ),
                ),
            ],
          })
          .then((msg) => {
            setTimeout(() => {
              msg.delete().catch((e) => {
                console.log(String(e))
              })
            }, settings.timeout.notallowed_to_exec_cmd.requiredroles)
          })
          .catch((e) => {
            console.log(String(e))
          })
      }
      //if Command has specific users return error
      if (
        command.alloweduserids &&
        command.alloweduserids.length > 0 &&
        !command.alloweduserids.includes(message.author.id)
      ) {
        return message
          .reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor('#e01e01')
                .setFooter({
                  text: `Requested by ${message.author.tag}`,
                  iconURL: `${client.user.displayAvatarURL()}`,
                })
                .setTitle(
                  replacemsg(settings.messages.notallowed_to_exec_cmd.title),
                )
                .setDescription(
                  replacemsg(
                    settings.messages.notallowed_to_exec_cmd.description
                      .alloweduserids,
                    {
                      command: command,
                      prefix: prefix,
                    },
                  ),
                ),
            ],
          })
          .then((msg) => {
            setTimeout(() => {
              msg.delete().catch((e) => {
                console.log(String(e))
              })
            }, settings.timeout.notallowed_to_exec_cmd.alloweduserids)
          })
          .catch((e) => {
            console.log(String(e))
          })
      }
      //if command has minimum args, and user dont entered enough, return error
      if (
        command.minargs &&
        command.minargs > 0 &&
        args.length < command.minargs
      ) {
        return message
          .reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor('#e01e01')
                .setFooter({
                  text: `Requested by ${message.author.tag}`,
                  iconURL: `${client.user.displayAvatarURL()}`,
                })
                .setTitle(':x: Wrong Command Usage!')
                .setDescription(
                  command.argsmissing_message &&
                    command.argsmissing_message.trim().length > 0
                    ? command.argsmissing_message
                    : command.usage
                    ? 'Usage: ' + command.usage
                    : 'Wrong Command Usage',
                ),
            ],
          })
          .then((msg) => {
            setTimeout(() => {
              msg.delete().catch((e) => {
                console.log(String(e))
              })
            }, settings.timeout.minargs)
          })
          .catch((e) => {
            console.log(String(e))
          })
      }
      //if command has maximum args, and user enters too many, return error
      if (
        command.maxargs &&
        command.maxargs > 0 &&
        args.length > command.maxargs
      ) {
        return message
          .reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor('#e01e01')
                .setFooter({
                  text: `Requested by ${message.author.tag}`,
                  iconURL: `${client.user.displayAvatarURL()}`,
                })
                .setTitle(':x: Wrong Command Usage!')
                .setDescription(
                  command.argstoomany_message &&
                    command.argstoomany_message.trim().length > 0
                    ? command.argstoomany_message
                    : command.usage
                    ? 'Usage: ' + command.usage
                    : 'Wrong Command Usage',
                ),
            ],
          })
          .then((msg) => {
            setTimeout(() => {
              msg.delete().catch((e) => {
                console.log(String(e))
              })
            }, settings.timeout.maxargs)
          })
          .catch((e) => {
            console.log(String(e))
          })
      }

      //if command has minimum args (splitted with "++"), and user dont entered enough, return error
      if (
        command.minplusargs &&
        command.minplusargs > 0 &&
        args.join(' ').split('++').filter(Boolean).length < command.minplusargs
      ) {
        return message
          .reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor('#e01e01')
                .setFooter({
                  text: `Requested by ${message.author.tag}`,
                  iconURL: `${client.user.displayAvatarURL()}`,
                })
                .setTitle(':x: Wrong Command Usage!')
                .setDescription(
                  command.argsmissing_message &&
                    command.argsmissing_message.trim().length > 0
                    ? command.argsmissing_message
                    : command.usage
                    ? 'Usage: ' + command.usage
                    : 'Wrong Command Usage',
                ),
            ],
          })
          .then((msg) => {
            setTimeout(() => {
              msg.delete().catch((e) => {
                console.log(String(e))
              })
            }, settings.timeout.minplusargs)
          })
          .catch((e) => {
            console.log(String(e))
          })
      }
      //if command has maximum args (splitted with "++"), and user enters too many, return error
      if (
        command.maxplusargs &&
        command.maxplusargs > 0 &&
        args.join(' ').split('++').filter(Boolean).length > command.maxplusargs
      ) {
        return message
          .reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor('#e01e01')
                .setFooter({
                  text: `Requested by ${message.author.tag}`,
                  iconURL: `${client.user.displayAvatarURL()}`,
                })
                .setTitle(':x: Wrong Command Usage!')
                .setDescription(
                  command.argstoomany_message &&
                    command.argstoomany_message.trim().length > 0
                    ? command.argsmissing_message
                    : command.usage
                    ? 'Usage: ' + command.usage
                    : 'Wrong Command Usage',
                ),
            ],
          })
          .then((msg) => {
            setTimeout(() => {
              msg.delete().catch((e) => {
                console.log(String(e))
              })
            }, settings.timeout.maxplusargs)
          })
          .catch((e) => {
            console.log(String(e))
          })
      }
      //run the command with the parameters:  client, message, args, Cmduser, text, prefix,
      command.run(
        client,
        message,
        args,
        args.join(' ').split('++').filter(Boolean),
        message.member,
        args.join(' '),
        prefix,
      )
      // send the log to event log channel
      if (process.env.EVENT_LOG_CHANNEL) {
        const eventlogembed = new Discord.MessageEmbed()
          .setColor('#22bb33')
          .setFooter({
            text: `Requested by ${message.author.tag}`,
            iconURL: `${client.user.displayAvatarURL()}`,
          })
          .setTitle(':white_check_mark: Command Executed!')
          .addFields(
            {
              name: 'Command',
              value: `\`${prefix + command.name + ' ' + args.join(' ')}\``,
              inline: true,
            },
            {
              name: 'User',
              value: `\`${message.author.tag}\``,
              inline: true,
            },
            {
              name: 'Channel',
              value: `\`#${message.channel.name}\``,
              inline: false,
            },
            {
              name: 'Guild',
              value: `\`${message.guild.name}\``,
              inline: true,
            },
          )
          .setTimestamp()
        try {
          client.channels.cache
            .get(process.env.EVENT_LOG_CHANNEL)
            .send({ embeds: [eventlogembed] })
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      if (settings.somethingwentwrong_cmd) {
        return message
          .reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor('#e01e01')
                .setFooter({
                  text: `Requested by ${message.author.tag}`,
                  iconURL: `${client.user.displayAvatarURL()}`,
                })
                .setTitle(
                  replacemsg(settings.messages.somethingwentwrong_cmd.title, {
                    prefix: prefix,
                    command: command,
                  }),
                )
                .setDescription(
                  replacemsg(
                    settings.messages.somethingwentwrong_cmd.description,
                    {
                      error: error,
                      prefix: prefix,
                      command: command,
                    },
                  ),
                ),
            ],
          })
          .then((msg) => {
            setTimeout(() => {
              msg.delete().catch((e) => {
                console.log(String(e))
              })
            }, 4000)
          })
          .catch((e) => {
            console.log(String(e))
          })
      }
    }
  } //if the command is not found send an info msg
  else
    return message
      .reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor('#e01e01')
            .setFooter({
              text: `Requested by ${message.author.tag}`,
              iconURL: `${client.user.displayAvatarURL()}`,
            })
            .setTitle(
              replacemsg(settings.messages.unknown_cmd, {
                prefix: prefix,
              }),
            ),
        ],
      })
      .then((msg) => {
        setTimeout(() => {
          msg.delete().catch((e) => {
            console.log(String(e))
          })
        }, 4000)
      })
      .catch((e) => {
        console.log(String(e))
      })
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`)
}
