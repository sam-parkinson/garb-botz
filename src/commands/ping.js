module.exports = {
	name: 'ping',
	cooldown: 5,
	description: 'Ping!',
	usage: '[command name]',
	execute(msg, args) {
		msg.channel.send('Pong.');
	},
};