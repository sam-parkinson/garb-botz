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

    if (n > 10) {
      return msg.reply(`Poll currently does not support more than ten options.`);
    }

    let question = await prompter(msg, 1, true);
    let options = await prompter(msg, n);
    let poll = await makePoll(msg, question[0], options, runtime);
    const results = makeResults(poll);
    printResults(msg, question[0], results);    
  }
}

const prompter = async (msg, n, question = false) => {
  const filter = response => response.content && !response.author.bot;
  const prompt = question ? `Please provide the poll question` : `Please provide ${n} options`;
  const arr = [];
  return msg.author.send(prompt)
  .then((reply) => {
    return reply.channel.awaitMessages(filter, {
      max: n,
      time: 300000,
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

const makePoll = async (msg, question, options, runtime) => {
  const filter = (reaction, user) => reaction.emoji.name && !user.bot;
  const data = [];
  const poll = {};
  const emojis = [];

  data.push('**NEW POLL**');
  data.push(question);

  for (let i = 0; i < options.length; i++) {
    const ltr = String.fromCodePoint(0x1F1E6 + i);
    poll[ltr] = {option: options[i], count: 0};
    emojis.push(ltr);
    data.push(`\n ${ltr}: ${options[i]}`);
  }

  data.push(`\nThis poll will run for ${runtime} hour(s).`);
  data.push('\nReact to this message with your answer!');

  return msg.channel.send(data, { split: true })
    .then(async (pollMsg) => {
      for (const emoji of emojis) {
        await pollMsg.react(emoji);
      }
      return pollMsg.awaitReactions(filter, {
        // replace this with actual runtime
        time: runtime * 60 * 60 * 1000,
      });
    }).then((collected) => {
      for (const [emoji, value] of collected) {
        emojis.includes(emoji) ? poll[emoji].count += (value.count - 1) : null;       
      }
      return poll;
    }).catch(err => 
      console.error(`An error occured: ${err}`)
    );
}

const makeResults = poll => {
  return Object.keys(poll).map((key) => {
    return {
      emoji: key,
      ...poll[key]
    }
  }).sort((a, b) => b.count - a.count)
  .catch(err => console.error(`An error occured: ${err}`));
}

const printResults = (msg, question, results) => {
  const data = [];
  data.push('**POLL RESULTS**');
  data.push(`\nQuestion: ${question}`);
  data.push('Results:');
  for (const result of results) {
    data.push(`${result.count} votes for ${result.option}`);
  }
  data.push('\nThank you for participating!');

  return msg.channel.send(data, { split: true })
    .catch(err => console.error(`An error occured: ${err}`));
}

// TODO: refactor so this is easier to read, separate out functions a bit more