const Discord = require('discord.js');
const request = require('request');
const malScraper = require('mal-scraper')

module.exports = {
	name: 'search',
	description: 'Search Anime, Manga, or Character!',
	execute(msg, args) {
		var search = "";
		var type = args[0];
		console.log(type != "anime");
		console.log(type != "character");
		console.log(type != "manga");
		if(type != "anime" && type != "manga" && type != "character"){
			return msg.channel.send("For type, choose between anime, manga, or character. There is no " + type + " type!");
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
			searchAnime(search).then((data) => {console.log(data)});
		} else if (type == "manga") {
			
		} else if (type == "character") {
			searchCharafromAnime(search).then(data => {console.log(data)});
		}
		msg.channel.send("You search for " + search);		
		
	},
	searchAnime: searchAnime(search, strict = true)
};

const searchAnime = (search, strict = true) => new Promise((resolve, reject) => {
		const res = new Array();

		malScraper.search.search("anime", {term:search}).then(data => {
			for (anime of data) {
				titleLower = anime.title.toLowerCase();
				cekLower = search.toLowerCase();
				tes = titleLower.includes(cekLower);
				if (strict) {
					if (tes) {
						res.push(anime);
					}					
				}else{
					res.push(anime);
				}
			}
			resolve(res);
		}).catch(console.error);
	});

const searchCharafromAnime = (animeTitle, specificChara = false) => new Promise((resolve, reject) => {
	const charaList = new Array();
	const specificCharaList = new Array();

	malScraper.getInfoFromName(animeTitle).then(data => {
		for (chara of data.characters) {
			newName = chara.name.split(", ");
			
			if (specificChara) {
				if (chara.name.includes(specificChara)) {
					if (!charaList.includes(newName)){
						if (newName[1] == "undefined" || newName[1] == "" || newName[1] == null){
							charaList.push(newName[0]);	
						} else {
							charaList.push(newName[1] + " " + newName[0]);
						}
					}
				}				
			}else{
				if (!charaList.includes(newName)){
					if (newName[1] == "undefined" || newName[1] == "" || newName[1] == null){
						charaList.push(newName[0]);	
					} else {
						charaList.push(newName[1] + " " + newName[0]);
					}
				}
			}
		}
		resolve(charaList);
		//msg.channel.send("The First Character is " + charaList[0]);
	}).catch(console.error);
});