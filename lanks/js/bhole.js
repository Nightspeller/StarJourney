function Bhole(point, angle, type) {
    this.position = point;
    this.angle = angle;
    this.size = new Point (150,70); //SIZE OF IMAGE IS 150x80!!!
    this.center = new Point(this.position.x+this.size.x/2, this.position.y+this.size.y/2);
    this.type = type;
    this.state = "regular";
    this.shields = 0;
    this.health = 0;
    this.polyCords = new Array();
    this.polyCords[0] = new Point(0,0);
    this.polyCords[1] = new Point(this.size.x,0);
    this.polyCords[2] = new Point(this.size.x,this.size.y);
    this.polyCords[3] = new Point(0,this.size.y);

    bhole_array.push(this);

    this.draw = function() {
        switch (this.state) {
            case "regular": {
                ctx.translate(this.center.x, this.center.y);
                ctx.rotate(this.angle);
                var img=document.getElementById('bhole');
                ctx.drawImage(img,-this.size.x/2,-this.size.y/2);
                ctx.rotate(-this.angle);
                ctx.translate(-this.center.x, -this.center.y);
                break;}
        }
    }
    this.locate = function(point, angle){
        this.position = point;
        this.center = new Point(this.position.x+this.size.x/2, this.position.y+this.size.y/2);
    /*    this.angle = angle;
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        for (var i=0;i<this.polyCords.length;i++) {
            this.polyCords[i].x = this.polyCords[i].x-this.center.x;
            this.polyCords[i].y = this.polyCords[i].y-this.center.y;

            var hx = this.polyCords[i].x*cos-this.polyCords[i].y*sin;
            this.polyCords[i].y = this.polyCords[i].x*sin+this.polyCords[i].y*cos;
            this.polyCords[i].x = hx;

            this.polyCords[i].x = this.polyCords[i].x+this.center.x;
            this.polyCords[i].y = this.polyCords[i].y+this.center.y;
        }*/

    }

    this.fire = function() {

    }
    this.ai = function() {
        this.angle += 0.001;
        this.locate(new Point(this.position.x-1, this.position.y),0);
        if(this.position.x<-180){
                bhole_array.splice(bhole_array.indexOf(this),1);
        }
    }

    this.damaged = function(dmg) {

    }
}