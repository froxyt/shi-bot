const Discord = require('discord.js');
const misc = require('./miscModule');
const search = require('./searchModule');
const shiriChara = require('../object/shiriChara');

const timeTurn = 30000;
const botID = '702016212972077116';

const register = (msg, user) => {
	const participant = new Array();
	user.forEach(value => {
		let found = false;
		let tmp = {};
		value.status = 1;
		msg.gameState[msg.guild.id].user.forEach((val,key,arr) => {
			if (val.id == value.id) {
				arr[key] = value;
				found = true
				tmp.id = value.id;
				tmp.life = 1;
				participant.push(tmp);
			}
		});
		if (!found && value.id != botID) {
			msg.gameState[msg.guild.id].user.push(value);
			tmp.id = value.id;
			tmp.life = 1;
			participant.push(tmp);
		}
	});
	msg.channel.send(`${participant.length} player is playing this game.`);
	return participant;
}

const shiritoriPlay = (msg, participant, type) => {
	msg.gameState[msg.guild.id].status = 1;

	misc.shuffleArray(participant);
	
	let game,cb;

	if (type.toLowerCase() == "character") {
		game = new shiriChara(participant, misc.randomChar());

		cb = charaProcess;
	}else{
		console.log("else of character type");
		return;
	}

	msg.channel.send(`<@${game.thisTurnID()}> will be the first player to answer`);
	msg.channel.send(`"**${game.thisTurnChara()}**" will be the first letter`);
	
	
	turnBaseShiriPlay(msg, game, cb).then(winner => {
		msg.channel.send(`<@${winner}> has win the game. Congratulation :heart::heart:`);
		msg.gameState[msg.guild.id].status = 0;
	});
}

const turnBaseShiriPlay = (msg, game, callback) => new Promise((resolve, reject) => {
	const startTime = Date.now();

	const timeout = setTimeout(function() {
		msg.channel.send(`<@${game.thisTurnID()}> your time is up, congratulation you died 🎉🎉`);
		const end = game.playerDie();
		if (reminder != null) {
			clearInterval(reminder);
		}
		if (!end) {
			clearTimeout(timeout);
			resolve(game.thisTurnID());
		}else{
			msg.channel.send(`<@${game.thisTurnID()}>, its your turn. "**${game.thisTurnChara()}**" is the syllables`);
			clearInterval(reminder);
			clearTimeout(timeout);
			resolve(turnBaseShiriPlay(msg, game, callback));
		}

	}, timeTurn);

	
	const reminder = setInterval(function() {
		const timeLeft = misc.timeLeftSecond(timeout, startTime, reminder);
		if ( timeLeft == 20 || timeLeft == 10 || timeLeft == 3 || timeLeft == 2 || timeLeft == 1) {
			msg.channel.send(`Time left: ${timeLeft}s`);
		}
	}, 1000);
	
	callback(msg, game, timeout, startTime, reminder).then(res => {
		msg.channel.send(`<@${game.thisTurnID()}>, its your turn. "**${game.thisTurnChara()}**" is the syllable`);
	
		clearInterval(reminder);
		clearTimeout(timeout);
	
		resolve(turnBaseShiriPlay(msg, game, callback));
	}).catch(err => {
		console.log(err);
	});
});

const charaProcess = (msg, game, timeout, startTime, reminder) => new Promise((resolve, reject) => {
	msg.channel.send(`What is the anime? ❔❔`);
	misc.getResponse(msg,game.thisTurnID(),misc.timeLeftMS(timeout,startTime,reminder),1).then(result => {
		search.anime(result, true, true).then(res => {
			if (res.length > 0) {
				let descAnime = "";
				for (let i = 0; i < res.length && i < 9; i++) {
					descAnime = `${descAnime}**${i+1}. ${res[i]}**\n`;
				}

				const chooseAnimeDsc = new Discord.MessageEmbed()
				.setColor('#fc77be')
				.setTitle('❕ Choose the anime 1 - 9 ❕')
				.setDescription(descAnime);

				msg.channel.send(chooseAnimeDsc);
				
				misc.getResponse(msg,game.thisTurnID(),misc.timeLeftMS(timeout,startTime,reminder),1).then(val => {
					if (val >= '1' && val <= '9') {
						msg.channel.send(`Character Name? ❔❔ `);
						misc.getResponse(msg,game.thisTurnID(),misc.timeLeftMS(timeout,startTime,reminder),1).then(chara => {
							search.character(chara,true,false).then(charaList => {
								if (charaList.length == 1) {
									let found = false;
									console.log(charaList);
									charaList[0].anime.forEach(element => {
										if (element.name.toLowerCase() == res[val-1].toLowerCase()) {
											found = true;
										}
									});

									if (found) {
										const newName = charaList[0].name.split(", ");
										let answer = "";

										if (newName[1] == "undefined" || newName[1] == "" || newName[1] == null){
											answer = newName[0];	
										} else {
											answer = newName[1] + " " + newName[0];
										}

										const check = game.checkAnswer(answer);
										
										if (check) {
											msg.channel.send(`✅✅${answer} is your answer, this chara will be banned from the game ✅✅`);
											resolve(check);
										}else{
											msg.channel.send(`<@${game.thisTurnID()}>, your answer is not correct or already used. Try Again ❌❌`);
											resolve(charaProcess(msg, game, timeout, startTime, reminder));
										}
									}else{
										msg.channel.send(`<@${game.thisTurnID()}>, character and anime does not match. Try Again ❌❌`);
										resolve(charaProcess(msg, game, timeout, startTime, reminder));
									}

								} else if (charaList.length > 1) {
									console.log(charaList);
									msg.channel.send(`❕❕❕ There is more than 1 character with that name ❕❕❕\nAnswer with full name of the character`);
									misc.getResponse(msg,game.thisTurnID(),misc.timeLeftMS(timeout,startTime,reminder),1).then(fullChara => {
										let match = false;
										for (let i = 0; i < charaList.length; i++) {
											const element = charaList[i];
											const newName = element.name.split(", ");
											let answer = "";
	
											if (newName[1] == "undefined" || newName[1] == "" || newName[1] == null){
												answer = newName[0];	
											} else {
												answer = newName[1] + " " + newName[0];
											}

											if (answer.toLowerCase().includes(fullChara.toLowerCase())) {
												const check = game.checkAnswer(answer);
												match = true;
												if (check) {
													msg.channel.send(`✅✅**${answer}** is your answer, this chara will be banned from the game ✅✅`);
													resolve(check);
												}else{
													msg.channel.send(`<@${game.thisTurnID()}>, your answer is not correct or already used. Try Again ❌❌`);
													resolve(charaProcess(msg, game, timeout, startTime, reminder));
												}
												break;
											}
										}

										if (!match) {
											msg.channel.send(`<@${game.thisTurnID()}>, character and anime does not match. Try Again ❌❌`);
											resolve(charaProcess(msg, game, timeout, startTime, reminder));
										}
									});
								} else {
									msg.channel.send(`<@${game.thisTurnID()}>, the character is not found. Try Again ❌❌`);
									resolve(charaProcess(msg, game, timeout, startTime, reminder));
								}
							});
						});
					}else{
						msg.channel.send(`<@${game.thisTurnID()}>, the entry is not correct, choose between 1 - 9, Try Again ❌❌`);
						resolve(charaProcess(msg, game, timeout, startTime, reminder));
					}
				});
			}else{
				msg.channel.send(`<@${game.thisTurnID()}>, anime not found ❌❌`);
				resolve(charaProcess(msg, game, timeout, startTime, reminder));
			}
		});
	})
});


module.exports = {
	register : register,
	shiritoriPlay : shiritoriPlay
}