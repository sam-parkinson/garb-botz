module.exports = {
  name: 'about',
  description: 'Learn more about GarbBotz and its creator.',
  aliases: ['creator', 'source'],
  usage: '[command name]',
  cooldown: 5,
  execute(msg, args) {
    const data = [];

    data.push('GarbBotz is build and maintained by Sam Parkinson');
    data.push('The repo for GarbBotz can be found at: https://github.com/sam-parkinson/garb-botz');
    data.push('Sam is currently looking for new opportunities!');
    data.push('Check out his portfolio: https://sam-parkinson.github.io/portfolio/');

    return msg.channel.send(data, { split: true })
      .catch(err => {
        console.error(`An error occured: ${err}`);
      });
  }
}