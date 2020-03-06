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

    const optionNumb = args[0];
    const runtime = args[1];

    // add logic to get question from user

    // array stores responses from DMs, I think
    const options = [];

    for (let i = 0; i < optionNumb; i++) {
      msg.author.send(`Option ${i + 1}: (option)`)
        .then(options.push(response()))
      // add logic to get responses from DMs, push to options array

      // should use collection logic
    }

    return msg.channel.send(`Options: ${options}, runtime in hours: ${runtime}`);
  }
}

const response = () => {
  return 'option'
  // this is the function that gets a response from the user
  // send message to user, collect response, return response text as string
}
// how will this work?
// DM user for question, then...
// for each option, DM user who requested the poll, await response
// after for loop closes, post poll in original channel
// set timeout object for hours 
// after hours closes, count responses on original message
// post results as percentages 