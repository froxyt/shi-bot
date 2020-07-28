const jikanjs  = require('jikanjs'); 
const Discord = require('discord.js');
const Jikan_node = require('jikan-node');

mal = new Jikan_node(); 

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
			search = search + " " + args[i];
		}
		msg.channel.send("You search for" + search);
		type = "anime"
		
		var h = [];
		mal.search(type, search, {page:1, limit:1})
			.then((hasil) => {
				console.log(hasil.results);
			})
			.catch(err=>console.log(err));
			
		console.log(h);
		
		
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
			
		//}).catch((err) => {
//			console.error(err);   //in case a error happens
//		});
	},
};
