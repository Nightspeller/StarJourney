/*function Asteroid(x,y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.cx = this.x+30;
    this.cy = this.y+30;
    var tops = new Array();
    for (var i=0;i<16;i++) {
        tops[i] = Math.floor(Math.random() * 20);
    }
    this.tops = new Array();
    this.tops[0]= this.x+tops[0];
    this.tops[1]= this.y+tops[1];
    this.tops[2]= this.x+20+tops[2];
    this.tops[3]= this.y+tops[3];
    this.tops[4]= this.x+40+tops[4];
    this.tops[5]= this.y+tops[5];
    this.tops[6]= this.x+40+tops[6];
    this.tops[7]= this.y+20+tops[7];
    this.tops[8]= this.x+40+tops[8];
    this.tops[9]= this.y+40+tops[8];
    this.tops[10]= this.x+20+tops[10];
    this.tops[11]= this.y+40+tops[11];
    this.tops[12]= this.x+tops[12];
    this.tops[13]= this.y+40+tops[13];
    this.tops[14]= this.x+tops[14];
    this.tops[15]= this.y+20+tops[15];

    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(this.tops[0],this.tops[1]);
        ctx.lineTo(this.tops[2],this.tops[3]);
        ctx.lineTo(this.tops[4],this.tops[5]);
        ctx.lineTo(this.tops[6],this.tops[7]);
        ctx.lineTo(this.tops[8],this.tops[9]);
        ctx.lineTo(this.tops[10],this.tops[11]);
        ctx.lineTo(this.tops[12],this.tops[13]);
        ctx.lineTo(this.tops[14],this.tops[15]);
        ctx.lineTo(this.tops[0],this.tops[1]);
        ctx.closePath();
        ctx.strokeStyle = "rgb(222, 103, 0)";
        ctx.stroke();
    }
    this.move = function(x,y) {
        this.x = x;
        this.y = y;
        var dcx = (this.x+30)-this.cx;
        var dcy = (this.y+30)-this.cy;
        this.cx = this.x+30;
        this.cy = this.y+30;
        for (var i=0;i<16;i+=2) {
            this.tops[i]+=dcx;
            this.tops[i+1]+=dcy;
        }
     }
    this.rotate = function() {
        var ang = 0.01;
        var sin = Math.sin(ang);
        var cos = Math.cos(ang);
        for (var i=0;i<16;i+=2) {
            this.tops[i] = this.tops[i]-this.cx;
            this.tops[i+1] = this.tops[i+1]-this.cy;

            var hx = this.tops[i]*cos-this.tops[i+1]*sin;
            this.tops[i+1] = this.tops[i]*sin+this.tops[i+1]*cos;
            this.tops[i] = hx;

            this.tops[i] = this.tops[i]+this.cx;
            this.tops[i+1] = this.tops[i+1]+this.cy;
        }
    }
  //  asteroid_array.push(this);
}*/
function Asteroid(point, angle, type) {

    this.position = point;
    this.angle = angle;
    this.size = new Point(70,56);
    this.center = new Point(this.size.x/2,this.size.y/2);
    this.type = type;
    this.state = "regular";
    this.state_timer = 0;
    this.shields = 0;
    this.health = 30;

    asteroid_array.push(this);

    this.polyCords = new Array();
    this.polyCords[0] = new Point(0,0);
    this.polyCords[1] = new Point(70,0)
    this.polyCords[2] = new Point(35,56);
    this.polyCords[3] = new Point(0,0);

    for (var i=0;i<this.polyCords.length;i++) {
        this.polyCords[i]=new Point(this.polyCords[i].x+this.position.x, this.polyCords[i].y+this.position.y);
    }


    this.draw = function() {
        switch (this.state) {
            case "regular": {
                ctx.translate(this.position.x+this.center.x, this.position.y+this.center.y);
                ctx.rotate(this.angle);
                var img=document.getElementById('asteroid');
                ctx.drawImage(img,-this.size.x/2,-this.size.y/2);
                ctx.rotate(-this.angle);
                ctx.translate(-this.position.x-this.center.x, -this.position.y-this.center.y);
                break;
            }
            case "dead": {
                var img=document.getElementById('bang');
                ctx.drawImage(img,this.position.x,this.position.y);
                break;
            }
        }
    }
    this.locate = function(point, angle){
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
    }

    this.fire = function() {

    }
    this.ai = function() {

        var ang = this.angle - 0.01;
        if (this.position.x<-60) {
            asteroid_array.splice(asteroid_array.indexOf(this),1);
        } else {
            this.locate(new Point(this.position.x-2, this.position.y),ang);
        }

        if (this.state_timer<=0){
            if (this.state == "dead")
            {
                asteroid_array.splice(asteroid_array.indexOf(this),1);
            } else {
                this.state = "regular"
            }
        } else {
            this.state_timer--;
        }
    }

    this.damaged = function(dmg) {
        if (this.health < dmg) {
            this.state = "dead";
            this.state_timer = 16;
        } else {
            this.health-=dmg;
        }
    }
}