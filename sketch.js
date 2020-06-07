var gamestate = 1;
var player;
var playerVel;
var force;
var size;
var heading;
var boostColor;
var playerColor;
var touch;
var Score;
var Health;
var lasers = [];
var laserVel = [];
var bb;
var bbVel;
var bbSize;
var bk


function setup() {
    createCanvas(400, 400);
    bk = color(0, 0, 0)

    player = createVector(width / 2, height / 2)
    playerVel = createVector(0, 0);

    force = createVector(0, 0);
    size = 10;
    heading = 0;

    boostColor = color(0, 255, 0);
    playerColor = color(255);
    Score = 0;
    Health = 100;
    
    bb = [];
    bbVel = [];
    bbSize = 25;

    for (var i = 0; i < 20; i++) {
        bb.push(createVector(random(0, width), random(0, height)));
        bbVel.push(p5.Vector.random2D().mult(random(0.25, 2.25)));
    }
}

function draw() {
    if(gamestate === 1){
        background(bk);

        updatePlayer();
        updateBubbles();
        updateLasers();
    }

    if(Health<=0){
        gamestate = 2;
    }
    if(gamestate === 2){
        textSize(20);
        text("GAME OVER",100,100);
        text("No of bubbles shot: " + Score,130,300);
    }
} 



function updatePlayer() {
    boostColor = color(0)

    if (keyIsDown(LEFT_ARROW)) {
        heading -= 6;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        heading += 6;
    }

    push();
    translate(player.x, player.y);
    rotate(radians(heading));

    fill(0, 255, 255);
    triangle(-9, -9, 15, 0, -9, 9);
    pop();

    fill(255);
    text(Health, player.x - 10, player.y + 25)
}




function updateLasers() {
    for (var i = 0; i < lasers.length; i++) {
        for (var z = 0; z < bb.length; z++) {
            if (dist(lasers[i].x, lasers[i].y, bb[z].x, bb[z].y) < bbSize / 2) {
                bb[z] = createVector(random(0, width), random(0, height));
                bbVel[z] = p5.Vector.random2D().mult(random(0.25, 2.25));
                Health = Health + 1;
                Score++;
            }
        }
        lasers[i].add(laserVel[i]);

        push();
        stroke(132, 112, 255);
        line(lasers[i].x, lasers[i].y, lasers[i].x + laserVel[i].x * 4, lasers[i].y + laserVel[i].y * 4)
        pop();
    }
}

function keyPressed() {
    if (keyCode == 32) {
        bk = color(random(0, 255), random(0, 255), random(0, 255));
        lasers.push(createVector(player.x, player.y));
        laserVel.push(p5.Vector.fromAngle(radians(heading)).mult(7));
        Health = Health - 1;
    }
}

function updateBubbles() {
    touch = false;
    for (var i = 0; i < bb.length; i++) {
        push();

        if (dist(bb[i].x, bb[i].y, player.x, player.y) < bbSize / 2) {
            touch = true;
        }
       
        bb[i].add(bbVel[i]);

        if (bb[i].x > width + bbSize / 2) {
            bb[i].x = 0
        }
        if (bb[i].x < -bbSize / 2) {
            bb[i].x = 400
        }
        if (bb[i].y > height + bbSize / 2) {
            bb[i].y = 0
        }
        if (bb[i].y < -bbSize / 2) {
            bb[i].y = 400
        }
        fill(132, 112, 255, 45)
        stroke(255);
        ellipse(bb[i].x, bb[i].y, bbSize);

        pop();
    }
    if (touch == true) {
        playerColor = color(255, 0, 0);
        Health--;
    } else {
        playerColor = color(0,0,255);
    }

}