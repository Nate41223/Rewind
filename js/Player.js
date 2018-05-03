function Player(name, gridx, gridy) {
    this.sprite = null;
    this.x = gridx * 50 + 50/2;
    this.y = gridy * 50 + 50/2;
    this.startX = game.width()/2;
    this.startY = game.height()/2;
    this.width = 50; // 50px
    this.height = 18; // 18px
    this.vx = 0;
    this.vy = 0;
    this.vMax = 8;
    this.vScaler = .3;
    this.speed = 2;
    this.deadFrame = 0;
    this.isGrounded = false;
    this.state = "idle";
    const STATE_IDLE = "idle";
    const STATE_WALK = "walk";
    const STATE_DEAD = "dead";
    const STATE_WINN = "winn";
    
    this.init = function() {
        this.sprite = new PIXI.Sprite.fromImage("imgs/Dog.png");
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.anchor.set(.5);
        this.sprite.width = this.width;
        this.sprite.height = this.height;
    };
    this.update = function(dt, dts) {
        
        switch (this.state) {
                case "idle":
                    
                    this.decayPlayerSpeedX(dt);
                    this.decayPlayerSpeedY(dt);
                
                    if(keys.a.isDown || keys.d.isDown || keys.w.isDown || keys.s.isDown) this.state = STATE_WALK;
                    this.applyMovement(dt);
                    this.checkPlayerCollision(dt);
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
                
                    if(!keys.a.isDown && !keys.d.isDown && !keys.w.isDown && !keys.s.isDown) this.state = STATE_IDLE;
                    if(!keys.a.isDown && !keys.d.isDown) this.decayPlayerSpeedX(dt);
                    if(!keys.w.isDown && !keys.s.isDown) this.decayPlayerSpeedY(dt);
                    this.applyMovement(dt);
                    this.checkPlayerCollision(dt);
                    break;
                case "dead":
                    if(this.deadFrame >= 0) {
                        var i = game.playerStates[this.deadFrame];
                        this.x = i.x;
                        this.y = i.y;
                        this.sprite.x = this.x;
                        this.sprite.y = this.y;
                        console.log(i);
                        this.deadFrame--;
                    } else {
                        this.state = STATE_IDLE;
                        game.playerStates = [];
                    };
                    //this.state = STATE_IDLE;
                    break;
                case "winn":
                    var winText = new PIXI.Text("You WIN!!");
                    winText.anchor.set(.5);
                    winText.x = game.width()/2;
                    winText.y = game.height()/2;
                    game.stage().addChild(winText);
                    break;
        };
    };
    this.checkPlayerCollision = function(dt) {
        for(var i = game.wall.length - 1; i >= 0; i--) {
            var cr = game.isColliding(this.sprite,game.wall[i].sprite);
            if(cr.isColliding == true) {
                this.handleFloorCollision(cr);
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
                this.deadFrame = game.playerStates.length - 1;
            };
        };
        for(var i = game.cake.length - 1; i >= 0; i--) {
            var cr = game.isColliding(this.sprite,game.cake[i].sprite);
            if(cr.isColliding == true) {
                this.state = STATE_WINN;
                this.x = this.startX;
                this.y = this.startY;
                this.vx = 0;
                this.vy = 0;
            };
        };
    };
    this.handleFloorCollision = function(cr) {
        var potentialY = 0;
        var potentialX = 0;
        if(cr.aBounds.y <= cr.bBounds.y && cr.aBounds.y + cr.aBounds.height >= cr.bBounds.y) potentialY = cr.bBounds.y - cr.aBounds.height/2; //above
        if(cr.aBounds.y >= cr.bBounds.y && cr.aBounds.y <= cr.bBounds.y + cr.bBounds.height) potentialY = cr.bBounds.y + cr.bBounds.height + cr.aBounds.height/2; //below
        if(cr.aBounds.x <= cr.bBounds.x && cr.aBounds.x + cr.aBounds.width >= cr.bBounds.x) potentialX = cr.bBounds.x - cr.aBounds.width/2; //left
        if(cr.aBounds.x >= cr.bBounds.x && cr.aBounds.x <= cr.bBounds.x + cr.bBounds.width) potentialX = cr.bBounds.x + cr.bBounds.width + cr.aBounds.width/2;//right
        
        var distY = Math.abs(potentialY - this.y);
        var distX = Math.abs(potentialX - this.x);
        if (distX < distY) this.x = potentialX;
        else if (distX > distY) this.y = potentialY;
        //this.y -= this.vy * dt;
        //this.x -= this.vx * dt;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    };
    this.applyMovement = function(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        this.sprite.x = this.x;
        this.sprite.y = this.y;
    };
    this.decayPlayerSpeedX = function(dt) {
        if(this.vx > 0) {
            this.vx -= this.vScaler*dt;
            if(this.vx < 0) this.vx = 0;
        }
        if(this.vx < 0) {
            this.vx += this.vScaler*dt;
            if(this.vx > 0) this.vx = 0;
        }
    };
    this.decayPlayerSpeedY = function(dt) {
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