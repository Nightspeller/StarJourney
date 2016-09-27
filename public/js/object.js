function Object(point, angle, type) {
    this.position = point;
    this.angle = angle;
    this.size = new Point(0,0);
    this.center = new Point(this.position.x+this.size.x/2, this.position.y+this.size.y/2);
    this.type = type;
    this.state = "regular";
    this.shields = 0;
    this.health = 0;
    this.polyCords = new Array();
    this.polyCords[0] = new Point(0,0);


    this.draw = function() {
        switch (this.state) {
            case "regular": {break;}
        }
    }
    this.locate = function(point, angle){
        this.position = point;
        this.angle = angle;
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        for (var i=0;i<this.polyCords.length;i++) {
            this.polyCords[i].x = this.polyCords[i].x-this.center.x;
            this.polyCords[i].y = this.polyCords[i].y-this.center.y;

            var hx = this.polyCords[i].x*cos-this.polyCords[i].y*sin;
            this.polyCords[i].y = this.polyCords[i].x*sin+this.polyCords[i].y*cos;
            this.polyCords[i].x = hx;

            this.polyCords[i].x = this.polyCords[i].x+this.center.x;
            this.polyCords[i].y = this.polyCords[i].y+this.center.y;
        }

    }

    this.fire = function() {

    }
    this.ai = function() {

    }
    this.damaged = function(dmg) {

    }
}