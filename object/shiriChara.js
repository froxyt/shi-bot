const shiriGame = require('./shiriGame');

class shiriChara extends shiriGame {
    constructor(player, firstChara){
        super(player,firstChara);
        this.bannedCharacter = new Array();
    }

    checkAnswer(ans){
        let p;
        if (this.turnChara.length == 1) {
            p = ans.slice(0,1).toUpperCase();
        }else{
            p = ans.slice(0,2).toUpperCase();
        }
        let isBanned = false;
        this.bannedCharacter.forEach((val, index, arr) => {
            if (val == ans) {
                isBanned = true;
            }
        });
        if (p == this.thisTurnChara() && !isBanned) {
            this.bannedCharacter.push(ans);
            return this.answer(ans);
        }else{
            return false;
        }
    }

    banned(){
        return this.bannedCharacter;
    }
}

module.exports = shiriChara;