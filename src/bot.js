require('dotenv').config();
const Discord = require('discord.js');
const { DISCORD_TOKEN, prefix } = require('./config');
const commands = require('./commands/commands');
const herald = require('./herald/herald');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// TODO: Add logic to make robot respond to it being pinged

// robot should only add snarky responses to message to which it's not being pinged

client.on('message', msg => {
  if (msg.author.bot) {
    return;
  } else if (msg.content.startsWith(prefix)) {
    commands(msg);
  } else { 
    herald(msg);
  }
});

client.login(DISCORD_TOKEN)