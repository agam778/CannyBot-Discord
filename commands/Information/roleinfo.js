const { MessageEmbed } = require("discord.js");
var ee = require("../../botconfig/embed.json");
const moment = require("moment");
const { GetRole } = require("../../handlers/functions");
module.exports = {
  name: "roleinfo",
  category: "Information",
  aliases: ["rinfo"],
  cooldown: "",
  usage: "roleinfo <@ROLE>",
  description: "Shows Information about a role",
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
    try {
      var role;
      if (args[0]) {
        try {
          role = await GetRole(message, args);
        } catch (e) {
          if (!e) return message.reply("UNABLE TO FIND THE ROLE");
          return message.reply(e);
        }
      } else {
        return message.reply("❌ Please retry but add a Role/Rolename/Roleid");
      }
      if (!role || role == null || role.id == null || !role.id)
        message.reply("❌ Could not find the ROLE");
      //create the EMBED
      const embeduserinfo = new MessageEmbed();
      embeduserinfo.setThumbnail(
        message.guild.iconURL({ dynamic: true, size: 512 })
      );
      embeduserinfo.setAuthor({
        name: "Information about:   " + role.name,
        iconURL: message.guild.iconURL({ dynamic: true }),
      });
      embeduserinfo.addField("**❱ Name:**", `\`${role.name}\``, true);
      embeduserinfo.addField("**❱ ID:**", `\`${role.id}\``, true);
      embeduserinfo.addField("**❱ Color:**", `\`${role.hexColor}\``, true);
      embeduserinfo.addField(
        "**・ Date Created:**",
        "`" +
          moment(role.createdAt).format("DD/MM/YYYY") +
          "`\n" +
          "`" +
          moment(role.createdAt).format("hh:mm:ss") +
          "`",
        true
      );
      embeduserinfo.addField(
        "**・ Position:**",
        `\`${role.rawPosition}\``,
        true
      );
      embeduserinfo.addField(
        "**・ MemberCount:**",
        `\`${role.members.size} Members have it\``,
        true
      );
      embeduserinfo.addField(
        "**・ Hoisted:**",
        `\`${role.hoist ? "✔️" : "❌"}\``,
        true
      );
      embeduserinfo.addField(
        "**・ Mentionable:**",
        `\`${role.mentionable ? "✔️" : "❌"}\``,
        true
      );
      embeduserinfo.addField(
        "**・ Permissions:**",
        `${role.permissions
          .toArray()
          .map((p) => `\`${p}\``)
          .join(", ")}`
      );
      embeduserinfo.setColor(role.hexColor);
      embeduserinfo.setFooter({ text: ee.footertext, iconURL: ee.footericon });
      //send the EMBED
      message.reply({ embeds: [embeduserinfo] });
    } catch (e) {
      console.log(String(e.stack));
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(
              `\`\`\`${
                e.message
                  ? String(e.message).substr(0, 2000)
                  : String(e).substr(0, 2000)
              }\`\`\``
            ),
        ],
      });
    }
  },
};
