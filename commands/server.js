const Discord = require('discord.js');
const timeTurn = 30000;

module.exports = {
	name: 'server',
	description: 'Let u know your server',
	execute(msg, args) {
		msg.channel.send("Type See or Change");
		const collector = new Discord.MessageCollector(msg.channel, m => m.author.id == msg.author.id, { max : 1, time: timeTurn });
		console.log(collector);
        collector.on('collect', message => {
            if (message.content == "See") {
                message.channel.send("You Want To See Your Server OK!");
            } else if (message.content == "Change") {
                message.channel.send("You Want To Change Your Server OK!");
            }
        })
	},
};