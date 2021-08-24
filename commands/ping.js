const Discord = require('discord.js');

module.exports = {
	name: 'ping',
    abbrev: 'p',
	description: 'Dont look for this command!',
	execute(msg) {
        let str = "";
        if (msg.content.includes("I'm")) {
            msg.karutaMaster["ping"]["bot"].forEach(element => {
                str += `<@${element}> `;                  
            });
            str += `**karuta bot is dropping!**`
        }else if (msg.content.includes("<@")) {
            msg.karutaMaster["ping"]["all"].forEach(element => {
                str += `<@${element}> `;                  
            });
            str += `**someone is dropping!**`
        }else{
            return;
        }
		msg.channel.send(str);
	},
};