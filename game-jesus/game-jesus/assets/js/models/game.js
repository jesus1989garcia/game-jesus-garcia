function Game( canvas ) {
    this.ctx = canvas.getContext("2d");

    this.intervalId = undefined;
    this.bg = new Background(this.ctx);
    this.character = new Character(this.ctx);
    this.setListener();

    
    this.enemies = [];
    //this.addEnemy();

    this.drawCount = 0;


}
    Game.prototype.setListener = function(){
        document.addEventListener("keydown", this.character.onKeyDown.bind(this.character));
        document.addEventListener("keyup", this.character.onKeyUp.bind(this.character));
}

Game.prototype.start = function() {
this.intervalId = setInterval(function() {
    this.clear();
    this.drawAll();
    this.moveAll();
    if (this.isHit()){
        alert("hit");
    }

}.bind(this),1000/60);
};

Game.prototype.isHit = function() {
    return this.enemies.some(function(enem){
        return this.character.collision(enem);
    }.bind(this));
    
}
Game.prototype.addEnemy = function() {
    var singleEnemy = new Enemy( this.ctx);
    this.enemies.push(singleEnemy);
}

Game.prototype.drawAll = function( element ) {
    this.bg.draw();
    this.character.draw();
    this.enemies.forEach(function(enem){
        enem.draw();
    })
    this.drawCount++;
    var enemyWave = Math.floor(Math.random()*1000 + 300);

    if (this.drawCount % enemyWave ===0 ){
        this.addEnemy();
        this.drawCount = 0;
        console.log(this.enemies.length)
        console.log(this.drawCount)
    }
    this.enemies = this.enemies.filter( function(enem){
        return enem.x > 0;
    })
};

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};

Game.prototype.moveAll = function( element) {
    this.bg.move();
    this.character.move();
    this.enemies.forEach( function(enem){
        enem.move();
});
}


