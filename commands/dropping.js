const Discord = require('discord.js');

module.exports = {
	name: 'dropping',
    abbrev: 'dp',
	description: 'Pinging when someone drop!, use ~dp all, ~dp bot, or ~dp remove',
	execute(msg, args) {
        if(args.length < 1) return msg.reply(this.description); 
        let str = "";

        if (args[0].toLowerCase() == "bot") {
            let checkerAll = false;
            let checkerBot = false;
            msg.karutaMaster["ping"]["all"].forEach(element => {
                if (element == msg.author.id) {
                    checkerAll = true;
                }                  
            });

            msg.karutaMaster["ping"]["bot"].forEach(element => {
                if (element == msg.author.id) {
                    checkerBot = true;
                }                  
            });

            if (checkerBot) {
                msg.reply('**You already on the list to be pinged when bot is dropping**');
                return;
            }else if (checkerAll) {
                msg.reply('**You already on the list to be pinged when someone is dropping, to change to bot only drop, remove it first using ~dp remove**');
                return;
            }else{
                msg.karutaMaster["ping"]["bot"] = msg.author.id;
                str = `<@${msg.author.id}>**, will be pinged when karuta bot is dropping!**`;
            }
        }else if (args[0].toLowerCase() == "all") {
            let checkerAll = false;
            let checkerBot = false;
            msg.karutaMaster["ping"]["all"].forEach(element => {
                if (element == msg.author.id) {
                    checkerAll = true;
                }                  
            });

            msg.karutaMaster["ping"]["bot"].forEach(element => {
                if (element == msg.author.id) {
                    checkerBot = true;
                }                  
            });

            if (checkerAll) {
                msg.reply('**You already on the list to be pinged when someone is dropping**');
                return;
            }else if (checkerBot) {
                msg.reply('**You already on the list to be pinged when karuta bot is dropping, to change to all kind of drop, remove it first using ~dp remove**');
                return;
            }else{
                msg.karutaMaster["ping"]["all"] = msg.author.id;
                str = `<@${msg.author.id}>**, will be pinged when someone is dropping!**`;
            }
        }else if (args[0].toLowerCase() == "remove") {
            msg.karutaMaster["ping"]["all"].forEach((element,key) => {
                if (element == msg.author.id) {
                    msg.karutaMaster["ping"]["all"].splice(key, 1);
                    msg.reply(`**you have been removed from the list**`);
                    return;
                }                  
            });

            msg.karutaMaster["ping"]["bot"].forEach((element,key) => {
                if (element == msg.author.id) {
                    msg.karutaMaster["ping"]["bot"].splice(key, 1);
                    msg.reply(`**you have been removed from the list**`);
                    return;
                }                  
            });
        }
		msg.channel.send(str);
	},
};