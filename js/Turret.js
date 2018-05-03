function Turret(name, gridx, gridy) {
    this.sprite = null;
    this.width = 50;
    this.height = 50;
    this.RX = 0;
    this.RY = 0;
    this.RXY = 0;
    this.RZ = 0;
    this.x = gridx * 50 + 50/2;
    this.y = gridy * 50 + 50/2;
    
    this.init = function() {
        this.sprite = new PIXI.Sprite.fromImage("imgs/turret.png");
        this.sprite.height = this.height;
        this.sprite.width = this.width;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.anchor.set(.5);
        game.stage().addChild(this.sprite);
    };
    
    this.update = function(px, py) {
        this.RX = px - this.x;
        this.RY = py - this.y;
        
        this.RXY = Math.atan2(this.RX, this.RY);
        
        this.RZ = -this.RXY + Math.PI;
        
        this.sprite.rotation = this.RZ;
    };
}