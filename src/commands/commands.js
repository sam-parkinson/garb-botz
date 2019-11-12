require('dotenv').config();
const { prefix } = require('../config');

function commands(msg) {
  const { args, command } = isolate(msg)
  console.log(`Command: ${command}\nArguments: ${args}`); 
}

function isolate(msg) {
  const args = msg.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();  
  return { args, command };
}

module.exports = commands;