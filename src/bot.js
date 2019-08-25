require('dotenv').config();
const Discord = require('discord.js');
const { DISCORD_TOKEN } = require('./config');
const { ping, pong, henderson } = require('./herald/herald');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
  if (msg.author === client.user) {
    return;
  }
  ping(msg);
  pong(msg);
  henderson(msg);
});

client.login(DISCORD_TOKEN)