function Enemy(point, angle, type) {
    this.position = point;
    this.angle = angle;
    this.size = new Point(60,40);
    this.center = new Point(this.size.x/2,this.size.y/2);
    this.type = type;
    this.state = "regular";
    this.state_timer = 0;
    this.health = 1;
    var direction = Math.floor(Math.random() * 2);

    if (this.type == 1){
        this.shields = 5;
    }
    if (this.type == 2){
        this.shields = 10;
    }

    enemy_array.push(this);

    this.polyCords = new Array();
    if (this.type ==0) {
        this.polyCords[0] = new Point(0,20);
        this.polyCords[1] = new Point(5,15);
        this.polyCords[2] = new Point(2,15);
        this.polyCords[3] = new Point(5,15);
        this.polyCords[4] = new Point(10,10);
        this.polyCords[5] = new Point(10,18);
        this.polyCords[6] = new Point(30,18);
        this.polyCords[7] = new Point(30,0);
        this.polyCords[8] = new Point(40,18);
        this.polyCords[9] = new Point(50,18);
        this.polyCords[10] = new Point(50,15);
        this.polyCords[11] = new Point(50,17);
        this.polyCords[12] = new Point(60,17);
        this.polyCords[13] = new Point(60,23);
        this.polyCords[14] = new Point(50,23);
        this.polyCords[15] = new Point(50,25);
        this.polyCords[16] = new Point(50,22);
        this.polyCords[17] = new Point(40,22);
        this.polyCords[18] = new Point(30,40);
        this.polyCords[19] = new Point(30,22);
        this.polyCords[20] = new Point(10,22);
        this.polyCords[21] = new Point(10,30);
        this.polyCords[22] = new Point(5,25);
        this.polyCords[23] = new Point(2,25);
        this.polyCords[24] = new Point(5,25);
        this.polyCords[25] = new Point(0,20);
    }
    if (this.type == 1) {
        this.polyCords[0] = new Point(0,20);
        this.polyCords[1] = new Point(6,20);
        this.polyCords[2] = new Point(15,30);
        this.polyCords[3] = new Point(26,36);
        this.polyCords[4] = new Point(13,36);
        this.polyCords[5] = new Point(26,36);
        this.polyCords[6] = new Point(40,39);
        this.polyCords[7] = new Point(60,40);
        this.polyCords[8] = new Point(50,35);
        this.polyCords[9] = new Point(40,32);
        this.polyCords[10] = new Point(36,27);
        this.polyCords[11] = new Point(35,20);
        this.polyCords[12] = new Point(36,13);
        this.polyCords[13] = new Point(40,8);
        this.polyCords[14] = new Point(50,5);
        this.polyCords[15] = new Point(60,0);
        this.polyCords[16] = new Point(40,1);
        this.polyCords[17] = new Point(26,4);
        this.polyCords[18] = new Point(13,4);
        this.polyCords[19] = new Point(26,4);
        this.polyCords[20] = new Point(15,10);
        this.polyCords[21] = new Point(6,20);

        this.polyCords[22] = new Point(15,20);
        this.polyCords[23] = new Point(20,24);
        this.polyCords[24] = new Point(25,25);
        this.polyCords[25] = new Point(29,20);
        this.polyCords[26] = new Point(35,20);
        this.polyCords[27] = new Point(29,20);
        this.polyCords[28] = new Point(25,15);
        this.polyCords[29] = new Point(20,16);
        this.polyCords[30] = new Point(15,20);
    }
    if (this.type == 2) {
        this.polyCords[0] = new Point(0,20);
        this.polyCords[1] = new Point(5,24);
        this.polyCords[2] = new Point(11,24);
        this.polyCords[3] = new Point(30,30);
        this.polyCords[4] = new Point(19,24);
        this.polyCords[5] = new Point(19,22);
        this.polyCords[6] = new Point(32,22);
        this.polyCords[7] = new Point(35,26);
        this.polyCords[8] = new Point(44,28);
        this.polyCords[9] = new Point(46,30);
        this.polyCords[10] = new Point(46,25);
        this.polyCords[11] = new Point(44,37);
        this.polyCords[12] = new Point(27,38);
        this.polyCords[13] = new Point(55,40);
        this.polyCords[14] = new Point(51,37);
        this.polyCords[15] = new Point(60,32);
        this.polyCords[16] = new Point(54,27);
        this.polyCords[17] = new Point(54,13);
        this.polyCords[18] = new Point(60,8);
        this.polyCords[19] = new Point(51,3);
        this.polyCords[20] = new Point(55,0);
        this.polyCords[21] = new Point(27,2);
        this.polyCords[22] = new Point(44,3);
        this.polyCords[23] = new Point(46,5);
        this.polyCords[24] = new Point(46,10);
        this.polyCords[25] = new Point(44,12);
        this.polyCords[26] = new Point(35,14);
        this.polyCords[27] = new Point(32,18);
        this.polyCords[28] = new Point(19,18);
        this.polyCords[29] = new Point(19,16);
        this.polyCords[30] = new Point(30,10);
        this.polyCords[31] = new Point(11,16);
        this.polyCords[32] = new Point(5,16);
        this.polyCords[33] = new Point(0,20);

        this.polyCords[34] = new Point(5,20);
        this.polyCords[35] = new Point(8,22);
        this.polyCords[36] = new Point(15,22);
        this.polyCords[37] = new Point(15,18);
        this.polyCords[38] = new Point(8,18);
        this.polyCords[39] = new Point(5,22);

        this.polyCords[40] = new Point(36,20);
        this.polyCords[41] = new Point(39,23);
        this.polyCords[42] = new Point(45,24);
        this.polyCords[43] = new Point(50,21);
        this.polyCords[44] = new Point(50,19);
        this.polyCords[45] = new Point(45,16);
        this.polyCords[46] = new Point(39,17);
        this.polyCords[47] = new Point(36,20);
    }

    for (var i=0;i<this.polyCords.length;i++) {
        this.polyCords[i]=new Point(this.polyCords[i].x+this.position.x, this.polyCords[i].y+this.position.y);
    }

    this.draw = function() {
        switch (this.state) {
            case "regular": {
                if(this.type == 1)
                {
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(this.polyCords[0].x,this.polyCords[0].y);
                    for (var i=0;i<22;i++){
                        ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                    }
                    ctx.closePath();
                    ctx.fillStyle = "#800000";
                    ctx.strokeStyle = "#daff0c";
                    ctx.stroke();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(this.polyCords[21].x,this.polyCords[21].y);
                    for (var i=22;i<this.polyCords.length;i++){
                        ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                    }
                    ctx.closePath();
                    ctx.fillStyle = "#008080";
                    ctx.strokeStyle = "#daff0c";
                    ctx.stroke();
                    ctx.fill();
                    ctx.lineWidth = 1;
                }
                if(this.type == 2)
                {
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(this.polyCords[0].x,this.polyCords[0].y);
                    for (var i=0;i<34;i++){
                        ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                    }
                    ctx.closePath();
                    ctx.fillStyle = "#800000";
                    ctx.strokeStyle = "#daff0c";
                    ctx.stroke();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(this.polyCords[34].x,this.polyCords[34].y);
                    for (var i=34;i<39;i++){
                        ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                    }
                    ctx.closePath();
                    ctx.fillStyle = "#008080";
                    ctx.strokeStyle = "#daff0c";
                    ctx.stroke();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(this.polyCords[40].x,this.polyCords[40].y);
                    for (var i=40;i<this.polyCords.length;i++){
                        ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                    }
                    ctx.closePath();
                    ctx.fillStyle = "#008080";
                    ctx.strokeStyle = "#daff0c";
                    ctx.stroke();
                    ctx.fill();
                    ctx.lineWidth = 1;
                }
                break;
            }
            case "shields_on": {
                if(this.type == 1)
                {
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(this.polyCords[0].x,this.polyCords[0].y);
                    for (var i=0;i<22;i++){
                        ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                    }
                    ctx.closePath();
                    ctx.fillStyle = "#800000";
                    ctx.strokeStyle = "#0000ff";
                    ctx.stroke();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(this.polyCords[21].x,this.polyCords[21].y);
                    for (var i=22;i<this.polyCords.length;i++){
                        ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                    }
                    ctx.closePath();
                    ctx.fillStyle = "#008080";
                    ctx.strokeStyle = "#0000ff";
                    ctx.stroke();
                    ctx.fill();
                    ctx.lineWidth = 1;
                }
                if(this.type == 2)
                {
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(this.polyCords[0].x,this.polyCords[0].y);
                    for (var i=0;i<34;i++){
                        ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                    }
                    ctx.closePath();
                    ctx.fillStyle = "#800000";
                    ctx.strokeStyle = "#0000ff";
                    ctx.stroke();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(this.polyCords[34].x,this.polyCords[34].y);
                    for (var i=34;i<39;i++){
                        ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                    }
                    ctx.closePath();
                    ctx.fillStyle = "#008080";
                    ctx.strokeStyle = "#0000ff";
                    ctx.stroke();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(this.polyCords[40].x,this.polyCords[40].y);
                    for (var i=40;i<this.polyCords.length;i++){
                        ctx.lineTo(this.polyCords[i].x,this.polyCords[i].y);
                    }
                    ctx.closePath();
                    ctx.fillStyle = "#008080";
                    ctx.strokeStyle = "#0000ff";
                    ctx.stroke();
                    ctx.fill();
                    ctx.lineWidth = 1;
                }
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
        var ang = Math.atan2(resolute.position.y+resolute.size.y/2-this.polyCords[0].y, resolute.position.x+resolute.size.x/2-this.polyCords[0].x);
        if( this.type == 1){
            new Bullet(new Point(this.polyCords[0].x,this.polyCords[0].y), ang, 2, this)
        }
        if( this.type == 2){
            new Bullet(new Point(this.polyCords[12].x,this.polyCords[12].y), ang, 2, this)
            new Bullet(new Point(this.polyCords[21].x,this.polyCords[21].y), ang, 2, this)
        }

    }

    this.ai = function() {
        if (this.status != "dead") {
            var rand = Math.floor(Math.random() * 40);
            if (rand == 0) {this.fire()}
        }
        if (this.position.y<50) {direction = 1}
        if (this.position.y>450) {direction = 0}
        var ang = Math.atan2(-(resolute.position.y+resolute.size.y/2)+this.polyCords[0].y, -(resolute.position.x+resolute.size.x/2)+this.polyCords[0].x);

        if (direction == 0) {
            if (this.position.y<canvas_height/2) {
                this.locate(new Point(this.position.x-1, this.position.y-1),ang);
            } else {
                var dx=0;
                if (this.position.x+60+dx<800) {dx=1} else {dx=0}
                this.locate(new Point(this.position.x+dx, this.position.y-1),ang);
            }
        } else {
            if (this.position.y<canvas_height/2) {
                var dx=0;
                if (this.position.x+60+dx<800) {dx=1} else {dx=0}
                this.locate(new Point(this.position.x+dx, this.position.y+1),ang);
            } else {
                this.locate(new Point(this.position.x-1, this.position.y+1),ang);
            }
        }

        if (this.state_timer<=0){
            if (this.state == "dead")
            {
                enemy_array.splice(enemy_array.indexOf(this),1);
            } else {
                this.state = "regular"
            }
        } else {
            this.state_timer--;
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
