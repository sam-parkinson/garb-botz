const { prefix } = require('../config');

module.exports = {
  name: 'poll',
  description: 'Run a poll of chat users.',
  aliases: ['survey'],
  usage: '[number of options] [runtime in hours]',
  cooldown: 10,
  async execute(msg, args) {
    if (!args.length) {
      return msg.reply(`please provide the number of options and the time in hours for which the poll will run`);
    }

    const n = args[0];
    const runtime = args[1];
  
    const filter = response => response.content

    let options = await responder(msg, filter, n);
    console.log('Second: ' + options);

    // const options = Promise.resolve(responder(msg, filter, n));

    // console.log('Second: '+ options);

    // return msg.channel.send(`Options: ${options}, runtime in hours: ${runtime}`);
  }
}

const responder = async (msg, filter, n) => {
  const arr = [];
  return msg.author.send(`Please provide ${n} options`)
  .then((reply) => {
    return reply.channel.awaitMessages(filter, {
      max: n,
      time: 30000,
      errors: ['time'],
    })
  }).then((collected) => {
    for (const value of collected.values()) {
      arr.push(value.content);
    }
    console.log('First: '+ arr);
    return arr;
  }).catch(err => 
    console.error(`An error occured: ${err}`)
  );
}

// how will this work?
// DM user for question, then...
// for each option, DM user who requested the poll, await response
// after for loop closes, post poll in original channel
// set timeout object for hours 
// after hours closes, count responses on original message
// post results as percentages 