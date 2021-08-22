const Discord = require('discord.js');
const gameModule = require('../modules/gameModule')

const timePrep = 20000;

module.exports = {
	name: 'shiritori',
    abbrev: 'st',
	description: 'Shiritori game',
	execute(msg, args) {
		if (!msg.gameState[msg.guild.id]) {
			msg.gameState[msg.guild.id] = {
				status: 0,
				gameCount: 0,
				owner: msg.guild.ownerID,
				user: []
			}		
		}

	
		const shiritoriDsc = new Discord.MessageEmbed().setColor('#fc77be');

		if (args == "character") {
			if (msg.gameState[msg.guild.id].status == 1) {
				msg.channel.send('The game already started');
				return false;
			}
			shiritoriDsc
			.setTitle('Preparing anime character shiritori game')
			.setDescription('Bot will be preparing the game for you.\nThere will be **20 second** before starting. \n\nReact with ✅ to join the game, there must be 2 or more player for the game to start');

			msg.channel.send(shiritoriDsc).then(async function (embedMessage) {
				embedMessage.react('✅');
				const filter = (reaction, user) => {
					if (user.id != embedMessage.author.id) {
						msg.channel.send(`<@${user.id}> has joined the game`);
					}
					return ['✅'].includes(reaction.emoji.name);
				};

				embedMessage.awaitReactions(filter, {time: timePrep})
				.then(collected => {
					const reaction = collected.first();
					const userReact = reaction.users.cache;
					
					if (reaction.count > 2) {
						msg.channel.send("Time is up\nLet's get started");
						const participant = gameModule.register(msg, userReact, "character");
						gameModule.shiritoriPlay(msg, participant, "character");
					} else {
						msg.channel.send("The number of player insufficient, game aborted!");
					}
				})
				.catch(collected => {
					console.log(collected);
					msg.reply('Something fishy . . .');
				});
			});
		} else if (args == "anime") {
			
		} else {
			shiritoriDsc
					.setTitle('Shiritori game bot')
					.setDescription('Shiritori is a Japanese word game in which the players are required to say a word which begins with the final kana of the previous word. This bot provide you with anime character and anime title shiritori. For anime character shiritori, player must answer with full character name but the first word must be given name and the final kana will be taken from the last kana of the given name.\n\nExample: sakura haruno(さくら) → ranbo (ランボ) → orihime inoue (井上) → medaka kurokami (黒神) → kanou shinka (加納) → udon (うどん)\n\n **Goal** : Stay Alive!\n\n**How to play** : \n1. There must be 2 or more player\n2. The first letter and the first player who must answer will be randomed\n3. Player must answer in 30 second, player can answer using "~<character name>"\n4. Player that not give the correct answer in time will be death, in other means the player is lose and out of the game\n5. The last player who stay alive will be the winner.\n\n`~shiritori character` : Start anime character shiritori game.\n`~shiritori anime` : Start anime title shiritori game.');

			msg.channel.send(shiritoriDsc);
		}
	}
};

// const register = (msg, user, type) => {
// 	const participant = new Array();
// 	user.forEach(value => {
// 		let found = false;
// 		let tmp = {};
// 		value.status = 1;
// 		msg.gameState[msg.guild.id].user.forEach((val,key,arr) => {
// 			if (val.id == value.id) {
// 				arr[key] = value;
// 				found = true
// 				tmp.id = value.id;
// 				tmp.life = 1;
// 				participant.push(tmp);
// 			}
// 		});
// 		if (!found && value.id != botID) {
// 			msg.gameState[msg.guild.id].user.push(value);
// 			tmp.id = value.id;
// 			tmp.life = 1;
// 			participant.push(tmp);
// 		}
// 	});
// 	msg.channel.send(`${participant.length} player is playing this game.`);
// 	play(msg, participant, type);
// }

// const play = (msg, participant, type) => {
// 	msg.gameState[msg.guild.id].status = 1;
// 	let game;
// 	shuffleArray(participant);
	
// 	game = new shiriChara(participant, character.charAt(random(character.length, 0)));
// 	console.log(game);
	
// 	msg.channel.send(`<@${game.thisTurnID()}> will be the first player to answer`);
// 	msg.channel.send(`"**${game.thisTurnChara()}**" will be the first letter`);
	
// 	rotation(msg,game);
// }

// function getTimeLeft(timeout, startTime, reminder) {
// 	if (Math.ceil((startTime + timeout._idleTimeout - Date.now()) / 1000) <= 0) {
// 		clearInterval(reminder);
// 	}
// 	return Math.ceil((startTime + timeout._idleTimeout - Date.now()) / 1000);
// }

// const random = (n, first = 1) => {
// 	return Math.floor(Math.random() * Math.floor(n)) + first;
// }

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }

// const rotation = (msg,game, reminder = null, additional = false) => {
// 	const startTime = Date.now();

// 	const timeout = setTimeout(function() {
// 		msg.channel.send(`<@${game.thisTurnID()}> your time is up, congratulation you died~~`);
// 		const end = game.playerDie();
// 		console.log(end);
// 		if (reminder != null) {
// 			clearInterval(reminder);
// 		}
// 		if (!end) {
// 			clearTimeout(timeout);
// 			endGame(msg,game);
// 		}else{
// 			msg.channel.send(`<@${game.thisTurnID()}>, its your turn. "**${game.thisTurnChara()}**" is the syllables`);
// 			clearTimeout(timeout);
// 			rotation(msg,game,reminder);
// 		}

// 	}, timeTurn);

// 	if (additional) {
// 		additionalAnswer(msg,game,timeout,startTime);
// 	}else{
// 		answerRequest(msg,game,timeout,startTime);
// 	}

// }

// const answerRequest = (msg, game, timeout, startTime) => {
// 	let timeLeft = "";
// 	if (reminder != null && reminder != undefined) {
// 		clearInterval(reminder);
// 	}
	
// 	const reminder = setInterval(function() {
// 		timeLeft = getTimeLeft(timeout, startTime, reminder);
// 		if ( timeLeft == 20 || timeLeft == 10 || timeLeft == 3 || timeLeft == 2 || timeLeft == 1) {
// 			msg.channel.send(`Time left: ${timeLeft}s`);
// 		}
// 	}, 1000);

// 	const collector = new Discord.MessageCollector(msg.channel, m => m.author.id == game.thisTurnID(), { max: 1, time: timeLeft });
	
// 	collector.on('collect', message => {
// 		let res = game.checkAnswer(message.content);
// 		console.log(res);
// 		if (res) {
// 			msg.channel.send(`<@${game.thisTurnID()}>, its your turn. "**${game.thisTurnChara()}**" is the syllables`);
// 			clearInterval(reminder);
// 			clearTimeout(timeout);
// 			rotation(msg,game,reminder);
// 		}else{
// 			msg.channel.send(`<@${game.thisTurnID()}>, your answer is not correct. Try Again`);
// 			clearInterval(reminder);
// 			answerRequest(msg,game, timeout, startTime);
// 		}
// 	});
// }

// const endGame = (msg, game) =>{	
// 	msg.channel.send(`<@${game.thisTurnID()}> has win the game. Congratulation :heart::heart:`);
// 	msg.gameState[msg.guild.id].status = 0;
// }

// const additionalAnswer = (msg,game,timeout,startTime) => {
// 	let timeLeft = "";
// 	if (reminder != null && reminder != undefined) {
// 		clearInterval(reminder);
// 	}
	
// 	const reminder = setInterval(function() {
// 		timeLeft = getTimeLeft(timeout, startTime, reminder);
// 		if ( timeLeft == 20 || timeLeft == 10 || timeLeft == 3 || timeLeft == 2 || timeLeft == 1) {
// 			msg.channel.send(`Time left: ${timeLeft}s`);
// 		}
// 	}, 1000);

// 	const collector = new Discord.MessageCollector(msg.channel, m => m.author.id == game.thisTurnID(), { max: 1, time: timeLeft });
	
// 	collector.on('collect', message => {
// 		game.checkAdditional(message.content).then(data => {
// 			msg.channel.send(data);
// 		});
// 	});
// }