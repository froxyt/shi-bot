const Discord = require('discord.js');
const mongo = require('../mongo');
const charactersModel = require('../db/charactersSchema');

module.exports = {
	name: 'autosavetalk',
  	abbrev: 'at',
	description: 'Auto saving talk data when successfully talking to a character',
	async execute(oMsg, nMsg) {
        try {
            const mongoose = await mongo();

            const quotedRegex = /“([^“”]*)”/;
            const a1Regex = /\u0031\ufe0f?\u20E3([^\u0034\ufe0f?\u20E3\n\\]*)/;
            const a2Regex = /\u0032\ufe0f?\u20E3([^\u0034\ufe0f?\u20E3\n\\]*)/;
            const a3Regex = /\u0033\ufe0f?\u20E3([^\u0034\ufe0f?\u20E3\n\\]*)/;
            const a4Regex = /\u0034\ufe0f?\u20E3([^\u0034\ufe0f?\u20E3\n\\]*)/;
            const visitorRegex = /<@([^<>]*)>/;
            const charaRegex =  /\*\*([^\*]*)\*\*/;
            const codeRegex = /\(`([^()`]*)`\)/;
            const embd = new Discord.MessageEmbed().setColor('#fc77be');
            embd.setTitle('Character Talking Record');

            let q, a, a1, a2, a3, a4, v, chara, code, series, charaSelect;
            let checkQ = oMsg.embeds[0].description.match(quotedRegex);
            let checkA1 = oMsg.embeds[0].description.match(a1Regex);
            let checkA2 = oMsg.embeds[0].description.match(a2Regex);
            let checkA3 = oMsg.embeds[0].description.match(a3Regex);
            let checkA4 = oMsg.embeds[0].description.match(a4Regex);
            let checkV = nMsg.embeds[0].description.match(visitorRegex);
            let checkChara = nMsg.embeds[0].description.match(charaRegex);
            let checkCode = nMsg.embeds[0].description.match(codeRegex);

            if (checkQ) q = checkQ[1];
            if (checkA1) a1 = checkA1[1];
            if (checkA2) a2 = checkA2[1];
            if (checkA3) a3 = checkA3[1];
            if (checkA4) a4 = checkA4[1];
            if (checkV) v = checkV[1];
            if (checkChara) chara = checkChara[1];
            if (checkCode) code = checkCode[1];

            console.log(v);

            if (v != '422428397445185551' && v != '756402005593030698' && v != '423052885958590465') {
                console.log('bukan admen');
                mongoose.connection.close();
                return;
            }

            let charaFind = await charactersModel.find({
                name: chara
            });

            console.log(charaFind);

            if (nMsg.embeds[0].color == 65280) {
                console.log('masuk color ijo');
                let desc = "";

                if (charaFind.length == 0) {
                    console.log('tambah chara');
                    desc += `**Do you want to add this character for talking purposes to the database?**\n`;
                    
                    embd.setDescription(desc);
                    embd.setFooter('This character not yet recorded on database');

                    let embed = await nMsg.channel.send(embd);
                    
                    let react1 = await embed.react('\u2705');
                    let react2 = await embed.react('\u274C');

                    const filter = (reaction, user) => {
                        return ['\u2705','\u274C'].includes(reaction.emoji.name) && user.id == v;
                    };

                    let collected = await embed.awaitReactions(filter,{ max: 1, time:30000 });

                    let reaction = collected.first();

                    if (reaction.emoji.name == '\u2705') {
                        embd.setColor('#FFFF00');

                        desc = `**What does the series of this character?**\n`;

                        embd.setDescription(desc);
                        embd.setFooter('Try to use the same info written on your card info');
                        embed.reactions.removeAll();
                        embed.edit(embd);

                        let confirm = false;
                        
                        while (!confirm) {
                            const mCollect = await nMsg.channel.awaitMessages(m => m.author.id == v, { max: 1, time: 30000 });

                            nMsg.channel.send(`**Is ${mCollect.first().content} the right series for ${chara}? (Y/N)**`);
        
                            const confirmCollect = await nMsg.channel.awaitMessages(m => m.author.id == v && (m.content.toLowerCase() == 'y' || m.content.toLowerCase() == 'n'), { max: 1, time: 30000 });
                            
                            if (confirmCollect.first().content.toLowerCase() == 'y') {
                                confirm = true;
                                series = mCollect.first().content;
                            }else{
                                nMsg.channel.send(`**Type the right series for ${chara}!**`);
                            }
                        }

                        embd.setColor('#00FF00');
                        embed.edit(embd);

                        let save = await charactersModel.create({
                            name: chara,
                            series: series,
                            code: [code],
                            talk: [],
                            added_by: v,
                            updated_by: v
                        });

                        save.save();

                        charaSelect = {
                            name: chara,
                            series: series,
                            code: [code],
                            talk: [],
                            added_by: v
                        }

                        nMsg.channel.send(`**Character Successfully Added!**`);

                    } else if (reaction.emoji.name == '\u274C') {
                        embd.setColor('#FF0000');
                        desc += `**Character add has been cancelled**\n`;
                        embd.setDescription(desc);
                        embd.setFooter('');
                        embed.reactions.removeAll();
                        embed.edit(embd);
                        mongoose.connection.close();
                        return;
                    }
                }else{
                    let coded = false;
                    let embed;
                    let tmp = "";
                    console.log('cari code');

                    charaFind.forEach((doc,i) => {
                        tmp += `${i+1}. ${doc.series} · **${doc.name}**\n`;
                        console.log('dalem foreach ke - ' + i);
                        console.log(doc);
                        console.log(doc.added_by);
                        if (doc.code != undefined) {
                            console.log('dalem if doc code length > 0');
                            doc.code.forEach(val => {
                                console.log('dalem foreach dalem');
                                if (val = code) {
                                    coded = true;
                                    console.log('code found');
                                    charaSelect = doc;
                                }
                            });
                        }
                    });

                    console.log('kelar foreach');

                    if (!coded) {
                        console.log('tambah code');
						embd
						.setDescription(`<@${v}>, please type the number beside the character for card \`${code}\` to add your card to the database. \n\n**Showing characters :** \n\n ${tmp}`);

                        embed = await nMsg.channel.send(embd);

						const mCollect = await nMsg.channel.awaitMessages(m => m.author.id == v && /^\d+$/.test(m.content), { max: 1, time: 30000 });
						
						charaSelect = charaFind[mCollect.first().content - 1];
                        // console.log(charaSelect);
                        console.log('idnya adalah ');
                        console.log(charaSelect.id);
                        console.log(mongoose.Types.ObjectId(charaSelect.id));
                        let character = await charactersModel.findByIdAndUpdate(
                            mongoose.Types.ObjectId(charaSelect.id),
                        {
                            $push: {
                                code: code
                            }
                        });

                        embd.setColor('#00FF00');
                        desc = `**Character \`${code}\` has been added**\n`;
                        embd.setDescription(desc);
                        embd.setFooter('');
                        embed.edit(embd);
                    }
                }

                let talkData = charaSelect.talk;
                let qFind = false;
                let data;

                if (talkData.length != 0 ) {
                    talkData.forEach(element => {
                        if (element.q.toLowerCase() == q.toLowerCase()) {
                            qFind = true;
                            data = element;
                        }
                    });
                }

                console.log(data);
                console.log('mau masuk pertanyaan');

                if (!qFind) {
                    desc = `**Do you want to add this question to database?**\n\n*${q}*\n\n`;
                    console.log('masuk pertanyaan');
                    
                    if (a1 != undefined) desc += `\u0031\u20E3${a1}\n`; 
                    if (a2 != undefined) desc += `\u0032\u20E3${a2}\n`; 
                    if (a3 != undefined) desc += `\u0033\u20E3${a3}\n`; 
                    if (a4 != undefined) desc += `\u0034\u20E3${a4}\n`;

                    embd.setDescription(desc);
                    embd.setFooter('This question not yet recorded on database');

                    let embed = await nMsg.channel.send(embd);

                    let react1 = await embed.react('\u2705');
                    let react2 = await embed.react('\u274C');

                    const filter = (reaction, user) => {
                        return ['\u2705','\u274C'].includes(reaction.emoji.name) && user.id == v;
                    };

                    let collected = await embed.awaitReactions(filter,{ max: 1, time:30000 });

                    let reaction = collected.first();
                    
                    if (reaction.emoji.name == '\u2705') {
                        desc = `**What the answer for this question?*\n\n*${q}*\n\n`;
                        
                        embd.setColor('#00FF00');
                        embd.setFooter('Choose the correct answer!');
                        embed.reactions.removeAll();
                        embed.edit(embd);
                        
                        let react3, react4, react5, react6; 

                        if (a1 != undefined) react3 = await embed.react('\u0031\u20E3');
                        if (a2 != undefined) react4 = await embed.react('\u0032\u20E3'); 
                        if (a3 != undefined) react5 = await embed.react('\u0033\u20E3');
                        if (a4 != undefined) react6 = await embed.react('\u0034\u20E3');
                        
                        const filterAns = (reaction, user) => {
                            let arr = [];
                        
                            if (a1 != undefined) arr.push('\u0031\u20E3');
                            if (a2 != undefined) arr.push('\u0032\u20E3'); 
                            if (a3 != undefined) arr.push('\u0033\u20E3');
                            if (a4 != undefined) arr.push('\u0034\u20E3');
                        
                            return arr.includes(reaction.emoji.name) && user.id == v;
                        };

                        let collectAns = await embed.awaitReactions(filterAns,{ max: 1, time:30000 });

                        let answer = collectAns.first();

                        if (answer.emoji.name == '\u0031\u20E3') a = a1;
                        if (answer.emoji.name == '\u0032\u20E3') a = a2;
                        if (answer.emoji.name == '\u0033\u20E3') a = a3;
                        if (answer.emoji.name == '\u0034\u20E3') a = a4;

                        const ins = {q: q, a: a, edited_by: v};
                        
                        let character = await charactersModel.findOneAndUpdate({
                            name: chara,
                            code: code
                        },{
                            $push: {
                                talk: ins
                            }
                        });

                        console.log(character);

                        nMsg.channel.send(`**Question has been added for ${chara}!**`);
                            
                    }else if (reaction.emoji.name == '\u274C') {
                        desc += `**Question add has been cancelled**`
                        embd.setColor('#ff0000');
                        embd.setDescription(desc);
                        embd.setFooter('');
                        embed.reactions.removeAll();
                        embed.edit(embd);
                        mongoose.connection.close();
                        return;
                    }else{
                        mongoose.connection.close();
                        return;
                    }                
                }else{
                    mongoose.connection.close();
                    return;
                }
            }else{
                console.log('masuk color bukan ijo');
            }
        } catch (error) {
            
        }
    }
}