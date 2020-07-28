class Game {
    constructor(player,firstChara){
        this.player = player;
        this.playerIndex = new Array();
        for (let i = 0; i < player.length ; i++){
            playerIndex.push(player[i].id);
        } 
        this.countAlive = player.length;
        this.grave = new Array();
        this.turnID = player[0];
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
        let index = playerIndex.indexOf(this.turnID);
        if (index != -1) {
            this.player[index].life = 0;
            this.countAlive--;
            this.grave.push(player[index].life);
            return `<@${player}> has been slayed`;
        }else{
            return "Player not found";
        }
    }

    graveyard(){
        return this.grave;
    }

    answer(ans){
        let nextChara;
        let lastChar = ans.charAt(-1).toLowerCase();
        if (lastChar != "a" || lastChar != "i" || lastChar != "u" || lastChar != "e" || lastChar != "o" || lastChar == ans.charAt(-2)) {
            nextChara = ans.slice(-1);
        }else{
            nextChara = ans.slice(-2);
        }
        this.changeTurn(nextChara);
    }

    checkAnswer(ans){
        
    }

    changeTurn(nextChara){
        this.turn++;
        let index = playerIndex.indexOf(this.turnID);
        while (player[index].life == 0) {
            if (index == playerIndex.length - 1) {
                index = 0;
            }else{
                index++;
            }
        }
        this.turnID = player[index].id;
        this.turnChara = nextChara;
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

export default Game;