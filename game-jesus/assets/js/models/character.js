function Character(ctx){
    this.ctx = ctx;
    
    this.x = 50;
    this.y = this.ctx.canvas.height -100;
    this.y0 = this.y;  // careful with the y0 before the var y declaration

    this.w = 50;
    this.h = 70;

    this.vx = 0;
    this.vy = 0;
    

    this.img = new Image();
    this.img.src = "./assets/imgs/deadpool.jpg";
    
    this.img.frames = 9;
    this.img.frameIndex = 0;
    this.frameCounter = 0;
};

Character.prototype.draw = function() {
    this.ctx.drawImage(
        this.img,
        this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
        0,
        this.img.width / this.img.frames,
        this.img.height,
        this.x,
        this.y,
        this.w,
        this.h);
        
        this.animate();
    
};

Character.prototype.animate = function() {
    if (++this.frameCounter % 8 ===0 ) {
        this.frameCounter = 0;
        if (this.img.frameIndex === this.img.frames -1){
            this.img.frameIndex = 0;
        } else {
            this.img.frameIndex ++;
        }
    }
};

Character.prototype.move = function() {
    this.animate();

    this.x += this.vx;
    this.vy += 0.5;
    this.y += this.vy;
    //this.vy += this.gravity;
    console.log(this.vy);
    console.log("position" + this.y);
    if (this.y >= this.y0){
        this.y = this.y0;
        this.vy = 0;
      }
      
      
};

Character.prototype.jump = function() {

    if (!this.inAir()){
        this.vy -= 6;

    }
};
Character.prototype.inAir = function() {
    return this.y < this.y0;
};


Character.prototype.onKeyDown = function(event) {
    switch (event.keyCode) {
      case KEY_UP:
        this.jump();
        break;
      case KEY_RIGHT:
        this.vx += 2;  //o solo x
        this.x += this.vx;
        break;
      case KEY_LEFT:
        this.vx -= 2;
        break;
    }
    
   };
   Character.prototype.onKeyUp = function(event) {
   console.log(event)
    switch (event.keyCode) {
       
        case KEY_RIGHT:
          this.vx = 0;
          
          break;
        case KEY_LEFT:
          this.vx = 0;
          break;
      }
  };

