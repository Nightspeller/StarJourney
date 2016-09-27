function Modules() {
    this.state = "none";
    this.choosen_modile = new Array();

    this.ai = function (){
        if((Key._clicked[0] != -1)&&(Key._clicked[1] != -1)){
            if ((Key._clicked[0] > 10)&&(Key._clicked[0]<210)&&(Key._clicked[1]>95)&&(Key._clicked[1]<190)){
                this.state = "drones";
            }
            if ((Key._clicked[0] > 10)&&(Key._clicked[0]<210)&&(Key._clicked[1]>190)&&(Key._clicked[1]<285)){
                this.state = "weapons";
            }
            if ((Key._clicked[0] > 10)&&(Key._clicked[0]<210)&&(Key._clicked[1]>285)&&(Key._clicked[1]<380)){
                this.state = "protection";
            }
            if ((Key._clicked[0] > 10)&&(Key._clicked[0]<210)&&(Key._clicked[1]>380)&&(Key._clicked[1]<475)){
                this.state = "special";
            }
            //click on ready
            if ((Key._clicked[0] > 250)&&(Key._clicked[0]<550)&&(Key._clicked[1]>400)&&(Key._clicked[1]<475)){
                choose_level(level_remember);
            }
            $("#help").text (Key._clicked[0]+" "+Key._clicked[1]);
            switch (this.state){
                case "drones" : {
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>95)&&(Key._clicked[1]<190)){
                        this.choosen_modile[0]=0;
                    }
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>190)&&(Key._clicked[1]<285)){
                        this.choosen_modile[0]=1;
                    }
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>285)&&(Key._clicked[1]<380)){
                        this.choosen_modile[0]=2;
                    }
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>380)&&(Key._clicked[1]<475)){
                        this.choosen_modile[0]=3;
                    }
                    $("#help").text (Key._clicked[0]+" "+Key._clicked[1]);
                    break;
                }
                case "weapons" : {
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>95)&&(Key._clicked[1]<190)){
                        this.choosen_modile[1]=0;
                    }
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>190)&&(Key._clicked[1]<285)){
                        this.choosen_modile[1]=1;
                    }
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>285)&&(Key._clicked[1]<380)){
                        this.choosen_modile[1]=2;
                    }
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>380)&&(Key._clicked[1]<475)){
                        this.choosen_modile[1]=3;
                    }
                    $("#help").text (Key._clicked[0]+" "+Key._clicked[1]);
                    break;
                }
                case "protection" : {
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>95)&&(Key._clicked[1]<190)){
                        this.choosen_modile[2]=0;
                    }
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>190)&&(Key._clicked[1]<285)){
                        this.choosen_modile[2]=1;
                    }
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>285)&&(Key._clicked[1]<380)){
                        this.choosen_modile[2]=2;
                    }
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>380)&&(Key._clicked[1]<475)){
                        this.choosen_modile[2]=3;
                    }
                    $("#help").text (Key._clicked[0]+" "+Key._clicked[1]);
                    break;
                }
                case "special" : {
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>95)&&(Key._clicked[1]<190)){
                        this.choosen_modile[3]=0;
                    }
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>190)&&(Key._clicked[1]<285)){
                        this.choosen_modile[3]=1;
                    }
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>285)&&(Key._clicked[1]<380)){
                        this.choosen_modile[3]=2;
                    }
                    if ((Key._clicked[0] > 590)&&(Key._clicked[0]<790)&&(Key._clicked[1]>380)&&(Key._clicked[1]<475)){
                        this.choosen_modile[3]=3;
                    }
                    $("#help").text (Key._clicked[0]+" "+Key._clicked[1]);
                    break;
                }
            }
            Key._clicked[0] = -1;
            Key._clicked[1] = -1;
        }
    }
    this.draw = function(){
        fps = 30;
        clearTimeout(gameLoop);
        gameLoop = setInterval(doGameLoop, fps);
        ctx.textAlign = 'center';
        ctx.font = '20pt Calibri';
        ctx.fillStyle = 'blue';
        ctx.fillText('Credits', canvas_width/2, 50);
        ctx.font = '15pt Calibri';
        ctx.fillText('5000', canvas_width/2, 70);
        for (var i=1; i<5; i++) {
            ctx.beginPath();
            ctx.rect(10, 95*i, 200, 95);
            ctx.fillStyle = 'grey';
            ctx.fill();
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'yellow';
            ctx.stroke();

            ctx.beginPath();
            ctx.rect(590, 95*i, 200, 95);
            ctx.fillStyle = 'grey';
            ctx.fill();
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'yellow';
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.rect(250, 95, 300, 180);
        ctx.fillStyle = 'grey';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'yellow';
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(250, 295, 300, 85);
        ctx.fillStyle = 'grey';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'yellow';
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(250, 400, 300, 75);
        ctx.fillStyle = 'grey';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'yellow';
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.font = '40pt Calibri';
        ctx.fillStyle = 'blue';
        ctx.fillText('Ready!', canvas_width/2, 450);

        var type_drones = document.getElementById('type_drones');
        ctx.drawImage(type_drones, 10+25, 95+7);
        var type_weapons = document.getElementById('type_weapons');
        ctx.drawImage(type_weapons, 10+25, 190+7);
        var type_protection = document.getElementById('type_protection');
        ctx.drawImage(type_protection, 10+25, 285+7);
        var type_special = document.getElementById('type_special');
        ctx.drawImage(type_special, 10+25, 380+7);

        var resolute_image = document.getElementById('resolute');
        ctx.drawImage(resolute_image, 265, 125);
        switch (this.state){
            case "drones" : {
                var drone_autoattack = document.getElementById('drone_autoattack');
                ctx.drawImage(drone_autoattack, 590+25, 95+7);
                var drone_defence = document.getElementById('drone_defence');
                ctx.drawImage(drone_defence, 590+25, 190+7);
                var drone_repair = document.getElementById('drone_repair');
                ctx.drawImage(drone_repair, 590+25, 285+7);
                var drone_saving = document.getElementById('drone_saving');
                ctx.drawImage(drone_saving, 590+25, 380+7);
                break;
            }
            case "weapons" : {

                break;
            }
            case "protection" : {

                break;
            }
            case "special" : {

                break;
            }
        }
        switch (this.choosen_modile[0]){
            case 0:{
                ctx.textAlign = 'center';
                ctx.font = '15pt Calibri';
                ctx.fillStyle = 'blue';
                ctx.fillText('Attack drone description', canvas_width/2, 320);
                break;
            }
            case 1:{
                ctx.textAlign = 'center';
                ctx.font = '15pt Calibri';
                ctx.fillStyle = 'blue';
                ctx.fillText('Defence drone description', canvas_width/2, 320);
                break;
            }
            case 2:{
                ctx.textAlign = 'center';
                ctx.font = '15pt Calibri';
                ctx.fillStyle = 'blue';
                ctx.fillText('Repair drone description', canvas_width/2, 320);
                break;
            }
            case 3:{
                ctx.textAlign = 'center';
                ctx.font = '15pt Calibri';
                ctx.fillStyle = 'blue';
                ctx.fillText('Saving boat description', canvas_width/2, 320);
                break;
            }
        }
        switch (this.choosen_modile[1]){
            case 0:{
                break;
            }
            case 1:{
                break;
            }
            case 2:{
                break;
            }
            case 3:{
                break;
            }
        }
        switch (this.choosen_modile[2]){
            case 0:{
                break;
            }
            case 1:{
                break;
            }
            case 2:{
                break;
            }
            case 3:{
                break;
            }
        }
        switch (this.choosen_modile[3]){
            case 0:{
                break;
            }
            case 1:{
                break;
            }
            case 2:{
                break;
            }
            case 3:{
                break;
            }
        }
        ctx.lineWidth = 1;
    }
}
