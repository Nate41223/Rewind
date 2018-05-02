function Player() {
    this.sprite = null;
    this.x = game.width()/2;
    this.y = game.height()/2;
    this.width = 50;
    this.height = 50;
    this.vx = 0;
    this.vy = 0;
    this.vxMax = 10;
    this.vxScaler = 2;
    this.gravity = .3;
    this.isGrounded = false;
    
    this.init = function() {
        this.sprite = new PIXI.Sprite.fromImage("imgs/Player.png");
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.anchor.set(.5);
        this.sprite.scale.set(5);
        this.sprite.width = this.width;
        this.sprite.height = this.height;
        game.stage().addChild(this.sprite);
    };
    this.update = function(dt, dts) {
        var moveH = 0;
        if(keys.a.isDown == true) moveH--;
        if(keys.d.isDown == true) moveH++;
        if(keys.space.isDown == true); //TODO: he can jump!!!
        
        this.vx += moveH*this.vxScaler*dt;
        this.vy += this.gravity*dt;
        
        if(this.vx > this.vxMax) this.vx = this.vxMax;
        if(this.vx <- this.vxMax) this.vx =- this.vxMax;
        
        if(this.vx != 0 && moveH == 0) {
            if(this.vx > 0) {
                this.vx -= this.vxScaler*dt;
                if(this.vx < 0) this.vx = 0;
            }
            if(this.vx < 0) {
                this.vx += this.vxScaler*dt;
                if(this.vx > 0) this.vx = 0;
            }
        };
        game.checkPlayerCollision();
        
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    };
}