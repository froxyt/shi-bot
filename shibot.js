const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
const dotenv = require('dotenv').config();

const client = new Discord.Client();
const guild = new Discord.Guild();
client.commands = new Discord.Collection();
client.abbrev = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const gameState = JSON.parse(fs.readFileSync('./storages/gameState.json', 'utf8'));
const karutaMaster = JSON.parse(fs.readFileSync('./storages/karutaMaster.json', 'utf8'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	client.abbrev.set(command.abbrev, command);
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	
	client.user.setActivity("~shiritori");
});

client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot){
    if (msg.author.id == '646937666251915264'){
      if (msg.embeds[0] != undefined){
        if (msg.embeds[0].title == "Worker Details"){
          client.abbrev.get('uc').execute(msg);
        }else if(msg.embeds[0].title == 'Date Minigame'){
			console.log(msg.embeds[0]);
			return;
        }else{
          return;
        }
      }else if(msg.content.includes("dropping") && !msg.content.includes("wait")) {
		// client.abbrev.get('p').execute(msg);
      }else{
        return;
      }
    }else{
      return;
    }
  }
	
	const sender = msg.author;
	const senderGuild = msg.guild;
	const args = msg.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	msg.gameState = gameState;
	msg.karutaMaster = karutaMaster;

	if (commandName.length < 3) {
		if(!client.abbrev.has(commandName)) return;
	}else{
		if(!client.commands.has(commandName)) return;
	}
	
	const command = commandName.length < 3 ? client.abbrev.get(commandName) : client.commands.get(commandName);

	
	
	try{
		if (commandName == "commands" || commandName == "c") {
			command.execute(msg,client.abbrev);
		}else{
			command.execute(msg,args);
		}
	} catch(error) {
		console.error(error);
		msg.reply('There was an error trying to execute the command!');
	}

	fs.writeFile('./storages/gameState.json', JSON.stringify(msg.gameState), err => {
		if (err) {
			console.error(err);
		}
	});

  fs.writeFile('./storages/karutaMaster.json', JSON.stringify(msg.karutaMaster), err => {
		if (err) {
			console.error(err);
		}
	});
	
});

client.on('messageUpdate', (oldMessage, newMessage) => {
	if (newMessage.author.bot){
		if (newMessage.author.id == '646937666251915264'){
			if (newMessage.embeds[0] != undefined){
				console.log(newMessage.embeds[0]);
				if (newMessage.embeds[0].title == "Visit Character"){
					console.log("masuk visit chara");
					if (newMessage.embeds[0].footer !== null) {
						if (newMessage.embeds[0].footer.text.includes('Choose the response most likely to impress')) {
							console.log('masuk autoanswer');
							client.abbrev.get('aa').execute(oldMessage, newMessage);
							return;
						}
					}
					if (oldMessage.embeds[0].footer !== null) {
						if (oldMessage.embeds[0].footer.text.includes('Choose the response most likely to impress')) {
							console.log('masuk autosavetalk');
							client.abbrev.get('as').execute(oldMessage, newMessage);
						}
					}
				}
			}
		}
	}
});

client.login(process.env.TOKEN);
