function Player() {
    this.sprite = null;
    this.x = game.width()/2;
    this.y = game.height()/2;
    this.startX = game.width()/2;
    this.startY = game.height()/2;
    this.width = 50;
    this.height = 50;
    this.vx = 0;
    this.vy = 0;
    this.vxMax = 10;
    this.vxScaler = 2;
    this.gravity = .5;
    this.jump = 10;
    this.isGrounded = false;
    this.state = "jump";
    const STATE_IDLE = "idle";
    const STATE_WALK = "walk";
    const STATE_JUMP = "jump";
    const STATE_DEAD = "dead";
    
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
        switch (this.state) {
                case "idle":
                    if(this.vx > 0) {
                        this.vx -= this.vxScaler*dt;
                        if(this.vx < 0) this.vx = 0;
                    }
                    if(this.vx < 0) {
                        this.vx += this.vxScaler*dt;
                        if(this.vx > 0) this.vx = 0;
                    }
                
                    if(keys.a.isDown || keys.d.isDown) this.state = STATE_WALK;
                    if(keys.space.isDown) {
                        this.state = STATE_JUMP;
                        this.vy -= this.jump * dt;
                    };
                    break;
                case "walk":
                    var moveH = 0;
                    if(keys.a.isDown) moveH--;
                    if(keys.d.isDown) moveH++;
                
                    this.vx += moveH*1*dt;
                
                    if(this.vx > this.vxMax) this.vx = this.vxMax;
                    if(this.vx <- this.vxMax) this.vx =- this.vxMax;
                
                    if(!keys.a.isDown && !keys.d.isDown) this.state = STATE_IDLE;
                    if(keys.space.isDown) {
                        this.state = STATE_JUMP;
                        this.vy -= this.jump * dt;
                    };
                    break;
                case "jump":
                    this.vy += this.gravity*dt;
                    this.checkPlayerCollision();
                    break;
                case "dead":
                    this.state = STATE_JUMP;
                    break;
        };
        
        console.log(this.state);
        
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    };
    this.checkPlayerCollision = function() {
        for(var i = game.floor.length - 1; i >= 0; i--) {
            var cr = game.isColliding(this.sprite,game.floor[i].sprite);
            if(cr.isColliding == true) {
                this.state = STATE_IDLE;
                this.vy = 0;
            };
        };
        for(var i = game.death.length - 1; i >= 0; i--) {
            var cr = game.isColliding(this.sprite,game.death[i].sprite);
            if(cr.isColliding == true) {
                this.state = STATE_DEAD;
                this.x = this.startX;
                this.y = this.startY;
                this.vx = 0;
                this.vy = 0;
            };
        }; 
    };
}