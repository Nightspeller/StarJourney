function E_station(point, angle, type) {
    this.position = point;
    this.angle = 0;
    this.size = new Point(60,60);
    this.center = new Point(this.size.x/2,this.size.y/2);
    this.type = type;
    this.state = "regular";
    this.state_timer = 0;

    this.shields = 20;
    if (this.type == 1) {this.shields = 50;}
    this.health = 1;

    e_station_array.push(this);


    this.polyCords = new Array();

    this.polyCords[0] = new Point(0,45);
    this.polyCords[1] = new Point(15,60);
    this.polyCords[2] = new Point(45,60);
    this.polyCords[3] = new Point(60,45);
    this.polyCords[4] = new Point(60,15);
    this.polyCords[5] = new Point(45,0);
    this.polyCords[6] = new Point(15,0);
    this.polyCords[7] = new Point(0,15);
    this.polyCords[8] = new Point(0,45);

    this.polyCords[9] = new Point(-30,35);
    this.polyCords[10] = new Point(10,35);
    this.polyCords[11] = new Point(10,25);
    this.polyCords[12] = new Point(10,35);
    this.polyCords[13] = new Point(10,40);
    this.polyCords[14] = new Point(20,50);
    this.polyCords[15] = new Point(40,50);
    this.polyCords[16] = new Point(50,40);
    this.polyCords[17] = new Point(50,20);
    this.polyCords[18] = new Point(40,10);
    this.polyCords[19] = new Point(20,10);
    this.polyCords[20] = new Point(10,20);
    this.polyCords[21] = new Point(10,35);
    this.polyCords[22] = new Point(10,25);
    this.polyCords[23] = new Point(-30,25);
    this.polyCords[24] = new Point(-30,35);


    for (var i=0;i<this.polyCords.length;i++) {
        this.polyCords[i]=new Point(this.polyCords[i].x+this.position.x, this.polyCords[i].y+this.position.y);
    }


    this.draw = function() {
        switch (this.state) {
            case "regular": {
                if (this.type == 0){
                    var cannon_carriage_img = document.getElementById('cannon_carriage');
                }
                if (this.type == 1){
                    var cannon_carriage_img = document.getElementById('cannon_carriage_boss1');
                }
                ctx.drawImage(cannon_carriage_img,this.position.x,this.position.y, 60, 60);
                ctx.translate(this.position.x+this.center.x, this.position.y+this.center.y);
                ctx.rotate(this.angle);
                var img=document.getElementById('cannon');
                ctx.drawImage(img,-60,-18, 75, 37.5);
                ctx.rotate(-this.angle);
                ctx.translate(-this.position.x-this.center.x, -this.position.y-this.center.y);
                break;
            }
            case "shields_on": {
                if (this.type == 0){
                    var cannon_carriage_img = document.getElementById('cannon_carriage');
                }
                if (this.type == 1){
                    var cannon_carriage_img = document.getElementById('cannon_carriage_boss1');
                }
                ctx.drawImage(cannon_carriage_img,this.position.x,this.position.y, 60, 60);
                ctx.translate(this.position.x+this.center.x, this.position.y+this.center.y);
                ctx.rotate(this.angle);
                var img=document.getElementById('cannon');
                ctx.drawImage(img,-60,-18, 75, 37.5);
                ctx.rotate(-this.angle);
                ctx.translate(-this.position.x-this.center.x, -this.position.y-this.center.y);

/*                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(this.polyCords[0].x,this.polyCords[0].y);
                for (var i=0;i<9;i++){
                    ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                }
                ctx.closePath();
                ctx.fillStyle = "#800000";
                ctx.strokeStyle = "#0000ff";
                ctx.stroke();
             //   ctx.fill();
                ctx.beginPath();
                ctx.moveTo(this.polyCords[9].x,this.polyCords[9].y);
                for (var i=9;i<this.polyCords.length;i++){
                    ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                }
                ctx.closePath();
                ctx.fillStyle = "#008080";
                ctx.strokeStyle = "#0000ff";
                ctx.stroke();
               // ctx.fill();
                ctx.lineWidth = 1;*/

                break;
            }
            case "bang": {
                if (this.type == 0){
                    var cannon_carriage_img = document.getElementById('cannon_carriage');
                }
                if (this.type == 1){
                    var cannon_carriage_img = document.getElementById('cannon_carriage_boss1');
                }
                ctx.drawImage(cannon_carriage_img,this.position.x,this.position.y, 60, 60);
                ctx.translate(this.position.x+this.center.x, this.position.y+this.center.y);
                ctx.rotate(this.angle);
                var img=document.getElementById('cannon_destroyed');
                ctx.drawImage(img,-31,-17, 50, 37.5);
                ctx.rotate(-this.angle);
                ctx.translate(-this.position.x-this.center.x, -this.position.y-this.center.y);
                var img=document.getElementById('bang');
                ctx.drawImage(img,this.position.x,this.position.y, 60, 60);
                break;
            }
            case "dead": {
                if (this.type == 0){
                    var cannon_carriage_img = document.getElementById('cannon_carriage');
                }
                if (this.type == 1){
                    var cannon_carriage_img = document.getElementById('cannon_carriage_boss1_destroyed');
                }
                ctx.drawImage(cannon_carriage_img,this.position.x,this.position.y, 60, 60);
                ctx.translate(this.position.x+this.center.x, this.position.y+this.center.y);
                ctx.rotate(this.angle);
                var img=document.getElementById('cannon_destroyed');
                ctx.drawImage(img,-31,-17, 50, 37.5);
                ctx.rotate(-this.angle);
                ctx.translate(-this.position.x-this.center.x, -this.position.y-this.center.y);

                break;
            }
        }
    }
    this.locate = function(point, angle){
        var new_position = point;
        var new_angle = angle-this.angle;
        var sin = Math.sin(new_angle);
        var cos = Math.cos(new_angle);
        for (var i=0;i<9;i++) {
            this.polyCords[i].x = this.polyCords[i].x-this.position.x;
            this.polyCords[i].y = this.polyCords[i].y-this.position.y;
            this.polyCords[i].x = this.polyCords[i].x+new_position.x;
            this.polyCords[i].y = this.polyCords[i].y+new_position.y;
        }
        for (var i=9;i<this.polyCords.length;i++) {
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
        var ang = Math.atan2(resolute.position.y+resolute.size.y/2-this.polyCords[22].y, resolute.position.x+resolute.size.x/2-this.polyCords[22].x);
        new Bullet(new Point((this.polyCords[23].x+this.polyCords[24].x)/2,(this.polyCords[23].y+this.polyCords[24].y)/2), ang, 1, this)
    }
    this.ai = function() {
        if (this.position.x<-60) {
            e_station_array.splice(e_station_array.indexOf(this),1);
        } else {
            switch (this.state) {
                case "regular": {
                    var rand = Math.floor(Math.random() * 80);
                    if (rand == 0) {this.fire()}

                    var ang = Math.atan2(this.polyCords[22].y-(resolute.position.y+resolute.size.y/2), this.polyCords[22].x-(resolute.position.x+resolute.size.x/2));

                    if (this.type == 0){this.locate(new Point(this.position.x-1, this.position.y),ang);}
                    if (this.type == 1){this.locate(new Point(this.position.x, this.position.y),ang);}

                    break;
                }
                case "shields_on": {
                    if (this.state_timer<=0){
                        this.state = "regular"
                    } else {
                        this.state_timer--;
                    }
                    var rand = Math.floor(Math.random() * 80);
                    if (rand == 0) {this.fire()}

                    var ang = Math.atan2(this.polyCords[22].y-(resolute.position.y+resolute.size.y/2), this.polyCords[22].x-(resolute.position.x+resolute.size.x/2));

                    if (this.type == 0){this.locate(new Point(this.position.x-1, this.position.y),ang);}
                    if (this.type == 1){this.locate(new Point(this.position.x, this.position.y),ang);}

                    break;
                }
                case "bang": {
                    if (this.state_timer<=0){
                        this.state = "dead"
                        if (Math.floor(Math.random() * 2)==1) {new Bonus(this.position,0,1);}
                    } else {
                        this.state_timer--;
                    }
                    var ang = Math.atan2(this.polyCords[22].y-(resolute.position.y+resolute.size.y/2), this.polyCords[22].x-(resolute.position.x+resolute.size.x/2));
                    if (this.type == 0){this.locate(new Point(this.position.x-1, this.position.y),ang);}
                    if (this.type == 1){this.locate(new Point(this.position.x, this.position.y),ang);}

                    break;
                }
                case "dead": {
                    if (this.type == 0){this.locate(new Point(this.position.x-1, this.position.y),this.angle);}
                    if (this.type == 1){this.locate(new Point(this.position.x, this.position.y),this.angle);}
                    break;
                }

            }
        }
    }

    this.damaged = function(dmg) {
        if (this.shields < dmg) {
            if (this.state != "bang"){
                this.state = "bang";
                this.state_timer = 16;
            }
        } else {
            this.shields-=dmg;
            this.state="shields_on";
            this.state_timer = 16;
        }
    }
}