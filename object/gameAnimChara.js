class GameAnimChara extends Game {
    constructor(player, firstID, firstChara){
        super(player);
        this.turnID = firstID;
        this.turnChara = firstChara;
    }

    answer(character){
        this.bannedCharacter.push(character);
    }

    changeTurn(nextID, nextChara){
        this.turnID = nextID;
        this.turnChara = nextChara;
    }

    thisTurnID(){
        return this.turnID;
    }

    thisTurnChara(){
        return this.turnChara;
    }

    banned(){
        return this.bannedCharacter;
    }
}