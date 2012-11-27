// Global variables
//canvas
var canvas;
var ctx;
var canvas_width = 800;
var canvas_height = 500;

//arrays of objects
var background;
var menu;
var asteroid_array = new Array();
var bullet_array = new Array();
var laser_bullet_array = new Array();
var enemy_array = new Array();
var e_station_array = new Array();
var e_laser_cannon_array = new Array();
var bhole_array = new Array();
var bonus_array = new Array();
//characters ship
var resolute = 0;
var boss1 = 0;
//Game cycle
var gameLoop;
//Game level
var game_level = 0;
var level_remember = 0;
//Time for the end of the game
var frames=0;
var fps = 15;
var sec_timer = 0;
//Object for keypress optimisation
var Key = {
    _pressed: {},
    _clicked: {0: -1, 1: -1},
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    A: 65,
    Q: 81,
    W: 87,
    E: 69,

    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },

    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    },

    onMousedown: function(event) {
        this._clicked[0] = event.pageX-canvas.offsetLeft;
        this._clicked[1] = event.pageY-canvas.offsetTop;
    },

    onMouseup: function(event) {
        this._clicked[0] = -1;
        this._clicked[1] = -1;
    }
};

function canvasSpaceGame() {
    setInterval(game_time_sec, 1000);
    canvas = document.getElementById("myCanvas");
    frames = 0;
    if (canvas.getContext) {
        game_init();
        gameLoop = setInterval(doGameLoop, fps);
    }
    window.addEventListener('keyup', function(event) { Key.onKeyup(event); event.preventDefault();}, false);
    window.addEventListener('keydown', function(event) { Key.onKeydown(event); event.preventDefault();}, false);
  //  canvas.addEventListener("mouseup", function(event) { Key.onMouseup(event);}, false);
    canvas.addEventListener("click", function(event) { Key.onMousedown(event);}, false);
}
function game_init(){
    ctx = canvas.getContext("2d");
    //Creating background
    background = new Background();
    menu = new Menu();
    modules = new Modules();

}

function game_logic(){
    //Level generation
    switch (game_level ) {
        case 0: { //menu
            menu.ai();
            break;
        }
        case 0.5: { //modules
            modules.ai();
            break;
        }
        case 1: {
            generate_level_1();
            break;
        }
        case 2: {
            generate_level_2();
            break;
        }
        case 3: {
            generate_level_3();
            break;
        }
    }

    // AI of objects
    for (var i=0;i<bhole_array.length;i++) {bhole_array[i].ai();}
    for (var i=0;i<enemy_array.length;i++) {enemy_array[i].ai();}
    for (var i=0;i<e_station_array.length;i++) {e_station_array[i].ai();}
    for (var i=0;i<e_laser_cannon_array.length;i++) {e_laser_cannon_array[i].ai();}
    for (var i=0;i<bonus_array.length;i++) {bonus_array[i].ai();}

    if (boss1 != 0){boss1.ai();}
    if (resolute != 0){resolute.ai();}
    collision();
    for (var i=0;i<asteroid_array.length;i++) {asteroid_array[i].ai();}
    for (var i=0;i<bullet_array.length;i++) {bullet_array[i].ai();}
    for (var i=0;i<laser_bullet_array.length;i++) {laser_bullet_array[i].ai();}
}

function game_draw(){
    background.draw();
    if (game_level == 0){
        menu.draw();
    }
    if (game_level == 0.5){
        modules.draw();
    }
    for (var i=0;i<bhole_array.length;i++) {bhole_array[i].draw();}

    if (boss1 != 0){boss1.draw();}
    for (var i=0;i<e_laser_cannon_array.length;i++) {e_laser_cannon_array[i].draw();}
    if (resolute != 0){resolute.draw();}


    for (var i=0;i<asteroid_array.length;i++) {asteroid_array[i].draw();}
    for (var i=0;i<enemy_array.length;i++) {enemy_array[i].draw();}
    for (var i=0;i<e_station_array.length;i++) {e_station_array[i].draw();}
    for (var i=0;i<bullet_array.length;i++) {bullet_array[i].draw();}
    for (var i=0;i<laser_bullet_array.length;i++) {laser_bullet_array[i].draw();}
    for (var i=0;i<bonus_array.length;i++) {bonus_array[i].draw();}
}

function game_output() {
    $("#time").text (frames);
    $("#sec_time").text (sec_timer);
    $("#fps").text (Math.floor(frames/sec_timer));
    $("#shields").text (Math.floor(resolute.real_shields));
    $("#weapons").text (resolute.real_weapon);
    $("#engines").text (resolute.real_engine);
    $("#e_shields").text (resolute.shields);
    $("#e_weapons").text (resolute.weapon);
    $("#e_engines").text (resolute.engine);
   // $("#help").text (enemy_array.length);

}
function doGameLoop() {
    game_logic();
    game_draw();
    game_output();
    frames++;

}

function choose_level(level){
    if(level != level_remember){
        game_level = 0.5;
    } else {
        game_level = level;
    }
    level_remember = level;
    resolute = 0;
    enemy_array = [];
    e_station_array = [];
    e_laser_cannon_array = [];
    bhole_array = [];
    asteroid_array = [];
    bullet_array = [];
    bonus_array = [];
    frames = 0;
    sec_timer = 0;
    Key._pressed = [];
    clearTimeout(gameLoop);
    gameLoop = setInterval(doGameLoop, 15);
}

function generate_level_1() {
    if (resolute == 0) {
        //Creating characters ship
        resolute = new Resolute(new Point(0,220), 0,0);
        //Creating initial objects
        new Asteroid(new Point(600,100),Math.floor(Math.random() * 7),0);
        new Asteroid(new Point(500,50),Math.floor(Math.random() * 7),0);
        new Asteroid(new Point(720,400),Math.floor(Math.random() * 7),0);
        new Bhole(new Point(400,250),0,0);
    }

    if (frames >= 4000) {
        alert("You complete level 1!");
        choose_level(2);
    } else {
        var rand = Math.floor(Math.random() * 1500);
        if (rand == 1) {new Bhole(new Point(800, Math.floor(Math.random() * 400)),0,0);}
        if ((rand == 2)) {new Enemy(new Point(700, Math.floor(Math.random() * 400)),0,Math.floor(Math.random() * 2)+1);}
     //   if ((rand == 4)||(rand == 5)) {new E_station(new Point(800, Math.floor(Math.random() * 50)),0,0);new E_station(new Point(800, 380+Math.floor(Math.random() * 50)),0,0);}
        if (rand <= 5){for (var i=0;i<6;i++){new Asteroid(new Point(800+Math.floor(Math.random() * 100),Math.floor(Math.random() * 440)),Math.floor(Math.random() * 7),0);}}
    }
}
function generate_level_2() {
    if (resolute == 0) {
        //Creating characters ship
        resolute = new Resolute(new Point(0,220), 0,0);
        //Creating initial objects
        new Asteroid(new Point(600,100),Math.floor(Math.random() * 7),0);
        new Asteroid(new Point(500,50),Math.floor(Math.random() * 7),0);
        new Asteroid(new Point(720,400),Math.floor(Math.random() * 7),0);
        new Bhole(new Point(400,250),0,0);
    }

    if (frames >= 4000) {
        alert("You complete level 2!");
        choose_level(3);
    } else {
        var rand = Math.floor(Math.random() * 1500);
        if (rand == 1) {new Bhole(new Point(800, Math.floor(Math.random() * 400)),0,0);}
        if ((rand == 2)||(rand == 3)) {new Enemy(new Point(700, Math.floor(Math.random() * 400)),0,Math.floor(Math.random() * 2)+1);}
        if ((rand == 4)) {new E_station(new Point(800, Math.floor(Math.random() * 50)),0,0);new E_station(new Point(800, 380+Math.floor(Math.random() * 50)),0,0);}
        if (rand <= 2){for (var i=0;i<4;i++){new Asteroid(new Point(800+Math.floor(Math.random() * 100),Math.floor(Math.random() * 440)),Math.floor(Math.random() * 7),0);}}
    }
}
function generate_level_3() {
    if (resolute == 0) {
        //Creating characters ship
        resolute = new Resolute(new Point(0,220), 0,0);
        //Creating initial objects
        new Asteroid(new Point(600,100),Math.floor(Math.random() * 7),0);
        new Asteroid(new Point(500,50),Math.floor(Math.random() * 7),0);
        new Asteroid(new Point(720,400),Math.floor(Math.random() * 7),0);
        new Enemy(new Point(300, 300),0,2);
        new E_station(new Point(500,100),0,0);
        new Bhole(new Point(400,250),0,0);
        new Bonus(new Point(500,250),0,1);
    }

    if (frames >= 300) {
        if ((boss1 == 0)&&(frames == 400)){boss1 = new Boss_1(new Point(800-200,0),0,0);}
    } else {
        var rand = Math.floor(Math.random() * 1500);
        if (rand == 1) {new Bhole(new Point(800, Math.floor(Math.random() * 400)),0,0);}
        if ((rand == 2)||(rand == 3)) {new Enemy(new Point(700, Math.floor(Math.random() * 400)),0,rand-1);}
        if ((rand == 4)||(rand == 5)) {new E_station(new Point(800, Math.floor(Math.random() * 50)),0,0);new E_station(new Point(800, 380+Math.floor(Math.random() * 50)),0,0);}
        if ((frames%660) == 0){for (var i=0;i<4;i++){new Asteroid(new Point(800+Math.floor(Math.random() * 100),Math.floor(Math.random() * 440)),Math.floor(Math.random() * 7),0);}}
    }
}
function canvas_click(e){
    var x;
    var y;
    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    alert(x+" "+y)
}
function Point(x,y) {
    this.x = x;
    this.y = y;
}

function game_stop(){
    clearTimeout(gameLoop);
    window.removeEventListener('keydown', control, true);
}
function game_resume(){
    frames++;
    gameLoop = setInterval(doGameLoop, 15);
    window.addEventListener('keyup', function(event) { Key.onKeyup(event); event.preventDefault();}, false);
    window.addEventListener('keydown', function(event) { Key.onKeydown(event); event.preventDefault();}, false);
}
function game_time_sec()
{
    sec_timer++;
}

function game_god() {
    resolute.real_shields = 1000000;
    resolute.timers[4] = 100000000;
}