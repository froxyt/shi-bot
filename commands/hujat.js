module.exports = {
	name: 'hujat',
    abbrev: 'hj',
	description: 'Useful for mocking people except admen',
	execute(msg, args) {
		msg.channel.send(msg.mentions.users.map(user => {
      if(user.id == '422428397445185551'){return `Admen ga boleh di hujat anying`}else{
        return `${user} Anjing Bangsat Bego Tll`    
      }
		}));	
	},
};