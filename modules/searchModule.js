const malScraper = require('mal-scraper');
const jikan = require('jikanjs');

const searchAnime = (search, strict = false, titleOnly = false) => new Promise((resolve, reject) => {
	const res = new Array();

	malScraper.search.search("anime", {term:search}).then(data => {
		for (anime of data) {
			titleLower = anime.title.toLowerCase();
			cekLower = search.toLowerCase();
			match = titleLower.includes(cekLower);

			if (titleOnly) anime = anime.title;
			
			if (strict) {
				if (match) {
					res.push(anime);
				}					
			}else{
				res.push(anime);
			}
		}
		resolve(res);
	}).catch(console.error);
});

const searchCharaFromAnime = (animeTitle, specificChara = false) => new Promise((resolve, reject) => {
	const charaList = new Array();
	
	malScraper.getInfoFromName(animeTitle).then(data => {
		for (chara of data.characters) {
			const newName = chara.name.split(", ");
			
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

const searchCharacter = (character, strict = false, nameOnly = false) => new Promise((resolve, reject) => {
	const charaList = new Array();
	console.log("character nya " + character);
	jikan.search("character",character).then(result => {
		if (nameOnly) {
			console.log(result.results);
			result.results.forEach(element => {
				const newName = element.name.split(", ");
				const characters = character.replace(/[^A-Za-z ]/g, '');
				const charaSplit = characters.toLowerCase().split(" ");

				let fullName = "";

				if (newName[1] == "undefined" || newName[1] == "" || newName[1] == null){
					fullName = newName[0];	
				} else {
					fullName = newName[1] + " " + newName[0];
				}

				if (strict) {
					let ctr = 0;
					for (let i = 0; i < charaSplit.length; i++) {
						const namePart = charaSplit[i];
						if (fullName.toLowerCase().includes(namePart)) {
							ctr++;
						}
					}
					if (ctr == charaSplit.length) {
						if (!charaList.includes(fullName)){
							charaList.push(fullName);
						}
					}				
				}else{
					if (!charaList.includes(fullName)){
						charaList.push(fullName);
					}
				}	
			});
		}else{
			result.results.forEach(element => {
				if (strict) {
					if (element.name.toLowerCase().includes(character)) {
						charaList.push(element);
					}				
				}else{
					charaList.push(element);
				}
			});
		}
		resolve(charaList);
	}).catch(err => {
		reject(err);
	});
});
	

module.exports = {
    anime : searchAnime,
	charaFromAnime : searchCharaFromAnime,
	character : searchCharacter
}