function Bonus(point, angle, type) {
    this.position = point;
    this.angle = 0;
    this.size = new Point(40,40);
    this.center = new Point(this.size.x/2,this.size.y/2);
    this.type = type;
    this.state = "regular";
    this.state_timer = 0;
    this.shields = 10;
    this.health = 1;
    var direction = Math.floor(Math.random() * 2);

    bonus_array.push(this);

    this.polyCords = new Array();
    this.polyCords[0] = new Point(0,13);
    this.polyCords[1] = new Point(40,13);
    this.polyCords[2] = new Point(7,40);
    this.polyCords[3] = new Point(20,0);
    this.polyCords[4] = new Point(33,40);
    this.polyCords[5] = new Point(0,13);

    for (var i=0;i<this.polyCords.length;i++) {
        this.polyCords[i]=new Point(this.polyCords[i].x+this.position.x, this.polyCords[i].y+this.position.y);
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
                if(this.type == 0){ctx.strokeStyle = "rgb(103, 0, 222)";}
                if(this.type == 1){ctx.strokeStyle = "rgb(222, 0, 103)";}
                ctx.fillStyle = "rgb(222, 0, 103)";
                ctx.stroke();
                ctx.fill();
                break;
            }
            case "picture": {
                ctx.save();

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
        if (this.position.x<-40) {
            this.damaged(0)
        } else {
            var ang = this.angle+0.01;
            this.locate(new Point(this.position.x-1, this.position.y),ang);
        }
    }

    this.damaged = function(dmg) {
        bonus_array.splice(bonus_array.indexOf(this),1);
    }
}
