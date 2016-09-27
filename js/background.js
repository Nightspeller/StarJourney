function Background() {
    var stars = new Array();
    for (var i=0;i<1000;i++){
        stars[i] = new Array();
        stars [i][0] = new Point(Math.floor(Math.random() * 800),Math.floor(Math.random() * 500));
        stars [i][1] = Math.floor(Math.random() * 255);
    }
    this.draw = function() {
        ctx.fillStyle = "black";
        ctx.rect(0, 0, 800, 500);
        ctx.fill();
        for (var i=0;i<1000;i++){
            var color = "rgb("+stars[i][1]+","+stars[i][1]+","+stars[i][1]+")";
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(stars[i][0].x,stars[i][0].y, 1, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            if (stars[i][0].x<0){
                stars[i][0].x = 800;
            } else {
                stars[i][0].x--;
            }
        }
    }
}