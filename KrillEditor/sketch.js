//Testing
//keeps track of screen space
var view = {
    x: 0,
    y: 0,
    zoom: 1,
    tool: 'select',
    cameraLocked: false
};

var gridSize = 64;

var tmpMapObject = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    tile: null
};

var mapObjects = {
    tiles: []//,
    //entities: []
};

function preload() {

}

function setup() {
    createCanvas(400, 400);
    windowResized();

    //Tile Type Selector
    tileSelect = createSelect();
    tileSelect.position(0, 50);

    tileSelect.option('Wall');
    tileSelect.option('Floor');

    let importBTN = createButton('Import Map');
    importBTN.position(140, 0);

    importBTN.mousePressed(() => importTiles());

    let exportBTN = createButton('Export Map');
    exportBTN.position(140, 29);

    exportBTN.mousePressed(() => exportTiles());

}

function exportTiles() {
    var outputMap = [];

    let mapWidth = 0;
    let mapHeight = 0;

    let lowX = mapObjects.tiles[0].x;
    let lowY = mapObjects.tiles[0].y;
    let highX = mapObjects.tiles[0].x;
    let highY = mapObjects.tiles[0].y;

    //Find the lowest and highest x and y values
    for (var i = 1; i < mapObjects.tiles.length; i++) {
        if (mapObjects.tiles[i].x < lowX) {
            lowX = mapObjects.tiles[i].x;
        }
        if (mapObjects.tiles[i].y < lowY) {
            lowY = mapObjects.tiles[i].y;
        }
        if (mapObjects.tiles[i].x > highX) {
            highX = mapObjects.tiles[i].x;
        }
        if (mapObjects.tiles[i].y > highY) {
            highY = mapObjects.tiles[i].y;
        }
    }

    //Round the values to the nearest grid size accounting for JS division error
    lowX = Math.round(lowX / gridSize);
    lowY = Math.round(lowY / gridSize);
    highX = Math.round(highX / gridSize);
    highY = Math.round(highY / gridSize);

    mapWidth = highX - lowX;
    mapHeight = highY - lowY;

    //Find the locations of all tiles in the order they exist in the map
    let curX = lowX;
    for(var i = 0; i <= mapHeight; i++) {
        let curX = lowX;
        let row = '';
        for(var j = 0; j <= mapWidth; j++) {
            let found = false;
            for(var k = 0; k < mapObjects.tiles.length; k++) {
                if(Math.round(mapObjects.tiles[k].x / gridSize) == curX && Math.round(mapObjects.tiles[k].y / gridSize) == i + lowY) {
                    row += findTypeChar(mapObjects.tiles[k].type);
                    found = true;
                    break;
                }
            }
            if(!found) {
                row += ' ';
            }
            curX++;
        }
        outputMap.push(row);
    }

    /*for(var i = 0; i < outputMap.length; i++) {
        console.log(outputMap[i]);
    }*/

    //Convert outputMap to a string
    let outputString = outputMap.join('\n');

    //Create a Blob Object from the string
    let blob = new Blob([outputString], {type: 'text/plain'});

    //Create a download link
    let link = document.createElement('a');
    link.download = 'output.txt';
    link.href = URL.createObjectURL(blob);

    //Add the temporary link to the document for downloading
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function importTiles() {
    // Create the file input and hide it
    let input = createFileInput(handleFile);
    input.style('display', 'none');

    // Create the buttons
    let tileSelect = createSelect();
    tileSelect.position(0, 50);
    tileSelect.option('Wall');
    tileSelect.option('Floor');

    let importBTN = createButton('Import Map');
    importBTN.position(140, 0);
    importBTN.mousePressed(() => input.elt.click()); // Click the hidden file input element when the button is pressed
    input.elt.click();

    let exportBTN = createButton('Export Map');
    exportBTN.position(140, 29);
    exportBTN.mousePressed(() => exportTiles());
}

function handleFile(file) {
    if (file.type === 'text') {
        // Split the file data into lines
        let lines = file.data.split('\n');
        createTiles(lines);
    } else {
        console.log('Not a text file');
    }
}

function createTiles(lines) {
    // Clear the current tiles
    mapObjects.tiles = [];

    // Iterate over the lines in the file
    for (let y = 0; y < lines.length; y++) {
        let line = lines[y];

        // Iterate over the characters in the line
        for (let x = 0; x < line.length; x++) {
            let char = line.charAt(x);

            // Create a tile based on the character
            let type;
            if (char === 'W') {
                type = 'Wall';
            } else if (char === 'F') {
                type = 'Floor';
            }

            if (type) {
                mapObjects.tiles.push({
                    x: x * gridSize,
                    y: y * gridSize,
                    type: type
                });
            }
        }
    }
}

//Add more tile types/make dynamic
function findTypeChar(type) {
    if(type == "Wall") {
        return 'W';
    } else if(type == "Floor") {
        return 'F';
    }

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
    for (var i = 0; i < mapObjects.tiles.length; i++) {
        var tile = mapObjects.tiles[i];

        // Add tile types as needed. Sprites can also be added here
        if (tile.type == "Wall") {
            fill(0, 255, 0);
        } else if (tile.type == "Floor") {
            fill(0, 0, 255);
        }
        rect(tile.x, tile.y, gridSize, gridSize);
    }

    //Draw Temporary Objects
    fill(255, 0, 0);
    rect(tmpMapObject.x, tmpMapObject.y, tmpMapObject.width, tmpMapObject.height);
    

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
        if ((i == 0) && view.tool == "select" ||
                (i == 1 && view.tool == "rectangle") ||
                (i == 2 && view.tool == "touch") ||
                (i == 3 && view.tool == null) ||
                (i == 4 && view.tool == "delete")) { // Check if button 1 or 2 is selected

            fill(255, 0, 0, 100); // Draw the selected button in red
        } else {
            fill(0, 0, 0, 100); // Draw other buttons in black
        }
        rect(0, buttonY, buttonWidth, buttonHeight);
        fill(255);
        if(i == 0) {
            text("Select", 10, buttonY + 30);
        } else if(i == 1) {
            text("Draw", 10, buttonY + 30);

        } else if(i == 2) {
            text("Touch", 10, buttonY + 30);
        } else if(i == 3) {
            text("Button 4", 10, buttonY + 30);
        } else if(i == 4) {
            text("Delete", 10, buttonY + 30);
        }/* else {//Add more buttons names here
            text("Button " + (i + 1), 10, buttonY + 30);
        }*/
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
            } else if (i == 2) {
                view.tool = "touch";
                view.cameraLocked = true; // Unlock the camera when button 1 is clicked
            } else if (i == 3) {
                view.tool = null;
                view.cameraLocked = false; // Unlock the camera when button 1 is clicked
            } else if (i == 4) {
                view.tool = "delete";
                view.cameraLocked = true; // Unlock the camera when button 1 is clicked
            } else {
                view.tool = null;
                view.cameraLocked = false; // Lock the camera when any other button is clicked
            }
        }
        buttonY += buttonHeight + buttonSpacing;
    }

    // If the rectangle tool is selected, start drawing a rectangle
    if (view.tool == "rectangle") {
        initialMouseX = Math.round(((mouseX - width / 2) / view.zoom + view.x) / gridSize) * gridSize;
        initialMouseY = Math.round(((mouseY - height / 2) / view.zoom + view.y) / gridSize) * gridSize;
        
        tmpMapObject = {
            x: initialMouseX,
            y: initialMouseY,
            width: 0,
            height: 0,
            type: tileSelect.value()
        }
    } else if (view.tool == "touch") {
        // Fix a single tap not painting properly
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
    var currentMouseX, currentMouseY;

    if (view.tool == "rectangle") {
        currentMouseX = Math.round(((mouseX - width / 2) / view.zoom + view.x) / gridSize) * gridSize;
        currentMouseY = Math.round(((mouseY - height / 2) / view.zoom + view.y) / gridSize) * gridSize;
        
        tmpMapObject.width = currentMouseX - initialMouseX;
        tmpMapObject.height = currentMouseY - initialMouseY;
    
    } else if (view.tool == "touch") {
        currentMouseX = Math.floor(((mouseX - width / 2) / view.zoom + view.x) / gridSize) * gridSize;
        currentMouseY = Math.floor(((mouseY - height / 2) / view.zoom + view.y) / gridSize) * gridSize;

        for (var i = 0; i < mapObjects.tiles.length; i++) {
            if (currentMouseX == mapObjects.tiles[i].x && currentMouseY == mapObjects.tiles[i].y) {
                mapObjects.tiles.splice(i, 1);
            }
        }

        mapObjects.tiles.push({
            x: currentMouseX,
            y: currentMouseY,
            type: tileSelect.value()
        });
    } else if (view.tool == "delete") {
        currentMouseX = Math.floor(((mouseX - width / 2) / view.zoom + view.x) / gridSize) * gridSize;
        currentMouseY = Math.floor(((mouseY - height / 2) / view.zoom + view.y) / gridSize) * gridSize;

        for (var i = 0; i < mapObjects.tiles.length; i++) {
            if (currentMouseX == mapObjects.tiles[i].x && currentMouseY == mapObjects.tiles[i].y) {
                mapObjects.tiles.splice(i, 1);
            }
        }
    }
}

/*mapObjects.rectangles.push({
            x: initialMouseX,
            y: initialMouseY,
            width: 0,
            height: 0
        });*/

function mouseReleased() {
    if (view.tool == "rectangle") {
        var widthTileNum = Math.abs(tmpMapObject.width / gridSize);
        var heightTileNum = Math.abs(tmpMapObject.height / gridSize);

        //Deletes any tiles that are in the same location as the new tiles
        if(tmpMapObject.width != 0) {
            for(var i = 0; i < mapObjects.tiles.length; i++) {
                if(mapObjects.tiles[i].x == tmpMapObject.x && mapObjects.tiles[i].y == tmpMapObject.y) {
                    mapObjects.tiles.splice(i, 1);
                }
            }
        }

        for (var i = 0; i < heightTileNum; i++) {
            for (var j = 0; j < widthTileNum; j++) {
                mapObjects.tiles.push({
                    x: (tmpMapObject.width < 0 ? tmpMapObject.x - gridSize + j * gridSize * -1 : tmpMapObject.x + j * gridSize * 1),
                    y: (tmpMapObject.height < 0 ? tmpMapObject.y - gridSize + i * gridSize * -1 : tmpMapObject.y + i * gridSize * 1),
                    type: tileSelect.value()
                });
            }
        }

        tmpMapObject.x = 0;
        tmpMapObject.y = 0;
        tmpMapObject.width = 0;
        tmpMapObject.height = 0;
        tmpMapObject.type = null;

    }

}