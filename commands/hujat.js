module.exports = {
	name: 'hujat',
	description: 'Untuk Menghujat Orang!',
	execute(msg, args) {
		msg.channel.send("Hi, I'm here to menghujat");
		msg.channel.send(msg.mentions.users.map(user => {
		return `${user}'s Anjing Bangsat Bego Tll`}));	
	},
};