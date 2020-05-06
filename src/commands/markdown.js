module.exports = {
  name: 'markdown',
  description: 'Links to basic Markdown tutorials',
  aliases: ['md', 'formatting'],
  usage: '[command name]',
  cooldown: 5,
  execute(msg, args) {
    const data = [];

    data.push('Format your messages in Markdown!')
    data.push('Basic guide: https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-');
    data.push('Advanced guide: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet');
    data.push('Not all features in the advanced guide are supported in Discord.');

    return msg.channel.send(data, { split: true })
      .catch(err => {
        console.error(`An error occured: ${err}`);
      });
  }
}