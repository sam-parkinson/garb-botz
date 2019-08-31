function herald(msg) {
  ping(msg);
  pong(msg);
  breakdown(msg);
}

function breakdown(msg) {
  const words = splitter(msg);
  for (let i = 0; i < words.length; i++) {
    if (words[i] === 'gurley') {
      gurley(msg);
    } else if (words[i] === 'henderson') {
      henderson(msg);
    } else if (words[i] === 'treadwell') {
      treadwell(msg);
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
  msg.channel.send('Darrell Henderson is the starting running back for the LA Rams')
}

function gurley(msg) {
  msg.channel.send(`Todd Gurley's arthritis is so bad, even I wince when I see him run, and as a robot I am not programmed to have feelings.`)
}

function treadwell(msg) {
  msg.channel.send(`The jersey is two different shades of purple.`)
}

module.exports = herald;