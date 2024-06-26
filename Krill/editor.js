let debugMode = true;

var view = {
    x: 0,
    y: 0,
    zoom: 2,
    tool: 'select',
    cameraLocked: false
};

var gridSize = 16;

var tmpMapObject = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    tile: null
};

var mapObjects = {
    tiles: [],
    entities: []
};

var tileOpacity = 255;
var entOpacity = 127;

function preload() {
    loadTileSprites();
    loadTiles();
    spriteImg = loadImage('./assets/krillWalk4D.png'); 
}

function setup() {
    new Canvas(540, 540)
    windowResized();

    //Tile Type Selector
    tileSelect = createSelect();
    tileSelect.position(0, 50);

    tileSelect.option('Wall');
    tileSelect.option('Floor');

    //Layer Selector
    layerSelect = createSelect();
    layerSelect.position(73, 50);
    
    layerSelect.option('Tiles');
    layerSelect.option('Entities');

    layerSelect.changed(() => { 
        if (layerSelect.value() == 'Entities') {
            tileOpacity = 100;
            entOpacity = 255;
    
            //clear options
            let length = tileSelect.elt.options.length;
            for(var i = 0; i < length; i++) {
                tileSelect.elt.remove(0);
            }
            
            //add new options
            tileSelect.option('krillSpawn');
            tileSelect.option('krillHurt');
            tileSelect.option('krillGoal');
            tileSelect.option('slowTile');


        } else {
            tileOpacity = 255;
            entOpacity = 100;

            let length = tileSelect.elt.options.length;
            for(var i = 0; i < length; i++) {
                tileSelect.elt.remove(0);
            }

            tileSelect.option('Wall');
            tileSelect.option('Floor');

        } 
    });


    let importBTN = createButton('Import Map');
    importBTN.position(140, 0);

    importBTN.mousePressed(() => importTiles());

    let exportBTN = createButton('Export Map');
    exportBTN.position(223, 0);

    exportBTN.mousePressed(() => createLink(exportTiles()));

    let testBTN = createButton('Test Map');
    testBTN.position(307, 0);

    testBTN.mousePressed(() => testTiles());

}

function testTiles() {
    if(state == "editor" && mapObjects != null && mapObjects.tiles.length > 0) {
        clear();
        noCanvas();
        state = "game";
        preloadGame();
        setupGame(exportTiles());
        fullscreen(true);
    } else if(state == "game") {
        fullscreen(false);
        krill.remove();
        krill = null;
        clear();
        noCanvas();
        room.removeAll();
        state = "editor";
        setup();
    }
    
}

function exportTiles() {

    console.log("Exporting Map");

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

    let connectedMap = new Array(outputMap.length).fill('');

    for(let i = 0; i < outputMap.length; i++) {
        for(let j = 0; j < outputMap[i].length; j++) {
            let connections = [0, 0, 0,
                               0, 0, 0,
                               0, 0, 0];
            if(outputMap[i][j] == 'W') {
                connections[4] = 1;
                if(i != 0 && outputMap[i - 1][j] == 'W') {
                    connections[1] = 1;
                }
                if(i != outputMap.length - 1 && outputMap[i + 1][j] == 'W') {
                    connections[7] = 1;
                }
                if(j != 0 && outputMap[i][j - 1] == 'W') {
                    connections[3] = 1;
                }
                if(j != outputMap[i].length - 1 && outputMap[i][j + 1] == 'W') {
                    connections[5] = 1;
                }
                if(i != 0 && j != 0 && outputMap[i - 1][j - 1] == 'W') {
                    connections[0] = 1;
                }
                if(i != 0 && j != outputMap[i].length - 1 && outputMap[i - 1][j + 1] == 'W') {
                    connections[2] = 1;
                }
                if(i != outputMap.length - 1 && j != 0 && outputMap[i + 1][j - 1] == 'W') {
                    connections[6] = 1;
                }
                if(i != outputMap.length - 1 && j != outputMap[i].length - 1 && outputMap[i + 1][j + 1] == 'W') {
                    connections[8] = 1;
                }
            }

            connectedMap[i] += findTileChar(connections);
            
        }
    }
    outputMap = connectedMap;

    outputMap.push('\n');

    for(var i = 0; i < mapObjects.entities.length; i++) {
        let type = mapObjects.entities[i].type;
        let x = mapObjects.entities[i].x - lowX * gridSize;
        let y = mapObjects.entities[i].y - lowY * gridSize;
        let width = mapObjects.entities[i].width;
        let height = mapObjects.entities[i].height;

        outputMap.push(type + ' ' + x + ' ' + y + ' ' + width + ' ' + height);
    }
    /*for(var i = 0; i < outputMap.length; i++) {
        console.log(outputMap[i]);
    }*/

    //Convert outputMap to a string
    let outputString = outputMap.join('\n');

    console.log(outputString);

    return outputString;
}

function createLink(m) {
    let b = new Blob([m], {type: 'text/plain'});

    //Create a download link
    let link = document.createElement('a');
    link.download = 'output.txt';
    link.href = URL.createObjectURL(b);

    //Add the temporary link to the document for downloading
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function findTileChar(con) {
    for (let key in connecting) {
        let match = true;
        for (let i = 0; i < con.length; i++) {
            if (connecting[key][i] !== 2 && con[i] !== connecting[key][i]) {
                match = false;
                break;
            }
        }
        if (match) {
            return key;
        }
    }
    if(con[4] == 1) {
        return 'h';
    } else {
        return ' ';
    }
}

function importTiles() {
    // Create the file input and hide it
    let input = createFileInput(handleFile);
    input.style('display', 'none');

    let importBTN = createButton('Import Map');
    importBTN.mousePressed(() => input.elt.click()); // Click the hidden file input element when the button is pressed
    input.elt.click();

}

function handleFile(file) {
    if (file.type === 'text') {
        // Split the file data into lines
        console.log('Text File Recieved');
        //Larger Layers
        let layers = file.data.split('\n\n');

        //Map Lines
        let lines = layers[0].split('\n');

        //Entities
        if(layers[1] != undefined) {
            let tmpEnts = layers[1].split('\n');
            for(let i = 0; i < tmpEnts.length; i++) {
                let tmp = tmpEnts[i].split(' ');
                mapObjects.entities.push({
                    type: tmp[0],
                    x: tmp[1],
                    y: tmp[2],
                    width: tmp[3],
                    height: tmp[4]
                });
            }
        }
        
        pullTiles(lines);
        
    } else {
        console.log('Not a text file');
    }
}

function pullTiles(lines) {
    // Clear the current tiles
    mapObjects.tiles = [];

    // Iterate over the lines in the file
    for (let y = 0; y < lines.length; y++) {
        let line = lines[y];

        // Iterate over the characters in the line
        for (let x = 0; x < line.length; x++) {
            let char = line.charAt(x);

            // Create a tile based on the character
            let type = null;
            if (char in connecting) {
                type = 'Wall';
            } else if (char === ' ') {
                //type = 'Floor';
            }

            if (type != null) {
                mapObjects.tiles.push({
                    x: x * gridSize,
                    y: y * gridSize,
                    type: type,
                    width: gridSize,
                    height: gridSize
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
    if (state == "editor") {
        drawEditor();
    } else {
        drawGame();
    }
}

function drawEditor() {
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
    
    drawObjects();
    drawHud();
}

function drawObjects() {
    for (var i = 0; i < mapObjects.tiles.length; i++) {
        var tile = mapObjects.tiles[i];

        // Add tile types as needed. Sprites can also be added here
        if (tile.type == "Wall") {
            fill(0, 255, 0, tileOpacity);
        } else if (tile.type == "Floor") {
            fill(0, 0, 255, tileOpacity);
        }
        rect(tile.x, tile.y, gridSize, gridSize);
    }

    for (var i = 0; i < mapObjects.entities.length; i++) {
        var entity = mapObjects.entities[i];

        // Add entity types as needed. Sprites can also be added here
        if (entity.type == "krillSpawn") {
            fill(129,84,146, entOpacity);
        } else if (entity.type == "krillHurt") {
            fill(70,32,85, (entOpacity > 100 ? entOpacity : entOpacity/2));//Due to strong color the opacity needs to be even lower
        } else if (entity.type == "krillGoal") {
            fill(201,179,32, entOpacity);
        } else if (entity.type == "slowTile") {
            fill(0, 119, 190, entOpacity);
        }
        rect(entity.x, entity.y, entity.width, entity.height);
    }

    //Draw Temporary Objects
    fill(255, 0, 0);
    rect(tmpMapObject.x, tmpMapObject.y, tmpMapObject.width, tmpMapObject.height);
}

function drawHud() {
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

    // Round view.zoom to the nearest tenth
    view.zoom = Math.round(view.zoom * 10) / 10;

}

function keyTyped() {

}

function keyReleased() {
    key = '';
}

// Fixed a problem with accelerated movement when mouse moved quickly by checking against the initial mouse position
var initialMouseX, initialMouseY;
// Fixed issue with draw tools drawing behind hud objects unintentionally
var clickedOnHud = false;

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
            clickedOnHud = true;
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
    if (mouseX >= 0 && mouseX <= 140 && mouseY >= 0 && mouseY <= 75) {clickedOnHud = true;}
    if (mouseX >= 140 && mouse <= 390 && mouseY >= 0 && mouseY <= 24) {clickedOnHud = true;}

    // If the rectangle tool is selected, start drawing a rectangle
    if (view.tool == "rectangle" && !clickedOnHud) {
        initialMouseX = Math.round(((mouseX - width / 2) / view.zoom + view.x) / gridSize) * gridSize;
        initialMouseY = Math.round(((mouseY - height / 2) / view.zoom + view.y) / gridSize) * gridSize;
        
        tmpMapObject = {
            x: initialMouseX,
            y: initialMouseY,
            width: 0,
            height: 0,
            type: tileSelect.value()
        }
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

    if (!clickedOnHud) {
        if (view.tool == "rectangle") {
            currentMouseX = Math.round(((mouseX - width / 2) / view.zoom + view.x) / gridSize) * gridSize;
            currentMouseY = Math.round(((mouseY - height / 2) / view.zoom + view.y) / gridSize) * gridSize;
            
            tmpMapObject.width = currentMouseX - initialMouseX;
            tmpMapObject.height = currentMouseY - initialMouseY;
        
        } else if (view.tool == "touch") {
            currentMouseX = Math.floor(((mouseX - width / 2) / view.zoom + view.x) / gridSize) * gridSize;
            currentMouseY = Math.floor(((mouseY - height / 2) / view.zoom + view.y) / gridSize) * gridSize;
    
            //Check if we're editing tiles or entities
            if(layerSelect.value() == 'Tiles') {
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

            } else if(layerSelect.value() == 'Entities') {
        
                mapObjects.entities.push({
                    x: currentMouseX,
                    y: currentMouseY,
                    width: 16,
                    height:16,
                    type: tileSelect.value()
                });
            }
            
        } else if (view.tool == "delete" && layerSelect.value() == 'Tiles'){
            currentMouseX = Math.floor(((mouseX - width / 2) / view.zoom + view.x) / gridSize) * gridSize;
            currentMouseY = Math.floor(((mouseY - height / 2) / view.zoom + view.y) / gridSize) * gridSize;
    
            for (var i = 0; i < mapObjects.tiles.length; i++) {
                if (currentMouseX == mapObjects.tiles[i].x && currentMouseY == mapObjects.tiles[i].y) {
                    mapObjects.tiles.splice(i, 1);
                }
            }
            
        } else if(view.tool == "delete" && layerSelect.value() == 'Entities') {
            currentMouseX = Math.floor((mouseX - width / 2) / view.zoom + view.x);
            currentMouseY = Math.floor((mouseY - height / 2) / view.zoom + view.y);
    
            for (var i = 0; i < mapObjects.entities.length; i++) {
                if (currentMouseX > mapObjects.entities[i].x && currentMouseY > mapObjects.entities[i].y && currentMouseX < mapObjects.entities[i].x + mapObjects.entities[i].width && currentMouseY < mapObjects.entities[i].y + mapObjects.entities[i].height) {
                    mapObjects.entities.splice(i, 1);
                }
            }
        }
    }
}

function mouseReleased() {
    clickedOnHud = false;
    if (view.tool == "rectangle") {
        var widthTileNum = Math.abs(tmpMapObject.width / gridSize);
        var heightTileNum = Math.abs(tmpMapObject.height / gridSize);

        
        if(tmpMapObject.width != 0 && tmpMapObject.height != 0) {
            //Check if we're editing tiles or entities
            //Deletes any tiles that are in the same location as the new tiles
            if(layerSelect.value() == 'Tiles') {
                for(var i = 0; i < mapObjects.tiles.length; i++) {
                    if(mapObjects.tiles[i].x >= tmpMapObject.x &&
                            mapObjects.tiles[i].x < tmpMapObject.x + tmpMapObject.width &&
                            mapObjects.tiles[i].y >= tmpMapObject.y &&
                            mapObjects.tiles[i].y < tmpMapObject.y + tmpMapObject.height) {
    
                        mapObjects.tiles.splice(i, 1);
                        i--;
                    }
                }

            } else if(layerSelect.value() == 'Entities') {
                //Entities can overlap
            }

            //Push new tiles
            if(layerSelect.value() == 'Tiles') {
                for (var i = 0; i < heightTileNum; i++) {
                    for (var j = 0; j < widthTileNum; j++) {
                        mapObjects.tiles.push({
                            x: (tmpMapObject.width < 0 ? tmpMapObject.x - gridSize + j * gridSize * -1 : tmpMapObject.x + j * gridSize * 1),
                            y: (tmpMapObject.height < 0 ? tmpMapObject.y - gridSize + i * gridSize * -1 : tmpMapObject.y + i * gridSize * 1),
                            type: tileSelect.value()
                        });
                    }
                }
            } else if(layerSelect.value() == 'Entities') {
                /*for (var j = 0; j < widthTileNum; j++) {
                    mapObjects.entities.push({
                        x: (tmpMapObject.width < 0 ? tmpMapObject.x - gridSize + j * gridSize * -1 : tmpMapObject.x + j * gridSize * 1),
                        y: (tmpMapObject.height < 0 ? tmpMapObject.y - gridSize + i * gridSize * -1 : tmpMapObject.y + i * gridSize * 1),
                        type: tileSelect.value()
                    });
                }*/
                mapObjects.entities.push({
                    x: (tmpMapObject.width < 0 ? tmpMapObject.x + tmpMapObject.width : tmpMapObject.x),
                    y: (tmpMapObject.height < 0 ? tmpMapObject.y + tmpMapObject.height : tmpMapObject.y),
                    width: Math.abs(tmpMapObject.width),
                    height: Math.abs(tmpMapObject.height),
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

module.exports = {
    view
}
