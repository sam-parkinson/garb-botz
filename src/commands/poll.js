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

    if (n > 26) {
      return msg.reply(`Poll currently does not support more than twenty-six options.`);
    }

    // maybe add some restriction on how long the poll runs?

    const filter = response => response.content

    let question = await prompter(msg, filter, 1, true);
    let options = await prompter(msg, filter, n);

    makePoll(msg, question, options, runtime);

    /* return msg.channel.send( 
      ':joy:: word\n' +
      `Question: ${question[0]}\n` + 
      `Options: ${options.join(' ')}\n` +
      `Runtime in hours: ${runtime}`
    ); */
  }
}

const prompter = async (msg, filter, n, question = false) => {
  const prompt = question ? `Please provide the poll question` : `Please provide ${n} options`;
  const arr = [];
  return msg.author.send(prompt)
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
    return arr;
  }).catch(err => 
    console.error(`An error occured: ${err}`)
  );
}

const makePoll = (msg, question, options, runtime) => {
  const data = [];

  data.push('**NEW POLL**');
  data.push(question[0]);

  for (let i = 0; i < options.length; i++) {
    // this works!
    const ltr = String.fromCodePoint(0x1F1E6 + i);
    data.push(`\n ${ltr}: ${options[i]}`);
  }

  data.push(`\nThis poll will run for ${runtime} hours.`);
  data.push('\nReact to this message with your answer!');

  return msg.channel.send(data, { split: true });
}


// build message object based on poll options and question
// set timeout object for hours 
// after hours closes, count responses on original message
// post results as percentages 