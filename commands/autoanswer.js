const Discord = require('discord.js');
const mongo = require('../mongo');
const charactersModel = require('../db/charactersSchema');

module.exports = {
	name: 'autoanswer',
  	abbrev: 'aa',
	description: 'Auto provide answer when talking to a character and the question is on database',
	async execute(oMsg, nMsg) {
        try {
            const mongoose = await mongo();
            
            const quotedRegex = /“([^“”]*)”/;
            const visitorRegex = /<@([^<>]*)>/;
            const charaRegex =  /\*\*([^\*]*)\*\*/;
            const codeRegex = /\(`([^()`]*)`\)/;
            const embd = new Discord.MessageEmbed().setColor('#fc77be');
            embd.setTitle('Character Talking Answer');

            let q, v, chara, code, charaSelect;
            let checkQ = nMsg.embeds[0].description.match(quotedRegex);
            let checkV = nMsg.embeds[0].description.match(visitorRegex);
            let checkChara = nMsg.embeds[0].description.match(charaRegex);
            let checkCode = nMsg.embeds[0].description.match(codeRegex);
            let isCode = true;

            if (checkQ) q = checkQ[1];
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
                code: code
            });
            console.log('charaFind pertama');
            console.log(charaFind);

            if (charaFind.length == 0) {
                charaFind = await charactersModel.find({
                    name: chara
                }); 
                isCode = false;
                console.log('charaFind kedua');
                console.log(charaFind);
            }

            if (charaFind.length > 0) {
                console.log('masuk charafind lebih dari 0');
                let tmp = "";
                let embed;

                if (!isCode) {
                    charaFind.forEach((doc,i) => {
                        tmp += `${i+1}. ${doc.series} · **${doc.name}**\n`;
                    });   
    
                    embd.setDescription(`<@${v}>, please type the number beside the character for card \`${code}\` to search the question. If you didn't find the matching character type **0** \n\n**Showing characters :** \n\n ${tmp}`);
    
                    embed = await nMsg.channel.send(embd);
    
                    const mCollect = await nMsg.channel.awaitMessages(m => m.author.id == v && /^\d+$/.test(m.content), { max: 1, time: 30000 });
                        
                    if (mCollect.first().content == 0) {
                        embd.setColor('#FFFF00');
                        embd.setDescription(`Your character not yet recorded, please add it to our database after you success talking to **${chara}** (\`${code}\`) \uD83D\uDE18`);
                        embed.edit(embd);
                        mongoose.connection.close();
                        return;
                    }else{
                        charaSelect = charaFind[mCollect.first().content - 1];
                    }
                }else{
                    charaSelect = charaFind[0];
                }

                let talkData = charaSelect.talk;
                let data;

                if (talkData.length != 0 ) {
                    talkData.forEach(document => {
                        if (document.q.toLowerCase() == q.toLowerCase()) {
                            data = document;
                        }
                    });
                }

                if (data != undefined) {
                    embd.setColor('#00FF00');
                    embd.setDescription(`The answer of question “*${q}*” for ${charaSelect.series} - **${charaSelect.name}** is ${data.a} \uD83D\uDE18`);
                    embd.setFooter(`This question and answer is added by <@${data.edited_by}>`);
                    if (embed == undefined) {
                        nMsg.channel.send(embd);                        
                    }else{
                        embed.edit(embd);
                    }
                    mongoose.connection.close();
                    return;
                }else{
                    embd.setColor('#FFFF00');
                    embd.setDescription(`Question “*${q}*” for ${charaSelect.series} - **${charaSelect.name}** is not found, please add this question and answer after success talking \uD83D\uDE18`);
                    if (embed == undefined) {
                        nMsg.channel.send(embd);                        
                    }else{
                        embed.edit(embd);
                    }
                    mongoose.connection.close();
                    return;
                }
            }else{
                embd.setColor('#FFFF00');
                embd.setDescription(`Your character not yet recorded, please add it to our database after you success talking to **${chara}** (\`${code}\`)`);
                nMsg.channel.send(embd);
                mongoose.connection.close();
                return;
            }

        } catch (error) {
            
        }
    }
}