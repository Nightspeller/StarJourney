function Resolute(point, angle, type) {
    this.position = point;
    this.angle = angle;
    this.size = new Point(275/2,60);
    this.center = new Point(this.size.x/2,this.size.y/2);
    this.type = type;
    this.state = "regular";
    this.state_timer = 0;
    this.real_shields = 25;
    this.real_weapon = 16;
    this.real_engine = 1.5;
    this.shields = 34;
    this.weapon = 33;
    this.engine = 33;
    this.health = 1;
    this.energy = 100;

    var previous_shields;
    var previous_weapon;
    var previous_engine;

    this.timers = new Array();
    for (var i=0;i<10;i++){
        this.timers[i]=0;
    }

    this.polyCords = new Array();
    this.polyCords[0] = new Point(0,120);
    this.polyCords[1] = new Point(70,120);
    this.polyCords[2] = new Point(70,90);
    this.polyCords[3] = new Point(100,72);
    this.polyCords[4] = new Point(225,72);
    this.polyCords[5] = new Point(225,77);
    this.polyCords[6] = new Point(240,92);
    this.polyCords[7] = new Point(275,92);
    this.polyCords[8] = new Point(260,77);
    this.polyCords[9] = new Point(260,42);
    this.polyCords[10] = new Point(275,27);
    this.polyCords[11] = new Point(240,27);
    this.polyCords[12] = new Point(225,42);
    this.polyCords[13] = new Point(225,47);
    this.polyCords[14] = new Point(100,47);
    this.polyCords[15] = new Point(70,25);
    this.polyCords[16] = new Point(70,0);
    this.polyCords[17] = new Point(0,0);
    this.polyCords[18] = new Point(0,120);

    for (var i=0;i<this.polyCords.length;i++) {
        this.polyCords[i]=new Point(this.polyCords[i].x/2+this.position.x, this.polyCords[i].y/2+this.position.y);
    }

    this.draw = function() {
        switch (this.state) {
            case "regular": {
                var resolute_img = document.getElementById('resolute');
                ctx.drawImage(resolute_img,this.position.x,this.position.y, this.size.x, this.size.y);
/*                ctx.beginPath();
                ctx.moveTo(this.polyCords[0].x,this.polyCords[0].y);
                for (var i=0;i<this.polyCords.length;i++){
                    ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                }
                ctx.closePath();
                ctx.strokeStyle = "rgb(222, 103, 0)";
                ctx.stroke();*/
                break;
            }
            case "shields_on": {
                var resolute_img = document.getElementById('resolute');
                ctx.drawImage(resolute_img,this.position.x,this.position.y, this.size.x, this.size.y);
                ctx.beginPath();
                ctx.moveTo(this.polyCords[0].x,this.polyCords[0].y);
                for (var i=0;i<this.polyCords.length;i++){
                    ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                }
                ctx.closePath();
                ctx.strokeStyle = "rgb(0, 0, 255)";
                ctx.stroke();
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
        new Bullet(new Point(this.polyCords[7].x, this.polyCords[7].y), this.angle, 0, this);
        new Bullet(new Point(this.polyCords[10].x, this.polyCords[10].y), this.angle, 0, this);
    }
    this.ai = function() {
        var dx=0,dy=0;
        if (Key.isDown(Key.UP)) { if((this.position.y-2)>0) {dy=-2}}
        if (Key.isDown(Key.LEFT)) { if (this.position.x-4>0){dx=-4}}
        if (Key.isDown(Key.DOWN)) { if((this.position.y+this.size.y+2)<500) {dy=2}}
        if (Key.isDown(Key.RIGHT)) { if((this.position.x+this.size.x+2)<800) {dx=2}}
        if (Key.isDown(Key.A)) {
            if (this.timers[0]==0){
                this.fire();
                this.timers[0]=this.real_weapon;
            }
            }
        if (Key.isDown(Key.Q)) { if (this.timers[1]==0){
            if(this.shields+2 <= 100){
                if ((this.weapon-1>=0)&&(this.engine-1>=0)){
                    this.shields +=2; this.weapon -=1; this.engine -=1;
                }
                if ((this.weapon-2>=0)&&(this.engine-1<=0)){
                    this.shields +=2; this.weapon -=2; this.engine -=0;
                }
                if ((this.weapon-1<=0)&&(this.engine-2>=0)){
                    this.shields +=2; this.weapon -=0; this.engine -=2;
                }
           } this.timers[1]=5}}
        if (Key.isDown(Key.W)) { if (this.timers[2]==0){
            if(this.weapon+2 <= 100){
                if ((this.shields-1>=0)&&(this.engine-1>=0)){
                    this.shields -=1; this.weapon +=2; this.engine -=1;
                }
                if ((this.shields-2>=0)&&(this.engine-1<=0)){
                    this.shields -=2; this.weapon +=2; this.engine -=0;
                }
                if ((this.shields-1<=0)&&(this.engine-2>=0)){
                    this.shields -=0; this.weapon +=2; this.engine -=2;
                }
            }this.timers[2]=5}}
        if (Key.isDown(Key.E)) { if (this.timers[3]==0){
            if(this.engine+2 <= 100){
                if ((this.weapon-1>=0)&&(this.shields-1>=0)){
                    this.shields -=1; this.weapon -=1; this.engine +=2;
                }
                if ((this.weapon-2>=0)&&(this.shields-1<=0)){
                    this.shields -=0; this.weapon -=2; this.engine +=2;
                }
                if ((this.weapon-1<=0)&&(this.shields-2>=0)){
                    this.shields -=2; this.weapon -=0; this.engine +=2;
                }
            }this.timers[3]=5}}
        //Decrease all timers
        for (var i=0;i<4;i++){
            if (this.timers[i]!=0){
            this.timers[i]--;}
        }
        //Calculate shield regeneration speed
        if (this.real_shields+0.03*this.shields<50){
            if(this.timers[4]==0){
                this.real_shields = this.real_shields+0.01*this.shields;
                this.timers[4]=22;
            } else {
                this.timers[4]--;
            }
        } else {
            if(this.timers[4]==0){
                this.real_shields = 50;
                this.timers[4]=22;
            } else {
                this.timers[4]--;
            }
        }
        // Calculate weapons speed
        if (this.real_weapon != Math.floor(25-this.weapon*0.2)){
            this.real_weapon = Math.floor(25-this.weapon*0.2);
        }

      //Calculate size of ship (engine)
        if(this.real_engine != 1.2+0.012*this.engine) {

            var coefficient =  (1.2+0.012*this.engine)/this.real_engine;
            this.real_engine = 1.2+0.012*this.engine;
            for (var i=0;i<this.polyCords.length;i++) {
                this.polyCords[i]=new Point((this.polyCords[i].x-this.position.x)/coefficient+this.position.x,(this.polyCords[i].y-this.position.y)/coefficient+this.position.y);
            }

            this.size.x /=coefficient;
            this.size.y /=coefficient;
            this.center = new Point(this.size.x/2,this.size.y/2);
        }


     //   var ang = this.angle+0.01;
        this.locate(new Point(this.position.x+dx,this.position.y+dy),0);

        if (this.state_timer<=0){
            this.state = "regular"
        } else {
            this.state_timer--;
        }

        if(this.timers[5]>0){
            if ( this.timers[5]-1 == 0){
                this.shields = previous_shields;
                this.weapon = previous_weapon;
                this.engine = previous_engine;
                this.timers[5]--;
            } else {
                this.shields = 100;
                this.weapon = 100;
                this.engine = 100;
                this.timers[5]--;
            }
        }


    }

    this.damaged = function(dmg) {
        if (this.real_shields < dmg) {
            this.state = "dead";
            this.state_timer = 16;
            game_draw();
            game_stop();
        } else {
            this.real_shields-=dmg;
            this.state="shields_on";
            this.state_timer = 16;
        }
    }
    this.overcharge = function(sec) {
       // this.state = "overcharge";
        var energy = this.shields+this.engine+this.weapon;
        if (energy != 300){
            previous_shields = this.shields;
            previous_engine = this.engine;
            previous_weapon = this.weapon;
        }
            this.timers[5] = 66*sec;

    }
}