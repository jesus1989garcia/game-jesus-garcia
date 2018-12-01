function Star(ctx){
    this.ctx = ctx;
    
    this.x = this.ctx.canvas.width; //here it is
    this.y = this.ctx.canvas.height -100;
    this.y0 = this.y;  // careful with the y0 before the var y declaration

    this.w = 30;
    this.h = 30;

    this.vx = -0.5;
    this.vy = 0;
    

    this.img = new Image();
    this.img.src = "./assets/imgs/Star.png";
    
    this.img.frames = 6;
    this.img.frameIndex = 0;
    this.frameCounter = 0;
};






Star.prototype.draw = function() {
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

Star.prototype.animate = function() {
    if (++this.frameCounter % 8 ===0 ) {
        this.frameCounter = 0;
        if (this.img.frameIndex === this.img.frames -1){
            this.img.frameIndex = 0;
        } else {
            this.img.frameIndex ++;
        }
    }
};

Star.prototype.move = function() {
    this.animate();

    this.x += this.vx;
    this.vy += 0.5;
    this.y += this.vy;
  
    if (this.y >= this.y0){
        this.y = this.y0;
        this.vy = 0;
      }
      
      
};
Star.prototype.dissapear = function() {
    //this.
 
var index = array.indexOf(item);
if (index > -1) {
  array.splice(index, 1);
}
}