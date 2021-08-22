class ShiriGame {
    constructor(player,firstChara){
        this.player = player;
        this.playerIndex = new Array();
        for (let i = 0; i < player.length ; i++){
            this.playerIndex.push(player[i].id);
        } 
        this.countAlive = player.length;
        this.grave = new Array();
        this.turnID = player[0].id;
        this.turnChara = firstChara;
        this.turn = 0;
    }

    totalPlayer(){
        return this.player.length;
    }

    totalAlive(){
        return this.countAlive;
    }

    totalDeath(){
        return this.grave.length;
    }

    playerDie(){
        let index = this.playerIndex.indexOf(this.turnID);
        if (index != -1) {
            this.player[index].life = 0;
            this.countAlive--;
            this.grave.push(this.player[index].id);
            const died = this.changeTurn();
            return died;
        }else{
            return "Player not found";
        }
    }

    graveyard(){
        return this.grave;
    }

    answer(ans){
        const vocalREGEXP = /[aiueo].$/;
        let nextChara;
        let len = ans.length;
        console.log(ans);
        let lastChar = ans.charAt(len-1).toLowerCase();
        if (vocalREGEXP.test(ans) || lastChar == ans.charAt(len-2)) {
            nextChara = ans.slice(-1);
        }else{
            nextChara = ans.slice(-2);
        }
        return this.changeTurn(nextChara.trim());
    }

    changeTurn(nextChara = null){
        if (nextChara) {
            this.turnChara = nextChara;            
        }
        this.turn++;
        let index = this.playerIndex.indexOf(this.turnID);
        let changed = true;

        while (changed) {
            if (index == this.playerIndex.length - 1) {
                console.log("index jadi enol");
                index = 0;
            }else{
                console.log("index nambah");
                index++;
            }
            if (this.player[index].life != 0) {
                changed = false;
            }
        }

        this.turnID = this.player[index].id;

        if (this.countAlive == 1) {
            return false;
        }
        
        return true;
    }

    thisTurnID(){
        return this.turnID;
    }

    thisTurnChara(){
        return this.turnChara.toUpperCase();
    }

    turnCount(){
        return this.turn;
    }
}

module.exports = ShiriGame;