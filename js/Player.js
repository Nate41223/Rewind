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
    this.vMax = 10;
    this.vScaler = 5;
    this.speed = 2;
    this.isGrounded = false;
    this.state = "idle";
    const STATE_IDLE = "idle";
    const STATE_WALK = "walk";
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
                    
                    this.decayPlayerSpeed(dt);
                
                    if(keys.a.isDown || keys.d.isDown || keys.w.isDown || keys.s.isDown) this.state = STATE_WALK;
                    this.applyMovement(dt);
                    break;
                case "walk":
                    var moveH = 0;
                    var moveV = 0;
                    if(keys.a.isDown) moveH--;
                    if(keys.d.isDown) moveH++;
                    if(keys.w.isDown) moveV--;
                    if(keys.s.isDown) moveV++;
                
                    this.vx += moveH*this.speed*dt;
                    this.vy += moveV*this.speed*dt;
                
                    if(this.vx > this.vMax) this.vx = this.vMax;
                    if(this.vx <- this.vMax) this.vx =- this.vMax;
                    if(this.vy > this.vMax) this.vy = this.vMax;
                    if(this.vy <- this.vMax) this.vy =- this.vMax;
                    console.log(this.vy);
                
                    if(!keys.a.isDown && !keys.d.isDown && !keys.w.isDown && !keys.s.isDown) this.state = STATE_IDLE;
                    this.applyMovement(dt);
                    break;
                case "dead":
                    this.state = STATE_JUMP;
                    break;
        };
        
        console.log(this.state);
    };
    this.checkPlayerCollision = function(dt) {
        for(var i = game.floor.length - 1; i >= 0; i--) {
            var cr = game.isColliding(this.sprite,game.floor[i].sprite);
            if(cr.isColliding == true) {
                this.state = STATE_IDLE;
                this.revertMovement(dt);
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
    this.applyMovement = function(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    };
    this.decayPlayerSpeed = function(dt) {
        if(this.vx > 0) {
            this.vx -= this.vScaler*dt;
            if(this.vx < 0) this.vx = 0;
        }
        if(this.vx < 0) {
            this.vx += this.vScaler*dt;
            if(this.vx > 0) this.vx = 0;
        }
        if(this.vy > 0) {
            this.vy -= this.vScaler*dt;
            if(this.vy < 0) this.vy = 0;
        }
        if(this.vy < 0) {
            this.vy += this.vScaler*dt;
            if(this.vy > 0) this.vy = 0;
        }
    };
}