const Discord = require('discord.js');

module.exports = {
	name: 'karutalk',
  abbrev: 'kt',
	description: 'Karuta character talk data, use `~kt get` to get data',
	execute(msg, args) {
    if(args.length < 1) return msg.reply(this.description); 

    const cmdSub = args[0];
    const charaTalk = msg.karutaMaster["talk"];
    const charaData = Object.keys(charaTalk);
		const embd = new Discord.MessageEmbed().setColor('#fc77be');
    let show = "";

    if(cmdSub.toLowerCase() == "get"){
      if(args[1] === undefined) {
        if(charaData.length == 0) return msg.reply('There is no data right now, use `~kt add` to input character talk data');
        
        for (let i = 0; i < charaData.length; i++) {
            const element = charaData[i];
            show += `${i+1}. ${element.charAt(0).toUpperCase() + element.slice(1)}\n`;
        }
        embd
        .setTitle(`Character list`)
        .setDescription(`**Showing all character in database :** \n ${show}`);
      
        return msg.channel.send(embd);
      }
      const cmdItem = args[1];
      const talkData = charaTalk[cmdItem.toLowerCase()];
      if(talkData === undefined) {
        return msg.reply(`There is no data for ${cmdItem}, use \`~kt add\` to input character talk data`)
      }else{
        for (let i = 0; i < talkData.length; i++) {
            const element = talkData[i];
            show += `**${i+1}. Question** : ${element['q']} \n **Answer** : ${element['a']}\n\n`;
        }
        embd
        .setTitle(`Talk data for ${cmdItem}`)
        .setDescription(`**Showing question and answer for ${cmdItem} :** \n ${show}`);

        msg.channel.send(embd);
      }
    }else if(cmdSub.toLowerCase() == "add"){
      if(args[1] === undefined) return msg.reply('Use `~kt add <character>` to input character talk data');

      const cmdChara = args[1];
      let cmdQ, cmdA;

      const collector = new Discord.MessageCollector(msg.channel, m => m.author.id == msg.author.id, { max: 1, time: 30000 });

      msg.channel.send(`**What question did you want to input for ${cmdChara}?**`);
      
      collector.on('collect', question => {
        cmdQ = question.content;
        const collector2 = new Discord.MessageCollector(msg.channel, m => m.author.id == msg.author.id, { max: 1, time: 30000 });
        
        msg.channel.send(`**What does the answer for that question?**`);

        collector2.on('collect', answer => {
          cmdA = answer.content;      

          const ins = {q: cmdQ, a:cmdA};
          if(msg.karutaMaster["talk"][cmdChara.toLowerCase()] == undefined){
            msg.karutaMaster["talk"][cmdChara.toLowerCase()] = [ins];
          }else{
            msg.karutaMaster["talk"][cmdChara.toLowerCase()].push(ins); 
          }
          msg.channel.send(`**Successfully added question and answer to ${cmdChara} data**`);
        });  
        collector2.on('end', collected => {
          if(collected.size < 1) msg.channel.send(`**Try again, your time is up!**`);
        });
      });

      collector.on('end', collected => {
        if(collected.size < 1) msg.channel.send(`**Try again, your time is up!**`);
      });
    }
	},
};