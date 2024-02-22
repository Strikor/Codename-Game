var view = {
    x: 0,
    y: 0,
    zoom: 1
};

var krill = {
    x: 0,
    y: 0,
    speed: 200, // pixels per second
    sprite: null
};

var lastFrameTime = 0;

function preload() {
    krill.sprite = loadImage('assets/sideWalkL.gif');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

// enemy object
var enemy = {
    x: 300,
    y: 300,
    speed: 100, // pixel per seconds
    directionX: 0,
    directionY: 0,
    ChangeInterval: 120, // interval in frame to change direction
};

// function yo update enemy position
function updateEnemy(deltaTime) {
    // randomly change direction every 'changeInterval' frames
    if (frameCount % enemy.changeInterval === 0) {
        enemy.directionX = random([-1, 0, 1]); // chooses one of those numbers for x direction
        enemy.directionY = random([-1, 0, 1]); // chooses one of those numbers for y direction
    }

    //update enemy position based on direction and speed
    enemy.x += enemy.directionX * enemy.speed * deltaTime;
    enemy.y += enemy.directionY * enemy.speed * deltaTime;

    //keep enemy withtin canvas boundries
    enemy.x = constrain(enemy.x, 0, width);
    enemy.y = constrain(enemy.y, 0, height);
}

//function to draw enemy
function drawEnemy() {
    fill(255, 0, 0); //enemy color
    ellipse(enemy.x, enemy.y, 30, 30); //draw enemy as a circle
}

function draw() {
    var currentTime = millis();
    var deltaTime = (currentTime - lastFrameTime) / 1000;
    lastFrameTime = currentTime;

    background(220);

    handleInput(deltaTime);

    translate(width / 2, height / 2);
    scale(view.zoom);
    translate(-view.x, -view.y);

    fill(32, 158, 74);
    rect(-100, -200, 500, 500);

    fill(102);
    rect(0, 0, 63, 63);
    rect(100, 150, 63, 63);

    image(krill.sprite, krill.x, krill.y, -128, 64);

    drawEnemy(); // enemy drawing

    resetMatrix();
    fill(0, 0, 0, 100);
    rect(0, 0, 140, 50);
    fill(0);
    text(view.zoom + "x\n" + int(mouseX - width / 2) + ", " + int(mouseY - height / 2), 10, 20);
}

function handleInput(deltaTime) {
    var speedPerFrame = krill.speed * deltaTime;

    if (keyIsDown(87)) { // w
        krill.y -= speedPerFrame;
    }
    if (keyIsDown(83)) { // s
        krill.y += speedPerFrame;
    }
    if (keyIsDown(65)) { // a
        krill.x -= speedPerFrame;
    }
    if (keyIsDown(68)) { // d
        krill.x += speedPerFrame;
    }
}

function mouseWheel(e) {
    view.zoom -= e.delta / 1000;
    view.zoom = constrain(view.zoom, 0.5, 5);
}

function mousePressed() {
    // Implement camera drag functionality
}

function mouseDragged() {
    // Implement camera drag functionality
}
