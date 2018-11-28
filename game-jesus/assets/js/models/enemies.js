function Enemy(ctx){
    this.ctx = ctx;
    
    this.x = this.ctx.canvas.width;
    this.y = this.ctx.canvas.height -100;
    this.y0 = this.y;  // careful with the y0 before the var y declaration

    this.w = 50;
    this.h = 70;

    this.vx = -1;
    this.vy = 0;
    

    this.img = new Image();
    this.img.src = "./assets/imgs/bomb_anim.png";
    
    this.img.frames = 2;
    this.img.frameIndex = 0;
    this.frameCounter = 0;
};






Enemy.prototype.draw = function() {
    this.ctx.drawImage(
        this.img,
        this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
        0,
        this.img.width / this.img.frames,
        this.img.height/8,
        this.x,
        this.y,
        this.w,
        this.h);
        
        this.animate();
    
};

Enemy.prototype.animate = function() {
    if (++this.frameCounter % 8 ===0 ) {
        this.frameCounter = 0;
        if (this.img.frameIndex === this.img.frames -1){
            this.img.frameIndex = 0;
        } else {
            this.img.frameIndex ++;
        }
    }
};

Enemy.prototype.move = function() {
    this.animate();

    this.x += this.vx;
    this.vy += 0.5;
    this.y += this.vy;
  
    if (this.y >= this.y0){
        this.y = this.y0;
        this.vy = 0;
      }
      
      
};
