//here the event starts
const config = require("../../botconfig/config.json")
const { change_status } = require("../../handlers/functions");
module.exports = client => {
  //SETTING ALL GUILD DATA FOR THE DJ ONLY COMMANDS for the DEFAULT
  //client.guilds.cache.forEach(guild=>client.settings.set(guild.id, ["autoplay", "clearqueue", "forward", "loop", "jump", "loopqueue", "loopsong", "move", "pause", "resume", "removetrack", "removedupe", "restart", "rewind", "seek", "shuffle", "skip", "stop", "volume"], "djonlycmds"))
  try{
    try{
      console.log(`\n${client.user.tag} is ready to serve in ${client.guilds.cache.size} servers.\n`)
    }catch{ /* */ }
    change_status(client);
    //loop through the status per each 10 minutes
    setInterval(()=>{
      change_status(client);
    }, 15 * 1000);

  } catch (e){
    console.log(String(e.stack))
  }
}

