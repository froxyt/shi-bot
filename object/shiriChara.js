const shiriGame = require('./shiriGame');
const search = require('../commands/search');

class shiriChara extends shiriGame {
    constructor(player, firstChara){
        super(player,firstChara);
        this.bannedCharacter = new Array();
    }

    checkAnswer(ans){
        const fname = ans.split(" ");
        
        let p, isBanned = false;
        
        if (this.turnChara.length == 1) {
            p = ans.slice(0,1).toUpperCase();
        }else{
            p = ans.slice(0,2).toUpperCase();
        }

        this.bannedCharacter.forEach((val, index, arr) => {
            if (val.toLowerCase() == ans.toLowerCase()) {
                isBanned = true;
            }
        });
        // search.search(ans, anime)
        if (p == this.thisTurnChara() && !isBanned) {
            this.bannedCharacter.push(ans);
            return this.answer(fname[0]);
        }else{
            return false;
        }
    }


    banned(){
        return this.bannedCharacter;
    }
}

module.exports = shiriChara;