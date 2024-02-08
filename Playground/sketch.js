//keeps track of screen space
var view = {
    x: 0,
    y: 0,
    zoom: 1  
};

function setup() {
    createCanvas(400,400);
    windowResized();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    screen.width = windowWidth;
    screen.height = windowHeight;
}

function draw() {
    background(220);

    translate(width / 2, height / 2);
    scale(view.zoom);
    translate(-view.x, -view.y);

    // Draw objects
    fill(32, 158, 74)
    rect(-100, -200, 500, 500)

    fill(102);
    rect(0, 0, 63, 63);
    rect(100, 150, 63, 63);

    // Draw HUD elements
    resetMatrix();
    fill(0, 0, 0, 100);
    rect(0, 0, 140, 50);
    
    fill(0);
    text(view.zoom + "x\n" + int(mouseX - width / 2) + ", " + int(mouseY - height / 2), 10, 20);
}

function mouseWheel(e) {
    view.zoom -= e.delta / 1000;
    view.zoom = constrain(view.zoom, 0.5, 5);
  
}

// Fixed a problem with accelerated movement when mouse moved quickly by checking against the initial mouse position
var initialMouseX, initialMouseY;

function mousePressed() {
    initialMouseX = mouseX;
    initialMouseY = mouseY;
  }
  
function mouseDragged() {
    var totalMouseX = mouseX - initialMouseX;
    var totalMouseY = mouseY - initialMouseY;
  
    view.x -= totalMouseX / view.zoom;
    view.y -= totalMouseY / view.zoom;
  
    initialMouseX = mouseX;
    initialMouseY = mouseY;
  }