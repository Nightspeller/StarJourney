function E_laser_cannon(point, angle, type) {
    this.position = point;
    this.angle = 0;
    this.size = new Point(106,25);
    this.center = new Point(this.size.x/2,this.size.y/2);
    this.type = type;
    this.state = "regular";
    this.state_timer = 0;
    this.cooldown = 0;

    this.shields = 20;
    if (this.type == 1) {this.shields = 50;}
    this.health = 1;

    e_laser_cannon_array.push(this);


    this.polyCords = new Array();
/*//laser base
    this.polyCords[0] = new Point(25,155-95);
    this.polyCords[1] = new Point(55,155-95);
    this.polyCords[2] = new Point(55,105-95);
    this.polyCords[3] = new Point(25,105-95);
    this.polyCords[4] = new Point(25,155-95);
//laser border
    this.polyCords[5] = new Point(25,120-95);
    this.polyCords[6] = new Point(55,120-95);
    this.polyCords[7] = new Point(40,120-95);
    this.polyCords[8] = new Point(30,95-95);
    this.polyCords[9] = new Point(15,110-95);
    this.polyCords[10] = new Point(10,125-95);
    this.polyCords[11] = new Point(0,130-95);
    this.polyCords[12] = new Point(10,135-95);
    this.polyCords[13] = new Point(15,150-95);
    this.polyCords[14] = new Point(30,165-95);
    this.polyCords[15] = new Point(40,140-95);
    this.polyCords[16] = new Point(25,140-95);
    this.polyCords[17] = new Point(55,140-95);*/
     this.polyCords[0] = new Point(0,0);
     this.polyCords[1] = new Point(0,25);
     this.polyCords[2] = new Point(106,25);
     this.polyCords[3] = new Point(106,0);
     this.polyCords[4] = new Point(0,0);


    for (var i=0;i<this.polyCords.length;i++) {
        this.polyCords[i]=new Point(this.polyCords[i].x+this.position.x, this.polyCords[i].y+this.position.y);
    }

    this.draw = function() {

        switch (this.state) {
            case "regular": {
                var laser_cannon_img = document.getElementById('laser_cannon');
                ctx.drawImage(laser_cannon_img,this.position.x,this.position.y, this.size.x, this.size.y);
                break;
            }
            case "shields_on": {
                var laser_cannon_img = document.getElementById('laser_cannon');
                ctx.drawImage(laser_cannon_img,this.position.x,this.position.y, this.size.x, this.size.y);
                var shield = document.getElementById('shield');
                ctx.drawImage(shield,this.position.x-10,this.position.y-10, this.size.x+20, this.size.y+20);
                break;
            }
            case "shoot": {
                var laser_cannon_img = document.getElementById('laser_cannon_attack');
                ctx.drawImage(laser_cannon_img,this.position.x,this.position.y, this.size.x, this.size.y);
                break;
            }
            case "bang": {
                var laser_cannon_img = document.getElementById('laser_cannon');
                ctx.drawImage(laser_cannon_img,this.position.x,this.position.y, this.size.x, this.size.y);
                var img=document.getElementById('bang');
                ctx.drawImage(img,this.position.x+20,this.position.y-30, 130, 100);
                break;
            }
            case "dead": {
                var laser_cannon_img = document.getElementById('laser_cannon_destroyed');
                ctx.drawImage(laser_cannon_img,this.position.x+30,this.position.y-35, 120, 100);
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
        new Laser_bullet(new Point((this.polyCords[0].x+this.polyCords[1].x)/2,(this.polyCords[0].y+this.polyCords[1].y)/2), 0,3, this);
    }
    this.ai = function() {

        if (this.position.x<-60) {
            e_laser_cannon_array.splice(e_laser_cannon_array.indexOf(this),1);
        } else {
            switch (this.state) {
                case "regular": {
                    if (this.type == 0){this.locate(new Point(this.position.x-1, this.position.y),0);}
                    if (this.type == 1){this.locate(new Point(this.position.x, this.position.y),0);}
                    if (this.cooldown <= 0) {
                        this.state = "shoot";
                        this.state_timer = 250;
                        this.cooldown = 400;
                    }
                    this.cooldown--;

                    break;
                }
                case "shoot": {
                    if (this.type == 0){this.locate(new Point(this.position.x-1, this.position.y),0);}
                    if (this.type == 1){this.locate(new Point(this.position.x, this.position.y),0);}
                    if (this.state_timer<=0){
                        this.state = "regular";
                    }
                    if (this.state_timer == 200){
                        this.fire();
                    }
                    this.state_timer--;
                    this.cooldown--;
                    break;
                }
                case "shields_on": {
                    if (this.state_timer<=0){
                        this.state = "regular"
                    }
                        this.state_timer--;

                    if (this.type == 0){this.locate(new Point(this.position.x-1, this.position.y),0);}
                    if (this.type == 1){this.locate(new Point(this.position.x, this.position.y),0);}
                    if (this.cooldown <= 0) {
                        this.state = "shoot";
                        this.state_timer = 250;
                        this.cooldown = 400;
                    }
                    this.cooldown--;

                    break;
                }
                case "bang": {
                    if (this.state_timer<=0){
                        this.state = "dead";
                        if (Math.floor(Math.random() * 2)==1) {new Bonus(this.position,0,1);}
                    } else {
                        this.state_timer--;
                    }
                    if (this.type == 0){this.locate(new Point(this.position.x-1, this.position.y),0);}
                    if (this.type == 1){this.locate(new Point(this.position.x, this.position.y),0);}

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
            if(this.state != "bang"){
                this.state = "bang";
                this.state_timer = 16;
            }
        } else {
            this.shields-=dmg;
            if (this.state != "shoot"){
                this.state="shields_on";
                this.state_timer = 16;
            }
        }
    }
}