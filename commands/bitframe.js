const Discord = require('discord.js');

module.exports = {
	name: 'bitframe',
    abbrev: 'bf',
	description: 'Look for frame based on bit used',
	execute(msg, args) {
        const bits = msg.karutaMaster["bits"];
        const frame = msg.karutaMaster["frame"];

        if(args.length < 1) return msg.reply("Define your bit first (ex. ~bf copper / ~bf copper zinc)"); 

        let bitCheck1 = false;
        let bitCheck2 = false;
        let bit = args[0].toLowerCase();
        let bit2 = "";
        if(typeof args[1] !== 'undefined') {
            bit2 = args[1].toLowerCase();
            bits.forEach(value => {
                if (bit == value.toLowerCase()) {
                    bitCheck1 = true;
                }
                if (bit2 == value.toLowerCase()) {
                    bitCheck2 = true;
                }
            });
        }else{
            bits.forEach(value => {
                if (bit == value.toLowerCase()) {
                    bitCheck1 = true;
                }
            });
            bitCheck2 = true;
        }

		const embd = new Discord.MessageEmbed().setColor('#fc77be');

        if (bitCheck1 && bitCheck2) {
            let firstFilter = [];
            let secondFilter = []
            let show = "```\n";
            frame.forEach(value => {
                if (value['bit1'].toLowerCase() == bit || value['bit2'].toLowerCase() == bit) firstFilter.push(value);
            });
            if (bit2 != "") {
                firstFilter.forEach(value => {
                    if (value['bit1'].toLowerCase() == bit2 || value['bit2'].toLowerCase() == bit2) secondFilter.push(value);
                });
                for (let i = 0; i < secondFilter.length; i++) {
                    const element = secondFilter[i];
                    show += `${i+1}. ${element['name']} · (${element['id']})\n`;
                }
                show += "```";
                embd.setTitle(`Frame with ${bit} and ${bit2}`);
            }else{
                for (let i = 0; i < firstFilter.length; i++) {
                    const element = firstFilter[i];
                    show += `${i+1}. ${element['name']} · ${element['bit1']} & ${element['bit2']} · (${element['id']}) \n`;
                }
                show += "```";
                embd.setTitle(`Frame with ${bit}`);
            }
            if (show == "") {
    			embd.setDescription(`**There is no frame using ${bit} and ${bit2} combination**`);
            }else{
                embd.setDescription(`${show}`);
            }
			msg.channel.send(embd);
        }else{
            msg.channel.send("Bits input is wrong");
        }
	},
};