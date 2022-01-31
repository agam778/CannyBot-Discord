module.exports = {
  name: "embed",
  category: "Fun",
  aliases: [],
  cooldown: "",
  usage: "",
  description: "Resends your Text in an embed",
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 1,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    message.reply("Please use slash command for this command - `/embed`");
  },
};
