function herald(msg) {
  ping(msg);
  pong(msg);
  breakdown(msg);
}

function breakdown(msg) {
  const words = splitter(msg);
  for (let i = 0; i < words.length; i++) {
    switch (words[i]) {
      case 'gurley':
        gurley(msg);
        return;
      case 'henderson':
        henderson(msg);
        return;
      case 'treadwell':
        treadwell(msg);
        return;
      case 'agholor':
        agholor(msg);
        return;
      case 'guice':
        injuryProne(msg, 'Derrius Guice');
        return;
      case 'engram':
        injuryProne(msg, 'Evan Engram');
        return;
      case 'louisville':
      case 'uofl':
        louisville(msg);
        return;
      // case 'wentz': 
      case 'baker': 
      case 'mayfield':
      case 'njoku':
        trash(msg);
        return;
      case 'jameis':
      case 'winston':
        crab(msg);
        return;
      case 'embiid':
      case 'embid':
        doA180(msg);
        return;
    }
  }
}

function splitter(msg) {
  return msg.content.toLowerCase().split(' ');
}

function ping(msg) {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
}

function pong(msg) {
  if (msg.content === 'pong') {
    msg.reply('ping');
  }
}

const henderson = msg => (
    msg.channel.send('Darrell Henderson is the starting running back for the LA Rams')
  );

const gurley = (msg) => (
    msg.channel.send(`Todd Gurley's arthritis is so bad, even I wince when I see him run, and as a robot I am not programmed to have feelings.`)
  );

const treadwell = msg => (
    msg.channel.send(`The jersey is two different shades of purple.`)
  );

const agholor = async msg => {
  const emoji = (msg.guild.emojis.find(em => em.name === 'unlikeagholor') || '🗑️');
  try {
    await msg.react(emoji);
  } catch (err) {
    console.error(`The message failed to react`)
  }
};

const louisville = msg => (
  msg.channel.send(`Louisville sucks! Go ${lvilleRival()}!`)
)

const trash = async msg => {
  const emoji = '🗑️';
  try {
    await msg.react(emoji);
  } catch (err) {
    console.error(`The message failed to react`)
  }
};

const crab = async msg => {
  const emoji = '🦀';
  try {
    await msg.react(emoji);
  } catch (err) {
    console.error(`The message failed to react`)
  }
}

const doA180 = async msg => {
  const one = '1️⃣';
  const eight = '8️⃣';
  const zero = '0️⃣';
  try {
    await msg.react(one);
    await msg.react(eight);
    await msg.react(zero);
  } catch (err) {
    console.error(`The message failed to react`);
  }
}

const injuryProne = (msg, name) => (
    msg.channel.send(`${name} is expected to miss ${weeks()} weeks with an injury to his ${bodypart()}.`)
);

const weeks = () => Math.floor(Math.random() * 12) + 2;

const bodypart = () => {
  const bodyArr = ['oblique', 'groin', 'chest', 'knee', 'leg', 'arm', 'shoulder', 'back', 'foot', 'ankle', 'wrist'];

  return bodyArr[Math.floor(Math.random() * bodyArr.length)];
}

const lvilleRival = () => {
  const rivArr = ['Kentucky', 'Cincinnati', 'Memphis'];

  return rivArr[Math.floor(Math.random() * rivArr.length)]
}

module.exports = herald;