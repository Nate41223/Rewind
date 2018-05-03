function Game() {
    this.player = null;
    this.floor = [];
    this.wall = [];
    this.death = [];
    this.cake = [];
    this.turrets = [];
    this.playerStates = [];
    this.playerStateMax = 150;
    this.level = null;
    this.timerMinutes = 0;
    this.timerSeconds = 0;
    this.timerMilliSeconds = 0;
    
    const pixi = new PIXI.Application({width:1000,height:600,backgroundColor:0x82b1ff});
    document.body.append(pixi.view);
    
    this.timerText = new PIXI.Text(this.timerMinutes + ":" + this.timerSeconds + ":" + this.timerMilliSeconds, {fontFamily: 'Arial', fontSize: 24,
                                                                                                               fill: 0xffffff, align: 'right'});
    
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
        
        if(this.level == null){
            var lvlString = "level" + Math.round(Math.random() * (Object.keys(levels).length - 1) + 1);
            this.level = levels[lvlString];
        };
        
        for (var i = this.level.grid.length - 1; i >= 0; i--) {
            for (var e = this.level.grid[i].length - 1; e >= 0; e--) {
                for (var a = this.level.grid[i][e].length - 1; a >= 0; a--) {
                    if (this.level.grid[i][e].charAt(a) == "." || this.level.grid[i][e].charAt(a) == "@" || this.level.grid[i][e].charAt(a) == "!" || this.level.grid[i][e].charAt(a) == "#" || this.level.grid[i][e].charAt(a) == "$") {
                        var floor = new Floor(this.level.grid[i][e].charAt(a), a, i);
                        floor.init();
                        this.floor.push(floor);
                    };
                    if (this.level.grid[i][e].charAt(a) == "*") {
                        var wall = new Wall(this.level.grid[i][e].charAt(a), a, i);
                        wall.init();
                        this.wall.push(wall);
                    };
                    if (this.level.grid[i][e].charAt(a) == "@") {
                        var death = new Death(this.level.grid[i][e].charAt(a), a, i);
                        death.init();
                        this.death.push(death);
                    };
                    if (this.level.grid[i][e].charAt(a) == "!") {
                        var cake = new Cake(this.level.grid[i][e].charAt(a), a, i);
                        cake.init();
                        this.cake.push(cake);
                    };
                    if (this.level.grid[i][e].charAt(a) == "$") {
                        this.player = new Player(this.level.grid[i][e].charAt(a), a, i);
                        this.player.init();
                    };
                    if (this.level.grid[i][e].charAt(a) == "#") {
                        var turret = new Turret(this.level.grid[i][e].charAt(a), a, i);
                        turret.init();
                        this.turrets.push(turret)
                    };
                };
            };
        };
        this.stage().addChild(this.player.sprite);
        this.stage().addChild(this.timerText);
        this.timerText.x = 0;
        this.timerText.y = 0;
        /*
        var floor = new Floor(600, 20, this.width()/2, this.height()/3*2);
        floor.init();
        this.floor.push(floor);
        */
    };
    
    // Game loop
    pixi.ticker.add((dt)=> {
        this.player.update(dt, this.getS());
        for (var t = this.turrets.length - 1; t >= 0; t-- ){
            this.turrets[t].update(this.player.x, this.player.y);
        }
        if( this.player.state != "dead") {
            if(this.playerStates.length >= this.playerStateMax) {
                this.playerStates.splice(0, 1);
                this.playerStates.push({x:this.player.x,y:this.player.y,r:this.player.MoveRotation});
            } else {
                this.playerStates.push({x:this.player.x,y:this.player.y,r:this.player.MoveRotation});
            }
        }
        this.timerUpdate(pixi.ticker.elapsedMS);
        console.log(this.timerText.text);
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
    this.timerUpdate = (time)=>{
        if(this.player.state == "dead"){
            this.timerMilliSeconds -= time;
            if(this.timerMilliSeconds <= 0){
                this.timerSeconds -= 1;
                this.timerMilliSeconds += 1000;
            }
            if(this.timerSeconds <= 0){
                this.timerMinutes -= 1;
                this.timerSeconds += 60;
            }
        } else {
            this.timerMilliSeconds += time;
            if(this.timerMilliSeconds >= 1000){
                this.timerSeconds += 1;
                this.timerMilliSeconds -= 1000;
            }
            if(this.timerSeconds >= 60){
                this.timerMinutes += 1;
                this.timerSeconds -= 60;
            }
        }
        this.timerText.text = this.timerMinutes + ":" + this.timerSeconds + ":" + Math.floor(this.timerMilliSeconds); 
        
    };
}
const game = new Game();
game.init();