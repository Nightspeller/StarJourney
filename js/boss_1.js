function Boss_1(point, angle, type) {
    this.position = point;
    this.angle = 0;
    this.size = new Point(200,500);
    this.center = new Point(this.size.x/2,this.size.y/2);
    this.type = "ship";
    this.state = "regular";
    this.state_timer = 0;
    this.shields = 20;
    this.health = 1;
    this.ship_timer = 300;
    this.ship_counter = 10;

    this.polyCords = new Array();
// border image
    this.polyCords[0] = new Point(255,0);
    this.polyCords[1] = new Point(192,20);
    this.polyCords[2] = new Point(130,25);
    this.polyCords[3] = new Point(70,65);
    this.polyCords[4] = new Point(70,120);
    this.polyCords[5] = new Point(0,120);
    this.polyCords[6] = new Point(0,145);
    this.polyCords[7] = new Point(70,145);
    this.polyCords[8] = new Point(45,190);
    this.polyCords[9] = new Point(105,212);
    this.polyCords[10] = new Point(75,225);
    this.polyCords[11] = new Point(75,275);
    this.polyCords[12] = new Point(105,290);
    this.polyCords[13] = new Point(45,315);
    this.polyCords[14] = new Point(70,355);
    this.polyCords[15] = new Point(0,355);
    this.polyCords[16] = new Point(0,380);
    this.polyCords[17] = new Point(70,380);
    this.polyCords[18] = new Point(70,440);
    this.polyCords[19] = new Point(130,475);
    this.polyCords[20] = new Point(192,480);
    this.polyCords[21] = new Point(255,500);


    for (var i=0;i<this.polyCords.length;i++) {
        this.polyCords[i]=new Point(this.polyCords[i].x+this.position.x, this.polyCords[i].y+this.position.y);
    }

    var cannon1 = new E_station(new Point(720,80),0,1);
    var cannon2 = new E_station(new Point(720,360),0,1);

    var l_cannon1 = new E_laser_cannon(new Point(570,120),0,1);
    var l_cannon2 = new E_laser_cannon(new Point(570,355),0,1);

    this.draw = function() {
        switch (this.state) {
            case "regular": {
                var boss1_img = document.getElementById('boss1');
                ctx.drawImage(boss1_img,this.position.x,this.position.y, this.size.x, this.size.y);
                break;
            }
            case "launch_ship": {
                var boss1_img = document.getElementById('boss1_launch');
                ctx.drawImage(boss1_img,this.position.x,this.position.y, this.size.x, this.size.y);
                break;
            }
            case "shields_on": {
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

    }
    this.ai = function() {
        if ((this.ship_timer == 0)&&(this.ship_counter != 0)){
            new Enemy(new Point(630, 220),0,2);
            this.ship_timer = 300;
            this.ship_counter--;
            this.state = "launch_ship";
            this.state_timer = 30;
        } else {this.ship_timer--; this.state_timer--}
        if ((cannon1.state == "dead")&&(cannon2.state == "dead")&&(l_cannon1.state == "dead")&&(l_cannon2.state == "dead")&&(this.ship_counter == 0)){
            if (resolute.real_shields<=50) {alert("Boss defeated! You win!");}else {
                alert("Boss defeated! You win, cheater! -P");
            }
            game_stop();
        }
        if (this.state_timer == 0 ){
            this.state = "regular";
        }
    }

    this.damaged = function(dmg) {
        if (this.shields < dmg) {
            this.state = "dead";
            this.state_timer = 16;
        } else {
            this.shields-=dmg;
            this.state="shields_on";
            this.state_timer = 16;
        }
    }
}