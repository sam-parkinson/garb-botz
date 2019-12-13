require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { DISCORD_TOKEN, prefix } = require('./config');
const herald = require('./herald/herald');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// TODO: Add logic to make robot respond to it being pinged

// robot should only add snarky responses to message to which it's not being pinged

client.on('message', msg => {
  if (msg.author.bot) {
    return;
  } else if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
      cilent.commands.get(command).execute(message, args);
    } catch (err) {
      console.error(err);
      message.reply('There was an error trying to execute that command')
    }
  } else { 
    herald(msg);
  }
});

client.login(DISCORD_TOKEN)