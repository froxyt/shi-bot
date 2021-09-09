const Discord = require('discord.js');
const mongo = require('../mongo');
const frameModel = require('../db/frameSchema');
const bitsModel = require('../db/bitsSchema');
const charactersModel = require('../db/charactersSchema');

module.exports = {
	name: 'karutalk',
  	abbrev: 'kt',
	description: 'Karuta character talk data, use `~kt get` to get data',
	execute(msg, args) {
		mongo().then(async (mongoose) => {
			try {
				console.log('Connected to MongoDB!');

				if(args.length < 1) return msg.reply(this.description); 

				const cmdSub = args.shift();
				const charaList = await charactersModel.find();
				const embd = new Discord.MessageEmbed().setColor('#fc77be');
				let charaGet = [];
				let charaSelected;
				let show = "";
				let input = "";

				if (args.length > 1) {
					args.forEach(element => {
					input += element + ' ';
					});            
				}else{
					input = args[0];
				}
				if (input != undefined) {
					charaList.forEach(element => {
						if (element.name.toLowerCase().includes(input.toLowerCase())) {
							charaGet.push(element);
						}
					});

					if (charaGet.length > 1) {
						let tmp = "";
						charaGet.forEach((element,i) => {
							tmp += `${i+1}. ${element.name.charAt(0).toUpperCase() + element.name.slice(1)} - ${element.series}\n`
						});
						embd
						.setTitle(`Character Result`)
						.setDescription(`${msg.author}, please type the number beside the character you are looking for. \n**Showing characters :** \n \`\`\`${tmp}\`\`\``);

						msg.channel.send(embd);

						const mCollect = await msg.channel.awaitMessages(m => m.author.id == msg.author.id && /^\d+$/.test(m.content) , { max: 1, time: 30000 });
						
						charaSelected = charaGet[mCollect.first().content - 1];

					}else{
						charaSelected = isset(charaGet) ? charaGet[0] : undefined;
					}
				}

				if(cmdSub.toLowerCase() == "get"){
					if(args[0] === undefined) {
						if(charaList.length == 0) return msg.reply('There is no data right now, use `~kt add` to input character talk data');
						
						for (let i = 0; i < charaList.length; i++) {
							const element = charaList[i];
							show += `${i+1}. ${element.name.charAt(0).toUpperCase() + element.name.slice(1)} - ${element.series}\n`;
						}
						
						embd
						.setTitle(`Character list`)
						.setDescription(`**Showing all character in database :** \n \`\`\`${show}\`\`\``);
						
						return msg.channel.send(embd);
					}

					if(!charaSelected) {
						return msg.reply(`There is no data for ${input}, use \`~kt add\` to input character talk data`)
					}else{

						show += "```\n";

						for (let i = 0; i < charaSelected.talk.length; i++) {
							const element = charaSelected.talk[i];
							show += `${i+1}. Question : ${element['q']} \n Answer : ${element['a']}\n Last Updated By : <@${element['edited_by']}>\n\n`;
						}

						show += "```"

						embd
						.setTitle(`Talk data for ${charaSelected.name}`)
						.setDescription(`**Showing question and answer for ${charaSelected.name} :** \n ${show}`);

						msg.channel.send(embd);
					}
				}else if(cmdSub.toLowerCase() == "add"){
					if(args[0] === undefined) return msg.reply('Use `~kt add <character>` to input character talk data');
					
					let cmdQ, cmdA, cmdS;

					if (!charaSelected) {
						msg.channel.send(`**What does the series (anime/manga) of ${input}?**`);
						
						const sCollect = await msg.channel.awaitMessages(m => m.author.id == msg.author.id , { max: 1, time: 30000 });
						
						cmdS = sCollect.first().content;
					}

					msg.channel.send(`**What question did you want to input for ${input}?**`);

					const qCollect = await msg.channel.awaitMessages(m => m.author.id == msg.author.id , { max: 1, time: 30000 });

					cmdQ = qCollect.first().content;

					msg.channel.send(`**What does the answer for that question?**`);

					const aCollect = await msg.channel.awaitMessages(m => m.author.id == msg.author.id , { max: 1, time: 30000 });

					cmdA = aCollect.first().content;

					const ins = {q: cmdQ, a:cmdA, edited_by: aCollect.first().author.id};
						
					if(!charaSelected) {
						let character = await charactersModel.create({
							name: input,
							series: cmdS,
							talk: ins,
							added_by: msg.author.id,
							updated_by: msg.author.id
						});

						character.save();

					} else {
						let character = await charactersModel.findOneAndUpdate({
							_id: charaGet[0]._id
						},{
							$push: {
							talk: ins
							}
						});
					}
					msg.channel.send(`**Successfully added question and answer to ${input} data**`);
				}
			} catch (error) {
				console.log(`Its error ${error}`);
			} finally {
				mongoose.connection.close();
			}
		});

	},
};