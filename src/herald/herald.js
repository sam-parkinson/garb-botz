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
        guice(msg);
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

function henderson(msg) {
  msg.channel.send('Darrell Henderson is the starting running back for the LA Rams');
}

function gurley(msg) {
  msg.channel.send(`Todd Gurley's arthritis is so bad, even I wince when I see him run, and as a robot I am not programmed to have feelings.`);
}

function treadwell(msg) {
  msg.channel.send(`The jersey is two different shades of purple.`);
}

function agholor(msg) {
  msg.channel.send('And his mishaps...');
}

function guice(msg) {
  msg.channel.send(`Derrius Guice is expected to miss ${weeks()} weeks with an injury to his ${bodypart()}.`)
}

function weeks() {
  return Math.floor(Math.random() * 12) + 2;
}

function bodypart() {
  const bodyArr = ['oblique', 'groin', 'chest', 'knee', 'leg', 'arm', 'shoulder', 'back', 'foot', 'ankle'];

  return bodyArr[Math.floor(Math.random() * bodyArr.length)];
}

module.exports = herald;