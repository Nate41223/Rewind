function Bullet(tx, ty)) {
    this.sprite = null;
    this.width = 15;
    this.height = 15;
    this.accel = .5;
    this.velX = 0;
    this.velY = 0;
    this.isDead = false;
    this.x = tx;
    this.y = ty;

    this.init = function () {
        this.sprite = new PIXI.Sprite.fromImage("imgs/bullet.png");
        this.sprite.height = this.height;
        this.sprite.width = this.width;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.anchor.set(.5);
        game.stage().addChild(this.sprite);
    };

    this.update = function (px, py) {
        this.x += this.velX;
        this.y += this.velY;

        if (px < this.x) this.velX -= this.accel;
        if (px > this.x) this.velX += this.accel;
        if (py < this.y) this.velY -= this.accel;
        if (pv > this.y) this.velY -= this.accel;
    };
}
