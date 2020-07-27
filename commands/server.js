module.exports = {
	name: 'server',
	description: 'Let u know your server',
	execute(msg, args) {
		msg.channel.send("Use command with ~ as prefix");
		msg.channel.send("~hujat ==> Hujat another people in your server as much as you can (ex. ~hujat <tag your enemy> <tag your stupid friend> ...");
		msg.channel.send("");
	},
};