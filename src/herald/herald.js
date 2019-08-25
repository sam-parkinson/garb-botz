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
  if (msg.content.toLowerCase() === 'henderson') {
    msg.channel.send('Darrell Henderson is the starting running back for the LA Rams')
  }
}

module.exports = {
  ping,
  pong,
  henderson
}