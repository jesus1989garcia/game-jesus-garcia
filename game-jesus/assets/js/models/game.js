function Game( canvas ) {
    this.ctx = canvas.getContext("2d");

    this.intervalId = undefined;
    this.bg = new Background(this.ctx);
    this.character = new Character(this.ctx);
    this.setListener();

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

Game.prototype.drawAll = function( element ) {
    this.bg.draw();
    this.character.draw();
};

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};

Game.prototype.moveAll = function( element) {
    this.bg.move();
    this.character.move();
};
