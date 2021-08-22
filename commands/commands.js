const Discord = require('discord.js');

module.exports = {
	name: 'commands',
    abbrev: 'c',
	description: 'Commands you can use at this bot',
	execute(msg, args) {
		const embd = new Discord.MessageEmbed().setColor('#fc77be');
		embd
		.setTitle(`Shi-Bot Command Helper`)
		.setDescription(`**Use the following command with '~' prefix to get what you wish**\n1. hujat (hj)==> Mock another people in your server as much as you can (ex. ~hujat <tag your enemy> <tag your stupid friend> ...)\n2. bitframe (bf) ==> Search frame on karuta based on bits, second bits is optional (ex. ~bf <bits1> <bits2>)\n3. shiritori (st) ==> Play shiritori game with your friend`)

		msg.channel.send(embd);
	},
};