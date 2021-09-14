const Discord = require('discord.js');
const mongo = require('../mongo');
const notifModel = require('../db/notifSchema');

module.exports = {
	name: 'autoggler',
  	abbrev: 'gg',
	description: 'Toggle on or off karuta talk auto helper',
	async execute(msg, args) {
        try {
            const mongoose = await mongo();

            console.log(mongoose.connection);

            let findId = await notifModel.findById(msg.author.id);
            console.log('hasil find');
            console.log(findId);

            if (findId == null) {
                console.log('masuk 0');
                let create = await notifModel.create({
                    _id: msg.author.id,
                    isAuto: true,
                    contribution: [],
                    pingDrop: [{bot: false, all:false}]
                });
                console.log('habis create  connection');
                console.log(mongoose.connection);

                create.save();
                console.log('habis save');

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