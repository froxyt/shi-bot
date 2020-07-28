const jikanjs  = require('jikanjs'); 
const Discord = require('discord.js');

const timePrep = 5255;
const timeTurn = 30000;

const botID = '702016212972077116';
const character = 'abcdefghijklmnopqrstuvwxyz';


module.exports = {
	name: 'shiritori',
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

		console.log(gameStatus.status);

		const shiritoriDsc = new Discord.MessageEmbed().setColor('#fc77be');

		if (args == "character") {
			shiritoriDsc
			.setTitle('Preparing anime character shiritori game')
			.setDescription('Bot will be preparing the game for you.\nThere will be **20 second** before starting. \n\nUse **~shiritori join** to join the game, there must be 2 or more player for the game to start');

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
					
					if (reaction.count > 1) {
						msg.channel.send("Time is up\nLet's get started");
						register(msg, userReact);
					} else {
						msg.channel.send("The number of player is not sufficient, game aborted!");
					}
				})
				.catch(collected => {
					msg.reply('you reacted with neither a thumbs up, nor a thumbs down.');
				});
			});
		} else if (args == "anime") {
			
		} else if (args == "join") {
			
		} else {
			shiritoriDsc
					.setTitle('Shiritori game bot')
					.setDescription('Shiritori is a Japanese word game in which the players are required to say a word which begins with the final kana of the previous word. This bot provide you with anime character and anime title shiritori. For anime character shiritori, player must answer with full character name but the first word must be given name and the final kana will be taken from the last kana of the given name.\n\nExample: sakura haruno(さくら) → ranbo (ランボ) → orihime inoue (井上) → medaka kurokami (黒神) → kanou shinka (加納) → udon (うどん)\n\n **Goal** : Stay Alive!\n\n**How to play** : \n1. There must be 2 or more player\n2. The first letter and the first player who must answer will be randomed\n3. Player must answer in 30 second, player can answer using "~<character name>"\n4. Player that not give the correct answer in time will be death, in other means the player is lose and out of the game\n5. The last player who stay alive will be the winner.\n\n**~shiritori character** : Start anime character shiritori game.\n**~shiritori anime** : Start anime title shiritori game.\n\n**~shiritori join** : Join the game that still in preparing stage. You cannot join the game that has been started.');

			msg.channel.send(shiritoriDsc);
		}
	}
};

const register = (msg, user) => {
	const participant = new Array();
	user.forEach(value => {
		let found = false;
		value.status = 1;
		msg.gameState[msg.guild.id].user.forEach((val,key,arr) => {
			if (val.id == value.id) {
				arr[key] = value;
				found = true
				participant.push(value.id);
			}
		});
		if (!found && value.id != botID) {
			msg.gameState[msg.guild.id].user.push(value);
			participant.push(value.id);
		}
	});
	msg.channel.send(`${participant.length} player is playing this game.`);
	play(msg, participant);
}

const play = (msg, participant) => {
	msg.gameState[msg.guild.id].status = 1;
	gameStatus.totalPlayer = participant.length;
	gameStatus.playerAlive = participant.length;
	gameStatus.playerDie = 0;
	inTurn.id = participant[random(participant.length)];
	inTurn.word	= character.charAt(random(character.length, 0));


	msg.channel.send(`<@${inTurn.id}> will be the first player to answer`);
	
	// while (gameStatus.playerAlive > 1) {
		
	// }
	msg.channel.send(`"${inTurn.word.toUpperCase()}" will be the first letter`);
	
	let startTime = Date.now();

	let reminder = setInterval(function() {
		let timeLeft = getTimeLeft(timeout, startTime, reminder);
		if ( timeLeft == 20 || timeLeft == 10 || timeLeft == 3 || timeLeft == 2 || timeLeft == 1) {
			msg.channel.send(`Time left: ${getTimeLeft(timeout, startTime, reminder)}s`);
		}
	}, 1000);

	let timeout = setTimeout(function() {
		msg.channel.send(`<@${participant[0]}> your time is up, congratulation you lose~~`);
	}, timeTurn);

	

	// msg.channel.send(`<@${}> has joined the game`);
}

function getTimeLeft(timeout, startTime, reminder) {
	if (Math.ceil((startTime + timeout._idleTimeout - Date.now()) / 1000) <= 0) {
		clearInterval(reminder);
	}
	return Math.ceil((startTime + timeout._idleTimeout - Date.now()) / 1000);
}

const random = (n, first = 1) => {
	return Math.floor(Math.random() * Math.floor(n)) + first;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}