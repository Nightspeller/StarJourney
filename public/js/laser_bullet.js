function Laser_bullet(point, direction, type, source){
    this.position = point;
    this.direction = direction;
    this.source = source;
    this.type = type;

    this.polyCords = new Array();

    switch (this.type) {
        case 0: { //resolute
            break;
        }
        case 1: { //e_station
            break;
        }
        case 2: { //enemy
            break;
        }
        case 3: { //boss_1
            this.size = new Point(675,6);
            this.position.x -= this.size.x;
            this.color = 'rgb(0,0,0)';
            this.damage = 0.5;
            this.life_time = 200;
            this.polyCords[0] = new Point(this.position.x,this.position.y-this.size.y/2);
            this.polyCords[1] = new Point(this.position.x+this.size.x,this.position.y-this.size.y/2);
            this.polyCords[2] = new Point(this.position.x+this.size.x,this.position.y-this.size.y/2+this.size.y);
            this.polyCords[3] = new Point(this.position.x,this.position.y-this.size.y/2+this.size.y);
            this.polyCords[4] = new Point(this.position.x,this.position.y-this.size.y/2);
            break;
        }
    }

    laser_bullet_array.push(this);
    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(this.polyCords[0].x,this.polyCords[0].y);
        for (var i=0;i<this.polyCords.length;i++){
            ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    this.locate = function(point){
        this.position = point;
    }
    this.ai = function(){
        if ((this.life_time == 0)||(e_laser_cannon_array.indexOf(this.source) == -1)){
            laser_bullet_array.splice(laser_bullet_array.indexOf(this),1);
        } else {this.life_time--;}
    }
    this.damaged = function(dmg) {
     //   laser_bullet_array.splice(laser_bullet_array.indexOf(this),1);
    }
};