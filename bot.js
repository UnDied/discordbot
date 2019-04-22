const Discord = require('discord.js');
const client = new Discord.Client();
let token = "NTY4NDk5OTA3MzY4MDU4ODgx.XL340Q.O2jXIoDF6oGm9a5sPOJt3Gl5VWw";
client.login(token);

client.on('message', msg => {
  if(msg.content.startsWith("!ping")) {
    msg.reply("Pong!");
  }
});
