class Game {
    constructor(player){
        this.player = player;
        this.alive = player.length;
    }

    totalPlayer(){
        return this.player.length;
    }

    totalAlive(){
        return this.alive;
    }

    totalDeath(){
        return this.player.length - this.alive;
    }

    playerDie(user){
        this.alive--;
        this.grave.push(user);
    }

    graveyard(){
        return this.grave;
    }
}