function Rect(point, angle, type) {
    this.position = point;
    this.angle = angle;
    this.size = new Point(100,60);
    this.center = new Point(this.size.x/2,this.size.y/2);
    this.type = type;
    this.state = "regular";
    this.shields = 0;
    this.health = 0;
    this.polyCords = new Array();
    this.polyCords[0] = new Point(0,0);
    this.polyCords[1] = new Point(80,0);
    this.polyCords[2] = new Point(100,30);
    this.polyCords[3] = new Point(80,60);
    this.polyCords[4] = new Point(0,60);
    this.polyCords[5] = new Point(0,0);
    for (var i=0;i<this.polyCords.length;i++){
        this.polyCords[i] = new Point(this.polyCords[i].x+this.position.x, this.polyCords[i].y+this.position.y);
    }


    this.draw = function() {
        switch (this.state) {
            case "regular": {

                ctx.beginPath();
                ctx.moveTo(this.polyCords[0].x,this.polyCords[0].y);
                for (var i=0;i<this.polyCords.length;i++){
                    ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                }
                ctx.closePath();
                ctx.strokeStyle = "rgb(222, 103, 0)";
                ctx.stroke();


                break;

            }
        }
    }
    this.locate = function(point, angle){
        var new_position = point;
        var new_angle = angle-this.angle;
        var sin = Math.sin(new_angle);
        var cos = Math.cos(new_angle);
        for (var i=0;i<this.polyCords.length;i++) {
            this.polyCords[i].x = this.polyCords[i].x-this.center.x-this.position.x;
            this.polyCords[i].y = this.polyCords[i].y-this.center.y-this.position.y;

            var hx = this.polyCords[i].x*cos-this.polyCords[i].y*sin;
            this.polyCords[i].y = this.polyCords[i].x*sin+this.polyCords[i].y*cos;
            this.polyCords[i].x = hx;

            this.polyCords[i].x = this.polyCords[i].x+this.center.x+new_position.x;
            this.polyCords[i].y = this.polyCords[i].y+this.center.y+new_position.y;
        }
        this.position = point;
        this.angle = angle;
        if (this.angle>=Math.PI*2){
            this.angle-=Math.PI*2;
        } else {
            if (this.angle<-Math.PI*2){
                this.angle+=Math.PI*2;
            }
        }
    }

    this.fire = function() {

    }
    this.ai = function() {
        var ang = this.angle-0.01;
        this.locate(new Point(this.position.x,this.position.y),ang);


    }
    this.damaged = function(dmg) {

    }
}