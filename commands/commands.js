module.exports = {
	name: 'commands',
	description: 'HELP!',
	execute(msg, args) {
		msg.channel.send("Use command with ~ as prefix");
		msg.channel.send("~hujat ==> Hujat another people in your server as much as you can (ex. ~hujat <tag your enemy> <tag your stupid friend> ...");
	},
};