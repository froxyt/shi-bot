const Discord = require('discord.js');

module.exports = {
	name: 'upcalculator',
  abbrev: 'uc',
	description: 'Calculator for upgrade karuta card',
	execute(msg) {
    let effChar = msg.embeds[0].description.search("Effort");
    let effValChar = effChar + 11;

    let filtr = msg.embeds[0].description.slice(effValChar,effValChar+2);
    let effVal;
    if(filtr.charAt(1) == '*'){
      effVal = filtr.charAt(0);
    }else if(filtr.charAt(2) == '*'){
      effVal = filtr.slice(0,1);
    }else{
      effVal = filtr;
    }
    
    let numberPattern = /\d+/g;
    
    /* Base Value */
    let baseLocate = msg.embeds[0].description.search("Base");
    let bValChar = baseLocate - 4;
    let bFilter = msg.embeds[0].description.slice(bValChar,bValChar+6);
    let bVal = bFilter.match( numberPattern );
    bVal = parseInt(bVal[0]);
    let tLowBVal = bVal - 0.5;
    let tHighBVal = bVal + 0.499;

    /* Wellness Value */
    let wellLocate = msg.embeds[0].description.search("Wellness");
    let wellValChar = wellLocate - 8;
    let wellGradeChar = wellLocate - 3;
    let wellFilter = msg.embeds[0].description.slice(wellValChar,wellValChar+8);
    let wellGrade = msg.embeds[0].description.slice(wellGradeChar, wellGradeChar + 1);
    let wellVal = wellFilter.match( numberPattern );
    wellVal = parseInt(wellVal[0]);

    /* Purity Value */
    let purLocate = msg.embeds[0].description.search("Purity");
    let purValChar = purLocate - 8;
    let purGradeChar = purLocate - 3;
    let purFilter = msg.embeds[0].description.slice(purValChar,purValChar+8);
    let purGrade = msg.embeds[0].description.slice(purGradeChar, purGradeChar + 1);
    let purVal = purFilter.match( numberPattern );
    purVal = parseInt(purVal[0]);
    
    /* Quickness Value */
    let quickLocate = msg.embeds[0].description.search("Quickness");
    let quickValChar = quickLocate - 8;
    let quickGradeChar = quickLocate - 3;
    let quickFilter = msg.embeds[0].description.slice(quickValChar,quickValChar+8);
    let quickGrade = msg.embeds[0].description.slice(quickGradeChar, quickGradeChar + 1);
    let quickVal = quickFilter.match( numberPattern );
    quickVal = parseInt(quickVal[0]);
    
    
    /* Grabber Value */
    let grabLocate = msg.embeds[0].description.search("Grabber");
    let grabValChar = grabLocate - 8;
    let grabGradeChar = grabLocate - 3;
    let grabFilter = msg.embeds[0].description.slice(grabValChar,grabValChar+8);
    let grabGrade = msg.embeds[0].description.slice(grabGradeChar, grabGradeChar + 1);
    let grabVal = grabFilter.match( numberPattern );
    grabVal = parseInt(grabVal[0]);
    
    /* Dropper Value */
    let dropLocate = msg.embeds[0].description.search("Dropper");
    let dropValChar = dropLocate - 8;
    let dropGradeChar = dropLocate - 3;
    let dropFilter = msg.embeds[0].description.slice(dropValChar,dropValChar+8);
    let dropGrade = msg.embeds[0].description.slice(dropGradeChar, dropGradeChar + 1);
    let dropVal = dropFilter.match( numberPattern );
    dropVal = parseInt(dropVal[0]);
    
    /* Toughness Value */
    let toughLocate = msg.embeds[0].description.search("Toughness");
    let toughValChar = toughLocate - 8;
    let toughGradeChar = toughLocate - 3;
    let toughFilter = msg.embeds[0].description.slice(toughValChar,toughValChar+8);
    let toughGrade = msg.embeds[0].description.slice(toughGradeChar, toughGradeChar + 1);
    let toughVal = toughFilter.match( numberPattern );
    toughVal = parseInt(toughVal[0]);
    
    /* Vanity Value */
    let vanityLocate = msg.embeds[0].description.search("Vanity");
    let vanityValChar = vanityLocate - 8;
    let vanityGradeChar = vanityLocate - 3;
    let vanityFilter = msg.embeds[0].description.slice(vanityValChar,vanityValChar+8);
    let vanityGrade = msg.embeds[0].description.slice(vanityGradeChar, vanityGradeChar + 1);
    let vanityVal = vanityFilter.match( numberPattern );
    vanityVal = parseInt(vanityVal[0]);
    
    /* Style Value */
    let styleLocate = msg.embeds[0].description.search("Style");
    let styleValChar = styleLocate - 8;
    let styleGradeChar = styleLocate - 3;
    let styleFilter = msg.embeds[0].description.slice(styleValChar,styleValChar+8);
    let styleGrade = msg.embeds[0].description.slice(styleGradeChar, styleGradeChar + 1);
    let styleVal = styleFilter.match( numberPattern );
    styleVal = parseInt(styleVal[0]);

    /* Calculate Kitchen */
    let tLowBValUp = [tLowBVal*2,tLowBVal*4,tLowBVal*8,tLowBVal*16];
    let tBValUp = [bVal*2,bVal*4,bVal*8,bVal*16];
    let tHighBValUp = [tHighBVal*2,tHighBVal*4,tHighBVal*8,tHighBVal*16];

    let tGrabLowVal = [0,0,0,0];
    let tGrabVal = [0,0,0,0];
    let tGrabHighVal = [0,0,0,0];

    let tDropLowVal = [0,0,0,0];
    let tDropVal = [0,0,0,0];
    let tDropHighVal = [0,0,0,0];

    let tQuickLowVal = [0,0,0,0];
    let tQuickVal = [0,0,0,0];
    let tQuickHighVal = [0,0,0,0];

    let tToughLowVal = [0,0,0,0];
    let tToughVal = [0,0,0,0];
    let tToughHighVal = [0,0,0,0];

    let tStyleLowVal = [0,0,0,0];
    let tStyleVal = [0,0,0,0];
    let tStyleHighVal = [0,0,0,0];

    let tPurityLowVal = [0,0,0,0];
    let tPurityVal = [0,0,0,0];
    let tPurityHighVal = [0,0,0,0];

    let tWellLowVal = [0,0,0,0];
    let tWellVal = [0,0,0,0];
    let tWellHighVal = [0,0,0,0];

    let tVanityLowVal = [0,0,0,0];
    let tVanityVal = [0,0,0,0];
    let tVanityHighVal = [0,0,0,0];

    let lowVanityScale = bVal == 0 ? 0 : (vanityVal - 0.5) / tLowBVal; 
    let vanityScale = bVal == 0 ? 0 : vanityVal / bVal; 
    let highVanityScale = bVal == 0 ? 0 : (vanityVal + 0.499) / tHighBVal; 

    let addFrame = [0,0,0,0]; 
    let addDye = [0,0,0,0];
    let addMDye = [0,0,0,0];

    for (let i = 0; i < 4; i++) {
      addFrame[i] = Math.round(tBValUp[i] * 0.9375);
      addDye[i] = Math.round(tBValUp[i] * 0.25);
      addMDye[i] = Math.round(tBValUp[i] * 0.9375);
    }

    let frameChecker = false;
    let dyeChecker = false;
    let mDyeChecker = false;

    if (grabGrade == "S") {
      for (let i = 0; i < 4; i++) {
        tGrabLowVal[i] = Math.round(tLowBValUp[i] / 10);
        tGrabVal[i] = Math.round(tBValUp[i] / 10);
        tGrabHighVal[i] = Math.round(tHighBValUp[i] / 10);
      }
    }
    if (dropGrade == "S") {
      for (let i = 0; i < 4; i++) {
        tDropLowVal[i] = Math.round(tLowBValUp[i] / 10);
        tDropVal[i] = Math.round(tBValUp[i] / 10);
        tDropHighVal[i] = Math.round(tHighBValUp[i] / 10);
      }
    }

    if (quickGrade == "S") {
      let highQuickScale = 5;
      let lowQuickScale = 5.499;

      for (let i = 0; i < 4; i++) {
        tQuickLowVal[i] = Math.round(tLowBValUp[i] / lowQuickScale);
        tQuickVal[i] = Math.round(tBValUp[i] / lowQuickScale);
        tQuickHighVal[i] = Math.round(tHighBValUp[i] / highQuickScale);
      }
    }else if (quickGrade == "A") {
      let highQuickScale = 5.5;
      let lowQuickScale = 7.499;

      for (let i = 0; i < 4; i++) {
        tQuickLowVal[i] = Math.round(tLowBValUp[i] / lowQuickScale);
        tQuickVal[i] = Math.round(tBValUp[i] / lowQuickScale);
        tQuickHighVal[i] = Math.round(tHighBValUp[i] / highQuickScale);
      }
    }else if (quickGrade == "B") {
      let highQuickScale = 7.5;
      let lowQuickScale = 14.999;

      for (let i = 0; i < 4; i++) {
        tQuickLowVal[i] = Math.round(tLowBValUp[i] / lowQuickScale);
        tQuickVal[i] = Math.round(tBValUp[i] / lowQuickScale);
        tQuickHighVal[i] = Math.round(tHighBValUp[i] / highQuickScale);
      }
    }else if (quickGrade == "C") {
      let highQuickScale = 15;
      let lowQuickScale = 59.999;

      for (let i = 0; i < 4; i++) {
        tQuickLowVal[i] = Math.round(tLowBValUp[i] / lowQuickScale);
        tQuickVal[i] = Math.round(tBValUp[i] / lowQuickScale);
        tQuickHighVal[i] = Math.round(tHighBValUp[i] / highQuickScale);
      }
    }else if (quickGrade == "D") {
      let highQuickScale = 60;
      let lowQuickScale = 100;

      for (let i = 0; i < 4; i++) {
        tQuickLowVal[i] = Math.round(tLowBValUp[i] / lowQuickScale);
        tQuickVal[i] = Math.round(tBValUp[i] / lowQuickScale);
        tQuickHighVal[i] = Math.round(tHighBValUp[i] / highQuickScale);
      }
    }

    if (toughGrade == "S") {
      let toughScale = 4;

      for (let i = 0; i < 4; i++) {
        tToughLowVal[i] = Math.round(tLowBValUp[i] / toughScale);
        tToughVal[i] = Math.round(tBValUp[i] / toughScale);
        tToughHighVal[i] = Math.round(tHighBValUp[i] / toughScale);
      }
    }else if (toughGrade == "A") {
      let toughScale = 5;

      for (let i = 0; i < 4; i++) {
        tToughLowVal[i] = Math.round(tLowBValUp[i] / toughScale);
        tToughVal[i] = Math.round(tBValUp[i] / toughScale);
        tToughHighVal[i] = Math.round(tHighBValUp[i] / toughScale);
      }
    }else if (toughGrade == "B") {
      let toughScale = 6.5;

      for (let i = 0; i < 4; i++) {
        tToughLowVal[i] = Math.round(tLowBValUp[i] / toughScale);
        tToughVal[i] = Math.round(tBValUp[i] / toughScale);
        tToughHighVal[i] = Math.round(tHighBValUp[i] / toughScale);
      }
    }else if (toughGrade == "C") {
      let toughScale = 10;

      for (let i = 0; i < 4; i++) {
        tToughLowVal[i] = Math.round(tLowBValUp[i] / toughScale);
        tToughVal[i] = Math.round(tBValUp[i] / toughScale);
        tToughHighVal[i] = Math.round(tHighBValUp[i] / toughScale);
      }
    }else if (toughGrade == "D") {
      let toughScale = 20;

      for (let i = 0; i < 4; i++) {
        tToughLowVal[i] = Math.round(tLowBValUp[i] / toughScale);
        tToughVal[i] = Math.round(tBValUp[i] / toughScale);
        tToughHighVal[i] = Math.round(tHighBValUp[i] / toughScale);
      }
    }

    if (styleGrade == "S") {
      let styleScale = 1.5;

      frameChecker = true;
      mDyeChecker = true;

      for (let i = 0; i < 4; i++) {
        tStyleLowVal[i] = Math.round(tLowBValUp[i] * styleScale);
        tStyleVal[i] = Math.round(tBValUp[i] * styleScale);
        tStyleHighVal[i] = Math.round(tHighBValUp[i] * styleScale);
      }
    }else if (styleGrade == "B") {
      let baseFramedStyle = tHighBVal * 0.75;
      frameChecker = true

      if (styleVal > baseFramedStyle) {
        dyeChecker = true;
      }

      for (let i = 0; i < 4; i++) {
        tStyleLowVal[i] = Math.round(styleVal * 2);
        tStyleVal[i] = Math.round(styleVal * 2);
        tStyleHighVal[i] = Math.round(styleVal * 2);
      }
    }else if (styleGrade == "D") {
      let styleScale = 0.2;

      dyeChecker = true;

      for (let i = 0; i < 4; i++) {
        tStyleLowVal[i] = Math.round(tLowBValUp[i] * styleScale);
        tStyleVal[i] = Math.round(tBValUp[i] * styleScale);
        tStyleHighVal[i] = Math.round(tHighBValUp[i] * styleScale);
      }
    }

    if (purGrade == "S") {
      let purScale = [3.85,5.75,11.5,9999];

      for (let i = 0; i < 4; i++) {
        tPurityLowVal[i] = Math.round(tLowBValUp[i] / purScale[i]);
        tPurityVal[i] = Math.round(tBValUp[i] / purScale[i]);
        tPurityHighVal[i] = Math.round(tHighBValUp[i] / purScale[i]);
      }
    }else if (purGrade == "A") {
      let purScale = [5.75,11.5,9999,9999];

      for (let i = 0; i < 4; i++) {
        tPurityLowVal[i] = Math.round(tLowBValUp[i] / purScale[i]);
        tPurityVal[i] = Math.round(tBValUp[i] / purScale[i]);
        tPurityHighVal[i] = Math.round(tHighBValUp[i] / purScale[i]);
      }
    }else if (purGrade == "B") {
      let purScale = [11.5,9999,9999,9999];

      for (let i = 0; i < 4; i++) {
        tPurityLowVal[i] = Math.round(tLowBValUp[i] / purScale[i]);
        tPurityVal[i] = Math.round(tBValUp[i] / purScale[i]);
        tPurityHighVal[i] = Math.round(tHighBValUp[i] / purScale[i]);
      }
    }

    if (vanityVal != 0) {
      for (let i = 0; i < 4; i++) {
        tVanityLowVal[i] = Math.round(tLowBValUp[i] * lowVanityScale);
        tVanityVal[i] = Math.round(tBValUp[i] * vanityScale);
        tVanityHighVal[i] = Math.round(tHighBValUp[i] * highVanityScale);
      }
    }

    for (let i = 0; i < 4; i++) {
      tWellLowVal[i] = Math.round((tLowBValUp[i] + tPurityLowVal[i] + tQuickLowVal[i] + tToughLowVal[i] + tVanityLowVal[i] + tDropLowVal[i] + tGrabLowVal[i] + tStyleLowVal[i]) * 0.25);
      tWellVal[i] = Math.round((tBValUp[i] + tPurityVal[i] + tQuickVal[i] + tToughVal[i] + tVanityVal[i] + tDropVal[i] + tGrabVal[i] + tStyleVal[i]) * 0.25);
      tWellHighVal[i] = Math.round((tHighBValUp[i] + tPurityHighVal[i] + tQuickHighVal[i] + tToughHighVal[i] + tVanityHighVal[i] + tDropHighVal[i] + tGrabHighVal[i] + tStyleHighVal[i]) * 0.25);
    }

    let effLow = [0,0,0,0];
    let eff = [0,0,0,0];
    let effHigh = [0,0,0,0];

    for (let i = 0; i < 4; i++) {
      effLow[i] = Math.round(tLowBValUp[i] + tPurityLowVal[i] + tQuickLowVal[i] + tToughLowVal[i] + tVanityLowVal[i] + tDropLowVal[i] + tGrabLowVal[i] + tStyleLowVal[i] + tWellLowVal[i]);
      eff[i] = Math.round(tBValUp[i] + tPurityVal[i] + tQuickVal[i] + tToughVal[i] + tVanityVal[i] + tDropVal[i] + tGrabVal[i] + tStyleVal[i] + tWellVal[i]);
      effHigh[i] = Math.round(tHighBValUp[i] + tPurityHighVal[i] + tQuickHighVal[i] + tToughHighVal[i] + tVanityHighVal[i] + tDropHighVal[i] + tGrabHighVal[i] + tStyleHighVal[i] + tWellHighVal[i]);
    }
    /* End Calculate Kitchen */

		const embd = new Discord.MessageEmbed().setColor('#91a6a6');

    embd
    .setTitle('Character Condition')
    .setDescription('Choose your **current card condition**: \n```0 - Damaged (☆☆☆☆)\n1 - Poor (★☆☆☆)\n2 - Good (★★☆☆)\n3 - Excellent (★★★☆)\n4 - Mint (★★★★)```\n*You have 60 second to choose a reaction*');

    msg.channel.send(embd).then(async function (embedMessage) {
				embedMessage.react('\u0030\u20E3').then(() => embedMessage.react('\u0031\u20E3')).then(() => embedMessage.react('\u0032\u20E3')).then(() => embedMessage.react('\u0033\u20E3')).then(() => embedMessage.react('\u0034\u20E3'));
				const filter = (reaction, user) => {
					return ['\u0030\u20E3','\u0031\u20E3','\u0032\u20E3','\u0033\u20E3','\u0034\u20E3'].includes(reaction.emoji.name) && user.id !== embedMessage.author.id;
				};

				embedMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
				.then(collected => {
					const reaction = collected.first();
          const userReact = reaction.users.cache;
      		const embed = new Discord.MessageEmbed().setColor('#fc77be');
          let msgEmbedEdit = "";
          let mintVal = 0;
          let mintBase = 0;
          let mintCheck = false;

          embed.setTitle('Character Condition');

          if (reaction.emoji.name === '\u0030\u20E3' ){
            mintVal = eff[3];
            mintBase = tBValUp[3];
            
            msgEmbedEdit += `All upgrade effort:\n\`\`\`Poor : ${effLow[0]} - ${effHigh[0]} (${eff[0]})\nGood : ${effLow[1]} - ${effHigh[1]} (${eff[1]})\nExcellent : ${effLow[2]} - ${effHigh[2]} (${eff[2]})\nMint : ${effLow[3]} - ${effHigh[3]} (${eff[3]})\`\`\`\n`;
          }else if (reaction.emoji.name === '\u0031\u20E3' ){
            mintVal = eff[2];
            mintBase = tBValUp[2];
            
            msgEmbedEdit += `All upgrade effort:\n\`\`\`Good : ${effLow[0]} - ${effHigh[0]} (${eff[0]})\nExcellent : ${effLow[1]} - ${effHigh[1]} (${eff[1]})\nMint : ${effLow[2]} - ${effHigh[2]} (${eff[2]})\`\`\`\n`;
          }else if (reaction.emoji.name === '\u0032\u20E3' ){
            mintVal = eff[1];
            mintBase = tBValUp[1];

            msgEmbedEdit += `All upgrade effort:\n\`\`\`Excellent : ${effLow[0]} - ${effHigh[0]} (${eff[0]})\nMint : ${effLow[1]} - ${effHigh[1]} (${eff[1]})\`\`\`\n`;
          }else if (reaction.emoji.name === '\u0033\u20E3' ){
            mintVal = eff[0];
            mintBase = tBValUp[0];

            msgEmbedEdit += `All upgrade effort:\n\`\`\`Mint : ${effLow[0]} - ${effHigh[0]} (${eff[0]})\`\`\`\n`;
          }else if (reaction.emoji.name === '\u0034\u20E3' ){
            mintVal = effVal;
            mintBase = bVal;
            mintCheck = true;
          }

          /* Style Kitchen */
          let stylerMsg = "";
          let valueMsg = "";
          let tmpVal = mintVal - (mintBase * 0.25);
          let styledEff = 0;
          let dyedEff = 0;
          let halfEff = 0;
          let fullEff = 0;

          if (frameChecker && mDyeChecker) {
            stylerMsg += "Your Card Already Framed and Mystic Dyed";
          }else if (frameChecker && dyeChecker) {
            stylerMsg += "Your Card is Framed and Dyed";
            fullEff = tmpVal + (mintBase * 0.9375);
            valueMsg += `Mystic Dyed & Framed: ${fullEff}`
          }else if (frameChecker) {
            stylerMsg += "Your Card is Framed or Mystic Dyed";
            fullEff = mintVal + (mintBase * 0.9375);
            halfEff = mintVal + (mintBase * 0.25);
            valueMsg += `Dyed & Framed: ${halfEff}\nMystic Dyed & Framed: ${fullEff}`
          }else if (dyeChecker) {
            stylerMsg += "Your Card is Dyed";
            halfEff = mintVal + (mintBase * 0.9375);
            dyedEff = tmpVal + (mintBase * 0.9375);
            fullEff = dyedEff + (mintBase * 0.9375);
            valueMsg += `Mystic Dyed: ${dyedEff}\nDyed & Framed: ${halfEff}\nMystic Dyed & Framed: ${fullEff}`
          }else{
            if (mintCheck) {
              stylerMsg += "Your Card Neither Framed nor Dyed";              
            }else{
              stylerMsg += "Your Card Style when Mint:";
            }
            styledEff = mintVal + (mintBase * 0.9375);
            dyedEff = mintVal + (mintBase * 0.25);
            halfEff = styledEff + (mintBase * 0.25);
            fullEff = styledEff + (mintBase * 0.9375);
            valueMsg += `Dyed: ${dyedEff}\nFramed: ${styledEff}\nDyed & Framed: ${halfEff}\nMystic Dyed & Framed: ${fullEff}`
          }

          msgEmbedEdit += `**${stylerMsg}**\n\`\`\`${valueMsg}\`\`\``;
          embed.setDescription(msgEmbedEdit);
          embedMessage.edit(embed);
				})
				.catch(collected => {
				});
			});        
	},
};