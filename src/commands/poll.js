const { prefix } = require('../config');

module.exports = {
  name: 'poll',
  description: 'Run a poll of chat users.',
  aliases: ['survey'],
  usage: '[number of options] [runtime in hours]',
  cooldown: 10,
  execute(msg, args) {
    if (!args.length) {
      return msg.reply(`please provide the number of options and the time in hours for which the poll will run`);
    }
    return msg.channel.send(`Poll function is still under construction`)
  }
}

// how will this work?
// DM user for question, then...
// for each option, DM user who requested the poll, await response
// after for loop closes, post poll in original channel
// set timeout object for hours 
// after hours closes, count responses on original message
// post results as percentages 