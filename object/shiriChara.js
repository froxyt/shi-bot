import { Game } from "./shiriGame";

class GameAnimChara extends Game {
    constructor(player, firstChara){
        super(player,firstChara);
        this.bannedCharacter = new Array();
    }

    answer(character, nextID, nextChara){
        this.bannedCharacter.push(character);
        this.changeTurn(nextID, nextChara);
    }

    changeTurn(nextID, nextChara){
        this.turn++; 
        this.turnID = player;
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

    banned(){
        return this.bannedCharacter;
    }
}

export default GameAnimChara;