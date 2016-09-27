function Bullet(point, direction, type, source){
    this.position = point;
    this.direction = direction;
    this.source = source;
    this.type = type;

    switch (this.type) {
        case 0: { //resolute
            this.size = new Point(6,6);
            this.color = 'rgb(0,0,255)';
            this.speed = 10;
            this.calibre = 3;
            this.damage = 1;
            break;
        }
        case 1: { //e_station

            this.size = new Point(6,6);
            this.color = 'rgb(255,0,0)';
            this.speed = 3;
            this.calibre = 5;
            this.damage = 3;
            break;
        }
        case 2: { //enemy
            this.size = new Point(6,6);
            this.color = 'rgb(0,255,0)';
            this.speed = 5;
            this.calibre = 3;
            this.damage = 1;
            break;
        }


    }

    bullet_array.push(this);
    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.calibre, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

    }
    this.locate = function(point){
        this.position = point;
    }
    this.ai = function(){
        if((this.position.x<800)&&(this.position.y<500)&&(this.position.x>0)&&(this.position.y>0)){
            this.position.x+=this.speed*Math.cos(this.direction);
            this.position.y+=this.speed*Math.sin(this.direction);
        } else {
            bullet_array.splice(bullet_array.indexOf(this),1);
        }
    }
    this.damaged = function(dmg) {
        bullet_array.splice(bullet_array.indexOf(this),1);
    }
};