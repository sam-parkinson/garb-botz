require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { DISCORD_TOKEN, prefix } = require('./config');
const herald = require('./herald/herald');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

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
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
      return msg.channel.send(`Please provide arguments, ${msg.author}.`);
    }

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(msg.author.id)) {
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    try {
      command.execute(msg, args);
    } catch (err) {
      console.error(err);
      msg.reply('There was an error trying to execute that command')
    }
  } else { 
    herald(msg);
  }
});

client.login(DISCORD_TOKEN)