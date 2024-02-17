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
