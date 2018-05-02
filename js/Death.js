function Death(name, gridx, gridy) {
    this.sprite = null;
    this.width = 50;
    this.height = 50;
    this.x = gridx * 50 + 50/2;
    this.y = gridy * 50 + 50/2;
    
    this.init = function() {
        this.sprite = new PIXI.Sprite.fromImage("imgs/Death.png");
        this.sprite.height = this.height;
        this.sprite.width = this.width;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.anchor.set(.5);
        game.stage().addChild(this.sprite);
    };
}