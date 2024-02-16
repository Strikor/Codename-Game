//Testing
//keeps track of screen space
var view = {
    x: 0,
    y: 0,
    zoom: 1,
    tool: null,
    cameraLocked: false
};

var mapObjects = {
    rectangles: [] // Rectangles that have been drawn
};

var gridSize = 64;

function preload() {

}

function setup() {
    createCanvas(400, 400);
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

    //Impliment a level based draw system

    // Calculate the visible area
    var startX = floor((view.x - width / 2 / view.zoom) / gridSize) * gridSize;
    var startY = floor((view.y - height / 2 / view.zoom) / gridSize) * gridSize;
    var endX = ceil((view.x + width / 2 / view.zoom) / gridSize) * gridSize;
    var endY = ceil((view.y + height / 2 / view.zoom) / gridSize) * gridSize;

    stroke(125); // Set the color of the grid lines
    for (var x = startX; x <= endX; x += gridSize) {
        line(x, startY, x, endY);
    }
    for (var y = startY; y <= endY; y += gridSize) {
        line(startX, y, endX, y);
    }

    // Draw objects
    fill(255, 0, 0);
    for (var i = 0; i < mapObjects.rectangles.length; i++) {
        var rectangle = mapObjects.rectangles[i];
        rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    }

    //Draw Character
    //keyTyped();

    // Draw HUD elements
    resetMatrix();
    fill(0, 0, 0, 100);
    rect(0, 0, 140, 50);

    fill(0);
    text(view.zoom + "x\n" + int(mouseX - width / 2) + ", " + int(mouseY - height / 2), 10, 20);

    //Left Menu
    var buttonWidth = 63;
    var buttonHeight = 50;
    var buttonSpacing = 10;
    var buttonY = height / 3;
    for (var i = 0; i < 5; i++) {
        if ((i == 0 && view.tool == "select") || (i == 1 && view.tool == "rectangle")) { // Check if button 1 or 2 is selected
            fill(255, 0, 0, 100); // Draw the selected button in red
        } else {
            fill(0, 0, 0, 100); // Draw other buttons in black
        }
        rect(0, buttonY, buttonWidth, buttonHeight);
        fill(255);
        text("Button " + (i + 1), 10, buttonY + 30);
        buttonY += buttonHeight + buttonSpacing;
    }
}

function mouseWheel(e) {
    view.zoom -= e.delta / 1000;
    view.zoom = constrain(view.zoom, 0.5, 5);

}

function keyTyped() {

}

function keyReleased() {
    key = '';
}

// Fixed a problem with accelerated movement when mouse moved quickly by checking against the initial mouse position
var initialMouseX, initialMouseY;

function mousePressed() {
    initialMouseX = mouseX;
    initialMouseY = mouseY;

    // Check if a menu button was clicked
    var buttonWidth = 63;
    var buttonHeight = 50;
    var buttonSpacing = 10;
    var buttonY = height / 3;
    for (var i = 0; i < 5; i++) {
        if (mouseX >= 0 && mouseX <= buttonWidth && mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
            console.log("Button " + (i + 1) + " was clicked");
            if (i == 0) {
                view.tool = "select";
                view.cameraLocked = false; // Lock the camera when button 0 is clicked
            } else if (i == 1) {
                view.tool = "rectangle";
                view.cameraLocked = true; // Unlock the camera when button 1 is clicked
            } else {
                view.tool = null;
                view.cameraLocked = true; // Lock the camera when any other button is clicked
            }
        }
        buttonY += buttonHeight + buttonSpacing;
    }

    // If the rectangle tool is selected, start drawing a rectangle
    if (view.tool == "rectangle") {
        initialMouseX = Math.round(((mouseX - width / 2) / view.zoom + view.x) / gridSize) * gridSize;
        initialMouseY = Math.round(((mouseY - height / 2) / view.zoom + view.y) / gridSize) * gridSize;
        mapObjects.rectangles.push({
            x: initialMouseX,
            y: initialMouseY,
            width: 0,
            height: 0
        });
    }
}

function mouseDragged() {
    if (!view.cameraLocked) { // Only move the camera if it's not locked
        var totalMouseX = mouseX - initialMouseX;
        var totalMouseY = mouseY - initialMouseY;

        view.x -= totalMouseX / view.zoom;
        view.y -= totalMouseY / view.zoom;

        initialMouseX = mouseX;
        initialMouseY = mouseY;
    }

    // If the rectangle tool is selected, update the size of the current rectangle
    if (view.tool == "rectangle") {
        var rectangle = mapObjects.rectangles[mapObjects.rectangles.length - 1];
        var currentMouseX = Math.round(((mouseX - width / 2) / view.zoom + view.x) / gridSize) * gridSize;
        var currentMouseY = Math.round(((mouseY - height / 2) / view.zoom + view.y) / gridSize) * gridSize;
        rectangle.width = currentMouseX - initialMouseX;
        rectangle.height = currentMouseY - initialMouseY;
    }
}