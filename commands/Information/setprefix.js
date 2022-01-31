const prefixModel = require("../../models/prefix");
module.exports = {
  name: "setprefix",
  category: "Information",
  aliases: [],
  cooldown: 3,
  usage: "setprefix <new-prefix>",
  description: "Set a custom prefix for your server",
  memberpermissions: ["ADMINISTRATOR"], 
  requiredroles: [],
  alloweduserids: [],
  minargs: 1,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    const data = await prefixModel.findOne({
      GuildID: message.guild.id,
    });
    if (!args[0])
      return message.channel.send("You must provide a **new prefix**!");
    if (args[0].length > 5)
      return message.channel.send(
        "Your new prefix must be under `5` characters!"
      );
    if (data) {
      await prefixModel.findOneAndRemove({
        GuildID: message.guild.id,
      });

      message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

      let newData = new prefixModel({
        Prefix: args[0],
        GuildID: message.guild.id,
      });
      newData.save();
    } else if (!data) {
      message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

      let newData = new prefixModel({
        Prefix: args[0],
        GuildID: message.guild.id,
      });
      newData.save();
    }
  },
};
