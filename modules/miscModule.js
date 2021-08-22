const Discord = require('discord.js');

const character = 'abcdefghijklmnopqrstuvwxyz';

const getResponse = (msg, id, time, max = 1) => new Promise((resolve, reject) => {
	
	const collector = new Discord.MessageCollector(msg.channel, m => m.author.id == id, { max: max, time: time });
	
	collector.on('collect', message => {
		resolve(message.content);
	});
});

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const randomChar = () => {
	return character.charAt(random(character.length, 0));
}

const random = (n, first = 1) => {
	return Math.floor(Math.random() * Math.floor(n)) + first;
}

const getTimeLeftSecond = (timeout, startTime, reminder) => {
	if (Math.ceil((startTime + timeout._idleTimeout - Date.now()) / 1000) <= 0) {
		clearInterval(reminder);
	}
	return Math.ceil((startTime + timeout._idleTimeout - Date.now()) / 1000);
}

const getTimeLeftMS = (timeout, startTime, reminder) => {
	if (Math.ceil((startTime + timeout._idleTimeout - Date.now()) / 1000) <= 0) {
		clearInterval(reminder);
	}
	return Math.ceil((startTime + timeout._idleTimeout - Date.now()));
}

module.exports = {
	getResponse : getResponse,
	shuffleArray : shuffleArray,
	random : random,
	randomChar : randomChar,
	timeLeftMS : getTimeLeftMS,
	timeLeftSecond : getTimeLeftSecond
}