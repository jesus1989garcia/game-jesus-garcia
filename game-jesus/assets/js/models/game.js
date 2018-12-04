function Game( canvas ) {
    this.ctx = canvas.getContext("2d");

    this.intervalId = undefined;
    this.bg = new Background(this.ctx);
    this.character = new Character(this.ctx);
    this.setListener();

    this.items = [];

    
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
    this.checkGameOver();
    if (this.isHit()){
        this.character.bounce();
        this.character.life -= 5;
        console.log("life " + this.character.life)
    }

    this.items.forEach(function(item){
      if (this.character.collision(item)) {
        item.state = "taken";
        points += 20;
      }

     }.bind(this)); 
}.bind(this),1000/60);
};

/*Game.prototype.eliminate = function() {
    this.items.forEach(function(item){
        items.slice(indexOf.item,1);
        
    })
}*/
 

Game.prototype.isHit = function() {
    return this.enemies.some(function(enem){
        return this.character.collision(enem);
    }.bind(this));

}
Game.prototype.getItem = function() {
    return this.items.some( function(item){
        return this.character.collision(item);
    }.bind(this));
}


Game.prototype.addEnemy = function() {
    var singleEnemy = new Enemy( this.ctx);
    this.enemies.push(singleEnemy);
}

Game.prototype.addItem = function() {
    var star = new Star (this.ctx);
    this.items.push(star);
}

Game.prototype.drawAll = function( element ) {
    this.bg.draw();
    this.character.draw();
    this.enemies.forEach(function(enem){
        enem.draw();
       
    })
    this.items.forEach(function(item){
        item.draw();
    });

    this.ctx.font="30px Georgia black";
    this.ctx.fillText("Points: " + points,this.ctx.canvas.width - 600 ,60);
    this.ctx.fillText("Life " + this.character.life +"%", this.ctx.canvas.width - 800, 60);
    this.drawCount++;
    var enemyWave = Math.floor(Math.random()*1000 + 300);
    var itemAppear = Math.floor(Math.random()*1000 );
    if (this.drawCount % itemAppear === 0){
        this.addItem();
        console.log(this.items.length)
    }

    if (this.drawCount % enemyWave === 0 ){
        this.addEnemy();
        this.drawCount = 0;
        console.log(this.enemies.length)
        console.log(this.drawCount)
    }
    this.enemies = this.enemies.filter( function(enem){
        return enem.x + enem.w > 0;
    });
    this.items = this.items.filter( function(star){
        return star.x + star.w > 0;
    
    });
};
Game.prototype.checkGameOver = function() {
    if (this.character.life <= 0 ) {
        alert("Game Over madafaka");
        
    }
}
Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};

Game.prototype.GameOver = function() {
    this.img = new Image();
    this.img.src = "../../imgs/"
}

Game.prototype.moveAll = function( element) {
    this.bg.move();
    this.character.move();
    this.enemies.forEach( function(enem){
        enem.move();
        
});
this.items.forEach(function(item){
    item.move();
});
}


