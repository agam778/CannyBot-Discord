const axios = require("axios");
const acceptedcodes = [
  "100",
  "101",
  "102",
  "200",
  "201",
  "202",
  "203",
  "204",
  "206",
  "207",
  "300",
  "301",
  "302",
  "303",
  "304",
  "305",
  "307",
  "308",
  "400",
  "401",
  "402",
  "403",
  "404",
  "405",
  "406",
  "407",
  "408",
  "409",
  "410",
  "411",
  "412",
  "413",
  "414",
  "415",
  "416",
  "417",
  "418",
  "420",
  "421",
  "422",
  "423",
  "424",
  "425",
  "426",
  "429",
  "431",
  "444",
  "450",
  "451",
  "497",
  "498",
  "499",
  "500",
  "501",
  "502",
  "503",
  "504",
  "506",
  "507",
  "508",
  "509",
  "510",
  "511",
  "521",
  "523",
  "525",
  "599",
];

module.exports = {
  name: "httpcat",
  category: "Fun",
  aliases: [],
  cooldown: "",
  usage: "httpcat <status_code>",
  description: "Send httpcat link of given status code",
  memberpermissions: [],
  requiredroles: [],
  alloweduserids: [],
  minargs: 0,
  maxargs: 0,
  minplusargs: 0,
  maxplusargs: 0,
  argsmissing_message: "",
  argstoomany_message: "",
  run: async (client, message, args, plusArgs, cmdUser, text) => {
    let userinput = args.join(" ");
    if (!userinput) {
      return message.reply(
        `No status code specified!\nAvailable codes: \`\`\`${acceptedcodes.join(
          `, `
        )}\`\`\``
      );
    }
    if (!acceptedcodes.includes(userinput.split(" ")[0])) {
      message.reply("Invalid staus code!");
      return;
    }
    message.reply(`https://http.cat/${userinput ? userinput : "200"}.jpg`);
  },
};
