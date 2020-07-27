const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
const guild = new Discord.Guild();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const gameState = JSON.parse(fs.readFileSync('./storages/gameState.json', 'utf8'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	
	const sender = msg.author;
	const senderGuild = msg.guild;
	const args = msg.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	msg.gameState = gameState;

	if(!client.commands.has(commandName)) return;
	
	const command = client.commands.get(commandName);
	
	try{
		command.execute(msg,args);
	} catch(error) {
		console.error(error);
		msg.reply('There was an error trying to execute the command!');
	}

	fs.writeFile('./storages/gameState.json', JSON.stringify(msg.gameState), err => {
		if (err) {
			console.error(err);
		}
	})
	
});

client.login(token);