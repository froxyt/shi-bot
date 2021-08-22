const Discord = require('discord.js');
const searchMod = require('../modules/searchModule');

module.exports = {
	name: 'search',
    abbrev: 's',
	description: 'Search Anime, Manga, or Character!',
	execute(msg, args) {
		const type = args[0].toLowerCase();
		let search = "";
		if(type != "anime" && type != "manga" && type != "character" && type != "charanim"){
			return msg.channel.send("For type, choose between anime, manga, charanim or character. There is no " + type + " type!");
		}
		
		for(var i = 1; i < args.length ; i++){
			if (i == 1) {
				search = search + args[i];		
			} else {
				search = search + " " + args[i];
			}
			
			if(search.length < 3) {
				msg.channel
					.send( `The given query must be of minimum 3 letters! Given query '${search}' has only ${query.length} letters.` );
				return
			}
		}

		if (type == "anime") {
			searchMod.anime(search).then((data) => {console.log(data)});
		} else if (type == "manga") {
			
		} else if (type == "charanim") {
			searchMod.charaFromAnime(search).then(data => {console.log(data)});
		} else if (type == "character") {
			searchMod.character(search,true,true).then(res => {
				console.log(res);
				let descAnime = "";
				for (let i = 0; i < res.length && i < 9; i++) {
					descAnime = `${descAnime}**${i+1}. ${res[i]}**\n`;
				}
				const resultDsc = new Discord.MessageEmbed()
				.setColor('#fc77be')
				.setTitle('❕ Character result ❕')
				.setDescription(descAnime);

				msg.channel.send(resultDsc);
			}).catch(err => {
				console.log("search failed try again");
				console.log(err);
			});
		}
		msg.channel.send("You search for " + search);		
		
	}
};