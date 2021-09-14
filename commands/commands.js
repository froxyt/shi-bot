const Discord = require('discord.js');

module.exports = {
	name: 'commands',
    abbrev: 'c',
	description: 'Commands you can use at this bot',
	execute(msg, args) {
		const embd = new Discord.MessageEmbed().setColor('#fc77be');
		let desc = `Prefix is \`~\`, below is available command to use.\n\n1. \`hujat\` or \`hj\` => ${args.get('hj').description}\n2. \`bitframe\` or \`bf\` => ${args.get('bf').description}\n3. \`autoggler\` or \`gg\` => ${args.get('gg').description}`

		embd
		.setTitle(`Shi-Bot Commands`)
		.setDescription(desc);

		msg.channel.send(embd);
	},
};