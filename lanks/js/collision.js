function collision() {
    //Collision of bullets
    for (var i=0;i<bullet_array.length;i++) {
        for (var k=0;k<asteroid_array.length;k++) {
            if (asteroid_array[k].state != "dead") {
                if (pointInPoly(asteroid_array[k].polyCords,bullet_array[i].position)) {
                    bullet_array[i].damaged(1);
                    asteroid_array[k].damaged(bullet_array[i].damage);
                }
            }
        }
        for (var k=0;k<enemy_array.length;k++) {
            if (enemy_array[k].state != "dead") {
                if (bullet_array[i].source != enemy_array[k]) {
                    if (pointInPoly(enemy_array[k].polyCords,bullet_array[i].position)) {
                        bullet_array[i].damaged(1);
                        enemy_array[k].damaged(bullet_array[i].damage);
                    }
                }
            }
        }
        for (var k=0;k<e_station_array.length;k++) {
            if (e_station_array[k].state != "dead") {
                if (bullet_array[i].source != e_station_array[k]) {
                    if (pointInPoly(e_station_array[k].polyCords,bullet_array[i].position)) {
                        bullet_array[i].damaged(1);
                        e_station_array[k].damaged(bullet_array[i].damage);
                    }
                }
            }
        }
        for (var k=0;k<e_laser_cannon_array.length;k++) {
            if ((e_laser_cannon_array[k].state != "shoot")&&(e_laser_cannon_array[k].state != "dead")&&(bullet_array[i].source == resolute)) {
                if (bullet_array[i].source != e_laser_cannon_array[k]) {
                    if (pointInPoly(e_laser_cannon_array[k].polyCords,bullet_array[i].position)) {
                        bullet_array[i].damaged(1);
                        e_laser_cannon_array[k].damaged(bullet_array[i].damage);
                    }
                }
            }
        }
        if (pointInPoly(resolute.polyCords,bullet_array[i].position)) {
            if (bullet_array[i].source != resolute) {
                bullet_array[i].damaged(1);
                resolute.damaged(bullet_array[i].damage);
            }
        }
    }
    //Collision of lasers
    for (var i=0;i<laser_bullet_array.length;i++) {
        if (collision_test (resolute,laser_bullet_array[i])) {
            resolute.damaged(laser_bullet_array[i].damage);
        }
    }
    //Collision of Resolute
    for (var k=0;k<asteroid_array.length;k++) {
        if (asteroid_array[k].state != "dead") {
            if (collision_test (resolute,asteroid_array[k])) {
                resolute.damaged(1);
                asteroid_array[k].damaged(100);
            }
        }
    }
    for (var k=0;k<enemy_array.length;k++) {
        if (enemy_array[k].state != "dead") {
            if (collision_test (resolute,enemy_array[k])) {
                resolute.damaged(1);
                enemy_array[k].damaged(11);
            }
        }
    }
    for (var k=0;k<e_station_array.length;k++) {
        if (e_station_array[k].state != "dead") {
            if (collision_test (resolute,e_station_array[k])) {
                resolute.damaged(10);
                e_station_array[k].damaged(101);
            }
        }
   }
    if( boss1 != 0){
    if (collision_test (resolute, boss1)) {
        resolute.damaged(10000000);
    }}
    for (var k=0;k<bonus_array.length;k++) {
        if (collision_test (resolute,bonus_array[k])) {
            if (bonus_array[k].type == 1)
            {
                resolute.overcharge(5);
            } else {
                resolute.real_shields = 50;
            }
            bonus_array[k].damaged(0);
        }
    }
}

function collision_test(obj1,obj2) {
    if (macroCollision(obj1,obj2)) {
        if (polyCollision(obj1, obj2)){
            return true;
        }
    }
    return false;
}

function macroCollision(obj1,obj2){

    var XColl=false;
    var YColl=false;

    if ((obj1.position.x + obj1.size.x>= obj2.position.x) && (obj1.position.x <= obj2.position.x + obj2.size.x)) XColl = true;
    if ((obj1.position.y + obj1.size.y >= obj2.position.y) && (obj1.position.y <= obj2.position.y + obj2.size.y)) YColl = true;

    if ((XColl==true) && (YColl==true)) {
        return true;
    } else {
        return false;
    }
}

function segment_cross(start1, end1, start2, end2) {
    var dir1 = new Point (end1.x-start1.x,end1.y-start1.y);
    var dir2 = new Point (end2.x-start2.x,end2.y-start2.y);
    //считаем уравнения прямых проходящих через отрезки
    var a1 = -dir1.y;
    var b1 = +dir1.x;
    var d1 = -(a1*start1.x + b1*start1.y);

    var a2 = -dir2.y;
    var b2 = +dir2.x;
    var d2 = -(a2*start2.x + b2*start2.y);

    //подставляем концы отрезков, для выяснения в каких полуплоскотях они
    var seg1_line2_start = a2*start1.x + b2*start1.y + d2;
    var seg1_line2_end = a2*end1.x + b2*end1.y + d2;

    var seg2_line1_start = a1*start2.x + b1*start2.y + d1;
    var seg2_line1_end = a1*end2.x + b1*end2.y + d1;

    //если концы одного отрезка имеют один знак, значит он в одной полуплоскости и пересечения нет.
    if ((seg1_line2_start * seg1_line2_end >= 0) || (seg2_line1_start * seg2_line1_end >= 0)) {
        return false;
    }

//возвращаемое значение, подумать если очень надо будет

  //  var u = seg1_line2_start / (seg1_line2_start - seg1_line2_end);
 //   out_intersection =  start1 + u*dir1; - внимание! сложеие точек!

    return true;
}
function polyCollision(obj1, obj2) {
    for (var i=0;i<obj1.polyCords.length-1;i++){
        for (var k=0;k<obj2.polyCords.length-1;k++){
            if (segment_cross(obj1.polyCords[i],obj1.polyCords[i+1],obj2.polyCords[k],obj2.polyCords[k+1])){
                return true;
            }
        }
    }
    return false;
}

function pointInPoly(polyCords, point)
{
    var i, j, c = 0;

    for (i = 0, j = polyCords.length - 1; i < polyCords.length; j = i++)
    {

        if (((polyCords[i].y > point.y) != (polyCords[j].y > point.y)) && (point.x < (polyCords[j].x - polyCords[i].x) * (point.y - polyCords[i].y) / (polyCords[j].y - polyCords[i].y) + polyCords[i].x))
        {
            c = !c;
        }

    }

    return c;
};