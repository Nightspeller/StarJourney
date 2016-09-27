function Menu() {
    this.state = "main";
    this.ai = function (){
        fps = 30;
        clearTimeout(gameLoop);
        gameLoop = setInterval(doGameLoop, fps);
        if((Key._clicked[0] != -1)&&(Key._clicked[1] != -1)){
            switch (this.state){
                case "main" : {
                    if ((Key._clicked[0] > 345)&&(Key._clicked[0]<455)&&(Key._clicked[1]>155)&&(Key._clicked[1]<205)){
                        choose_level(1);
                    }
                    if ((Key._clicked[0] > 225)&&(Key._clicked[0]<570)&&(Key._clicked[1]>235)&&(Key._clicked[1]<285)){
                        this.state = "choose_level";
                    }
                    if ((Key._clicked[0] > 305)&&(Key._clicked[0]<495)&&(Key._clicked[1]>315)&&(Key._clicked[1]<360)){
                        this.state = "achievements"
                    }
                    if ((Key._clicked[0] > 135)&&(Key._clicked[0]<660)&&(Key._clicked[1]>395)&&(Key._clicked[1]<440)){
                        window.close();
                    }
                    $("#help").text (Key._clicked[0]+" "+Key._clicked[1]);
                    break;
                }
                case "choose_level" : {
                    if ((Key._clicked[0] > 305)&&(Key._clicked[0]<495)&&(Key._clicked[1]>155)&&(Key._clicked[1]<205)){
                        choose_level(1);
                    }
                    if ((Key._clicked[0] > 305)&&(Key._clicked[0]<495)&&(Key._clicked[1]>235)&&(Key._clicked[1]<285)){
                        choose_level(2);
                    }
                    if ((Key._clicked[0] > 305)&&(Key._clicked[0]<495)&&(Key._clicked[1]>315)&&(Key._clicked[1]<360)){
                        choose_level(3);
                    }
                    if ((Key._clicked[0] > 135)&&(Key._clicked[0]<660)&&(Key._clicked[1]>395)&&(Key._clicked[1]<440)){
                        this.state = "main";
                    }
                    $("#help").text (Key._clicked[0]+" "+Key._clicked[1]);
                    break;
                }
                case "achievements" : {
                    if ((Key._clicked[0] > 305)&&(Key._clicked[0]<495)&&(Key._clicked[1]>155)&&(Key._clicked[1]<205)){

                    }
                    if ((Key._clicked[0] > 305)&&(Key._clicked[0]<495)&&(Key._clicked[1]>235)&&(Key._clicked[1]<285)){

                    }
                    if ((Key._clicked[0] > 305)&&(Key._clicked[0]<495)&&(Key._clicked[1]>315)&&(Key._clicked[1]<360)){

                    }
                    if ((Key._clicked[0] > 135)&&(Key._clicked[0]<660)&&(Key._clicked[1]>395)&&(Key._clicked[1]<440)){
                        this.state = "main";
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
        switch (this.state){
            case "main" : {
                ctx.textAlign = 'center';
                ctx.font = '20pt Calibri';
                ctx.fillStyle = 'blue';
                ctx.fillText('Serj Nights', canvas_width/2, 50);
                ctx.font = '10pt Calibri';
                ctx.fillText('presents:', canvas_width/2, 70);
                ctx.font = '40pt Calibri';
                ctx.fillText('Retro Star Journey!', canvas_width/2, 110);
                ctx.fillStyle = 'red';
                ctx.font = '50pt Calibri';
                ctx.fillText('Play', canvas_width/2, 200);
                ctx.font = '50pt Calibri';
                ctx.fillText('Choose level', canvas_width/2, 280);
                ctx.font = '50pt Calibri';
                ctx.fillText('Achievements', canvas_width/2, 360);
                ctx.font = '50pt Calibri';
                ctx.fillText('Quit', canvas_width/2, 440);
                break;
            }
            case "choose_level" :{
                ctx.textAlign = 'center';
                ctx.font = '20pt Calibri';
                ctx.fillStyle = 'blue';
                ctx.fillText('Serj Nights', canvas_width/2, 50);
                ctx.font = '10pt Calibri';
                ctx.fillText('presents:', canvas_width/2, 70);
                ctx.font = '40pt Calibri';
                ctx.fillText('Retro Star Journey!', canvas_width/2, 110);
                ctx.fillStyle = 'red';
                ctx.font = '50pt Calibri';
                ctx.fillText('Level 1', canvas_width/2, 200);
                ctx.font = '50pt Calibri';
                ctx.fillText('Level 2', canvas_width/2, 280);
                ctx.font = '50pt Calibri';
                ctx.fillText('Level 3', canvas_width/2, 360);
                ctx.font = '50pt Calibri';
                ctx.fillText('Back to main menu', canvas_width/2, 440);
                break;
            }
            case "achievements" :{
                ctx.textAlign = 'center';
                ctx.font = '20pt Calibri';
                ctx.fillStyle = 'blue';
                ctx.fillText('Serj Nights', canvas_width/2, 50);
                ctx.font = '10pt Calibri';
                ctx.fillText('presents:', canvas_width/2, 70);
                ctx.font = '40pt Calibri';
                ctx.fillText('Retro Star Journey!', canvas_width/2, 110);
                ctx.fillStyle = 'green';
                ctx.font = '50pt Calibri';
                ctx.fillText('You get', canvas_width/2, 200);
                ctx.font = '50pt Calibri';
                ctx.fillText('the achievement', canvas_width/2, 280);
                ctx.font = '50pt Calibri';
                ctx.fillText('"Seeker of the achievements"', canvas_width/2, 360);
                ctx.fillStyle = 'red';
                ctx.font = '50pt Calibri';
                ctx.fillText('Back to main menu', canvas_width/2, 440);
                break;
            }
        }


    }
}
