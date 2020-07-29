const Discord = require('discord.js');
const request = require('request');
const malScraper = require('mal-scraper')

module.exports = {
	name: 'search',
	description: 'Search Character!',
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
		
		msg.channel.send("You search for " + search);
		 
		
		//request('https://api.jikan.moe/v3/search/anime?q=Fate/Zero&page=1', function (error, response, body) {
//            console.log('Status:', response.statusCode);
//            console.log('Headers:', JSON.stringify(response.headers));
//            console.log('Response:', body);
//        });
		var typeList = [];
		var titleList = [];
		malScraper.search.search("anime", {term:search}).then(data => {
						for (anime of data) {
							titleLower = anime.title.toLowerCase();
							cekLower = search.toLowerCase();
							tes = titleLower.includes(cekLower);
							titleList.push(anime.title);
							if (tes) {
								typeList.push(anime.type);
							}
						}
						//console.log(typeList);
						
						//console.log(titleList);
					  var charaList = [];
					  for (title of titleList) {
						  malScraper.getInfoFromName(title).then(data => {
									  console.log(data)
									  for (chara of data.characters) {
			  							
										newName = chara.name.split(", ");
										
			  							
			  							if (!charaList.includes(newName)){
											if (newName[1] == "undefined" || newName[1] == "" || newName[1] == null){
												charaList.push(newName[0]);	
											} else {
												charaList.push(newName[1] + " " + newName[0]);
											}
										}
			  						}
			  						console.log(charaList);
			  						//msg.channel.send("The First Character is " + charaList[0]);
								  }).catch(console.error);
					  }
					}).catch(console.error);
		
		
					
		
		
		
		//jikanjs.search(type, search, '1', {limit : 10}).then((response) => {
//			if(response.results.length == 1){
//				if(type === "character"){
//					console.log(response.results);
// 					msg.channel.send(response.results.name);
//					if(response.result[0].anime.length > 0){
//						msg.channel.send(response.results[0].anime[0].name);
//					}
//					if(response.result[0].manga.length > 0){
//						msg.channel.send(response.results[0].manga[0].name);
//					}
//				}else if(type === "anime"){
//					console.log(response.results.length);
// 					msg.channel.send( response.results[0].title );
// 					msg.channel.send( response.results[0].synopsis );
//				}else if(type ==="manga"){
// 					msg.channel.send( response.results[0].title );
// 					msg.channel.send( response.results[0].synopsis );
//				}
//			}else if(response.results.length == 0){
//				msg.channel.send(search + " Not Found in " + type);
//			}else if(response.results.length > 1 ){
//				response.results.forEach(element => {
//					if(type === "character"){
// 						msg.channel.send( element.name );
//						if(element.anime.length > 0){
//							msg.channel.send( element.anime[0].name );		
//						}
//						if(element.manga.length > 0){
//							msg.channel.send( element.manga[0].name );	
//						}
//					}else if(type === "anime"){
//						console.log(response.results.length);
// 						msg.channel.send( element.title );
// 						msg.channel.send( element.synopsis );
//					}else if(type ==="manga"){
//						console.log(response.results.length);
// 						msg.channel.send( element.title );
// 						msg.channel.send( element.synopsis );
//					}
//				})
//			}
//			
//		}).catch((err) => {
//			console.error(err);   //in case a error happens
//		});
	},
};
