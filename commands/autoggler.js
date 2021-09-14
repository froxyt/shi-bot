const Discord = require('discord.js');
const mongo = require('../mongo');
const notifModel = require('../db/notifSchema');

module.exports = {
	name: 'autoggler',
  	abbrev: 'gg',
	description: 'Toggle on or off karuta talk auto helper (Auto save question when talk is success and Auto look for answer of the question)',
	async execute(msg, args) {
        try {
            const mongoose = await mongo();

            let findId = await notifModel.findById(msg.author.id);
           
            if (findId == null) {
                console.log('masuk 0');
                let create = await notifModel.create({
                    _id: msg.author.id,
                    isAuto: true,
                    contribution: [],
                    pingDrop: [{bot: false, all:false}]
                });

                create.save();

                msg.channel.send(`**Karuta talking auto helper is turned on for you,** ${msg.author}`);
            }else{
                if (findId.isAuto) {
                    await notifModel.findByIdAndUpdate(msg.author.id, {
                        isAuto: false
                    });
                    mongoose.connection.close();
                    msg.channel.send(`**Karuta talking auto helper is turned off for you,** ${msg.author}`);
                }else{
                    await notifModel.findByIdAndUpdate(msg.author.id, {
                        isAuto: true
                    });
                    mongoose.connection.close();
                    msg.channel.send(`**Karuta talking auto helper is turned on for you,** ${msg.author}`);
                }
            }
        } catch (error) {
        }
    }
}