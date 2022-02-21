const config = require("../../botconfig/config.json");
const { change_status } = require("../../handlers/functions");
module.exports = (client) => {
  try {
    try {
      console.log(
        `\n${client.user.tag} is ready to serve in ${client.guilds.cache.size} servers.\n`
      );
    } catch {
      /* */
    }
    change_status(client);
    setInterval(() => {
      change_status(client);
    }, 15 * 1000);
  } catch (e) {
    console.log(String(e.stack));
  }
};
