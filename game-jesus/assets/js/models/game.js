function Game( canvas ) {
    this.ctx = canvas.getContext("2d");

    this.intervalId = undefined;
    this.bg = new Background(this.ctx);
    this.character = new Character(this.ctx);
    this.setListener();

    
    this.enemy = [];
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

}.bind(this),1000/60);
};


Game.prototype.addEnemy = function() {
    var singleEnemy = new Enemy( this.ctx);
    this.enemy.push(singleEnemy);
}

Game.prototype.drawAll = function( element ) {
    this.bg.draw();
    this.character.draw();
    this.enemy.forEach(function(enem){
        enem.draw();
    })
    this.drawCount++;

    if (this.drawCount % 100 ===0 ){
        this.addEnemy();
        this.drawCount = 0;
        console.log(this.enemy.length)
        console.log(this.drawCount)
    }
    this.enemy = this.enemy.filter( function(enem){
        return enem.x > 0;
    })
};

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};

Game.prototype.moveAll = function( element) {
    this.bg.move();
    this.character.move();
    this.enemy.forEach( function(enem){
        enem.move();
});
}
