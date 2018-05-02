const keys = {
    w:{keyCode:87,isDown:false},
    a:{keyCode:65,isDown:false},
    s:{keyCode:83,isDown:false},
    d:{keyCode:68,isDown:false},
    space:{keyCode:32,isDown:false},
};

const keyboard = {
    keyDown: function(e) {
        if(e.keyCode == keys.w.keyCode) keys.w.isDown = true;
        if(e.keyCode == keys.a.keyCode) keys.a.isDown = true;
        if(e.keyCode == keys.s.keyCode) keys.s.isDown = true;
        if(e.keyCode == keys.d.keyCode) keys.d.isDown = true;
        if(e.keyCode == keys.space.keyCode) keys.space.isDown = true;
    },
    keyUp: function(e) {
        if(e.keyCode == keys.w.keyCode) keys.w.isDown = false;
        if(e.keyCode == keys.a.keyCode) keys.a.isDown = false;
        if(e.keyCode == keys.s.keyCode) keys.s.isDown = false;
        if(e.keyCode == keys.d.keyCode) keys.d.isDown = false;
        if(e.keyCode == keys.space.keyCode) keys.space.isDown = false;
    },
    init: function() {
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);
        document.body.addEventListener("keydown", this.keyDown);
        document.body.addEventListener("keyup", this.keyUp);
    },
};