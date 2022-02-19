module.exports = {
  name: "emojify",
  category: "Fun",
  aliases: [],
  cooldown: "",
  usage: "emojify <text>",
  description: "Convert your text to emojis",
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 1,
  maxargs: 0,
  minplusargs: 1,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, prefix) => {
    const specialCodes = {
      0: ":zero:",
      1: ":one:",
      2: ":two:",
      3: ":three:",
      4: ":four:",
      5: ":five:",
      6: ":six:",
      7: ":seven:",
      8: ":eight:",
      9: ":nine:",
      "#": ":hash:",
      "*": ":asterisk:",
      "?": ":grey_question:",
      "!": ":grey_exclamation:",
      ".": ":white_small_square:",
      ",": "<:comma:935046155203649557>",
      " ": "   ",
    };
    const text = args
      .join(" ")
      .toLowerCase()
      .split("")
      .map((letter) => {
        if (/[a-z]/g.test(letter)) {
          return `:regional_indicator_${letter}:`;
        } else if (specialCodes[letter]) {
          return `${specialCodes[letter]}`;
        }
        return letter;
      })
      .join("");
    message.channel.send(text).catch((err) => {
      message.reply(`Oops! An Error Occured!\n\`\`\`js\n${err}\n\`\`\`\``);
    });
  },
};
