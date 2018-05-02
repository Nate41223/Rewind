function Game() {
    this.player = null;
    this.floor = [];
    this.level = null;
    
    const pixi = new PIXI.Application({width:1000,height:600,backgroundColor:0x82b1ff});
    document.body.append(pixi.view);
    
    // returns the stage the game is running in
    this.stage = ()=> {
        return pixi.stage;
    };
    
    // returns the game window's width value
    this.width = ()=> {
        return pixi.screen.width;
    };
    
    // returns the game window's height value
    this.height = ()=> {
        return pixi.screen.height;
    };
    
    // constructor
    this.init = function() {
        keyboard.init();
        this.player = new Player();
        this.player.init();
        
        this.level = levels.level0;
        console.log(this.level.grid);
        console.log(this.level.grid.length);
        for (var i = this.level.grid.length - 1; i >= 0; i--) {
            for (var e = this.level.grid[i].length - 1; e >= 0; e--) {
                for (var a = this.level.grid[i][e].length - 1; a >= 0; a--) {
                    
                    console.log(this.level.grid[i][e].charAt(a))
                    if (this.level.grid[i][e].charAt(a) != ".") {
                        var floor = new Floor(this.level.grid[i][e].charAt(a), a, i);
                        floor.init();
                        this.floor.push(floor);
                    };
                }
                console.log(this.level.grid[i][e].charAt(1));
                console.log(this.level.grid[i][e].length);
            }
            console.log(this.level.grid[i]);
        };
        /*
        var floor = new Floor(600, 20, this.width()/2, this.height()/3*2);
        floor.init();
        this.floor.push(floor);
        */
    };
    
    // Game loop
    pixi.ticker.add((dt)=> {
        
        this.player.update(dt, this.getS());
        
    });
    
    // returns delta time in seconds
    this.getS = ()=> {
        return pixi.ticker.elapsedMS/1000;
    };
    
    // this function needs the objects sprite reference, not the object itself
    this.isColliding = function(a,b) {
        var ab = a.getBounds();
        var bb = b.getBounds();
        return {isColliding:ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height,aBounds:ab,bBounds:bb};
    };
    this.checkPlayerCollision = function() {
        for(var i = this.floor.length - 1; i >= 0; i--) {
            var cr = this.isColliding(this.player.sprite,this.floor[i].sprite);
            if(cr.isColliding == true) {
                //console.log(this.isColliding(this.player.sprite,this.floor[0].sprite));
                this.player.isGrounded = true;
                this.player.vy = 0;
            };
        };
    };
}
const game = new Game();
game.init();