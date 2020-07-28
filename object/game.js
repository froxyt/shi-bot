class Game {
    constructor(player){
        this.player = player;
        this.alivePlayer = player;
        this.countAlive = player.length;
    }

    totalPlayer(){
        return this.player.length;
    }

    totalAlive(){
        return this.countAlive;
    }

    totalDeath(){
        return this.player.length - this.alive;
    }

    playerDie(player){
        let index = array.indexOf(player);
        if (index != -1) {
            this.alivePlayer.splice(array.indexOf(player));
            this.countAlive--;
            this.grave.push(player);
            return `<@${player}> have been slayed`;
        }else{
            return "Player not found";
        }
    }

    graveyard(){
        return this.grave;
    }

    alive(){
        return this.alivePlayer;
    }
}