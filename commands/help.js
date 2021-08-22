const { loadMagazine } = require("jikanjs");

module.exports = {
	name: 'help',
    abbrev: 'h',
	description: 'HELP!',
	execute(msg, args) {
		msg.channel.send("Hi, I'm here to help");
		msg.channel.send("Type ~commands for full list of commands");
		
	},
};