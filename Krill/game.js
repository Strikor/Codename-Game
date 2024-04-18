let state = "editor";

let ents = [];

var krill = null; 
var spriteImg = null;
let krillHealth = 100; // Initial health
const maxKrillHealth = 100; // Maximum health
const futureOffset = 100;  //Pixels from present map to future map

let mapArray;
let map;

//let statements for enemy
let enemy;
let allWallGroups = [];
let detectionRange = 200;  

function preload(){
    state = "title";
    loadTileSprites();
    preloadTitle();
    //preloadGame();
    //Basically nothing should ever be put here
    mapArray = loadStrings('./assets/testMapPresent.txt');  //default map

    mapArrayLVL1P = loadStrings('./assets/mapLVL1P.txt');
}

function preloadGame() {
    krillAniDefine(); //rewrote as function line 412
    door1AniDefine(); //rewrote as function line 431
    door2AniDefine(); //each door will be dif sprite

    // this part works, update enemy/movement isnt working as of 4/10/24 4:30pm
    /*
    enemyAniDefine(); //untested as function
    */
    inFuture = false;
    findMaxRoomWidth();
    offsetR = futureOffset + maxRoomWidth;
    offsetR *= 16; //pixels
}

function setupGame(m) {
    new Canvas(640, 360, 'pixelated x3'); //may display better with 'pixelated x2'
    loadTiles();

    //Larger Layers
    let layers = m.split('\n\n');

    //Map Lines
    let lines = layers[0].split('\n');

    //Entities
    let tmpEnts = layers[1].split('\n');
    for(let i = 0; i < tmpEnts.length; i++) {
        let tmp = tmpEnts[i].split(' ');
        ents.push({
            type: tmp[0],
            x: tmp[1],
            y: tmp[2],
            width: tmp[3],
            height: tmp[4]
        });
    }

    for(let i = 0; i < ents.length; i++) {
        if(ents[i].type == 'krillSpawn') {
            krill.x = ents[i].x;
            krill.y = ents[i].y;
            ents.splice(i, 1);
            break;

        }
    }

    room = new Tiles(lines, 15, 16, 16, 16);
    room.layer = 0; 
    roomFuture = new Tiles(lines, 15, 16, 16, 16);

    console.log("room created");
    console.log(room);

    findMaxRoomWidth();
    console.log("max room width: ", maxRoomWidth);
}


function setup() {
    if (state === "title") {
        setupTitle();
    } else if (state === "game") {
        createCanvas(640, 360, 'pixelated x3'); //may display better with 'pixelated x2'
        loadTiles();

        //default map
        room = new Tiles( 
            mapArrayLVL1P,
            16,16, //px from left of canvas, px from top of canvas
            16,16  //h, w in px of each tile
        );


        //console.log(maxRoomWidth);
        roomFuture = new Tiles(
            mapArrayLVL1P,
            offsetR,16, // change to const + maxlength of mapArray[i]*16 ex: 16 + 32*16
            16,16
        );

        
        ents.push({type: 'krillSpawn', x: 64, y: 64, width: 16, height: 16});
        ents.push({type: 'krillHurt', x: 272, y: 368, width: 160, height: 128}); //needs to be updated with map

        for(let i = 0; i < ents.length; i++) {
            if(ents[i].type == 'krillSpawn') {
                krill.x = ents[i].x;
                krill.y = ents[i].y;
                ents.splice(i, 1);
                break;

            }
        }
    }
    
    //Basically nothing else should be put here either
}

function draw() {
    if (state === "title") {
        drawTitle();
    } else if (state === "game") { 
        drawGame();
    }
    //Also don't put stuff here
}

function drawGame() {
    background('lightgray');  //maybe make some sort of sciency blue gradient for final product ~~(. _ .)~~s
    console.log(krill.x + ", " + krill.y);

    //translate(width / 2, height / 2);
    camera.x = krill.x + krill.width / 2;
    camera.y = krill.y + krill.height / 2;

    if(debugMode != undefined && debugMode == true){
        //camera.zoom = 2;

        //Debug draw triggers
        camera.on();
        for (var i = 0; i < ents.length; i++) {
            // Add entity types as needed. Sprites can also be added here
            if (ents[i].type == "krillSpawn") {
                fill(129,84,146, 100);
            } else if (ents[i].type == "krillHurt") {
                fill(70,32,85, 100);
            } else if (ents[i].type == "krillGoal") {
                fill(201,179,32, 100);
            } else if (ents[i].type == "slowTile") {
                fill(0, 119, 190, 100);
            }
            rect(ents[i].x, ents[i].y, ents[i].width, ents[i].height);
        }
        camera.off();
    }
    //scale(playerCamera.zoom);
    //translate(-playerCamera.x, -playerCamera.y);

    //Impliment a level based draw system

    if (krill.status == 'slowed') {
        krill.speed = 1;
    } else {
        krill.speed = 2;
    }
    //Krill movement controls
    krillMovement(); //now a function! line 39
    //Fixes js rounding error with sprite position
    krill.x = Math.round(krill.x);
    krill.y = Math.round(krill.y);
    //krill.rotationLock = true;          
    //krill.debug = true; 
    
    //door1 open/close controls
    camera.on();    //keeps text where I want it
    door1Movement();
    door2Movement(); 
    camera.off();

    //updateEnemy(); //not working as of 4/10/24 4:30pm
    timeTravel();
    triggers();
}

function postDraw() {
    drawHealthBar();
}

let tmpFrameCounter = 0;//Micilanious frame counter for triggers to use
function triggers() {
    for(let i = 0; i < ents.length; i++) {
        if(ents.length != 0 && krill.x + krill.width > ents[i].x && krill.x < ents[i].x + ents[i].width && krill.y + krill.height > ents[i].y && krill.y < ents[i].y + ents[i].height) {
            if(ents[i].type == 'krillHurt') {
                tmpFrameCounter++;
                if(tmpFrameCounter % 60 == 0) {//Every 60 frames
                    tmpFrameCounter = 0;
                    krillHealth -= 1;
                }
                
            } else if(ents[i].type == 'krillGoal') {
                console.log("You win!");
                //Add win condition here

            } else if(ents[i].type == 'slowTile') {
                krill.status = 'slowed';

            }
        } else {//This is the default tile, when not triggering set back to defaults
            krill.status = 'alive';
            tmpFrameCounter = 0;
            console.log("Default tile");
        }
    }
    console.log(krill.speed);
}


function drawHealthBar() {
    // Display health bar for the krill
    fill('red');
    rect(100, 10, 200, 20); // Red background
    fill(0, 255, 0);
    let remainingHealth1 = constrain(krillHealth, 0, 100); // Ensure health is between 0 and 100
    rect(100, 10, remainingHealth1 * 2, 20); // Green bar representing remaining health
    fill(0);
    textSize(25);
    text("krill", 10, 25);
    //this part of the code is for testing the bar only, we will remove it later
    if(mouseIsPressed){
        krillHealth -= 0.5;
        
     }
     if(krillHealth <0){
        krillHealth = 0;
       
     }
    
}

function mouseClicked() {
    if (state === "title") {
        mouseClickedTitle();
    }
}

function findMaxRoomWidth(){
/*
    //find width of room
    roomHeight = mapArray.length(); //roomHeight
    let max = 0;
    for (i=0; i<roomHeight; ++i){ //iterate through lines
        let rowLength = mapArray[i];
        if (rowLength > max){
            max = rowLength;
        } else { max = max; }
    }
    maxRoomWidth = max;
    */

    let max = mapArray[0].length;
    for (let i = 1; i < mapArray.length; ++i) {
        let stringLength = mapArray[i].length;
        if (stringLength > max) {
            max = stringLength;
        }
    }
    maxRoomWidth = max;
}

function timeTravel() {
    if (!inFuture){ //in present
        if (kb.presses('t')){
            krill.x += offsetR -16; //change to var
            inFuture = true;
        }
    } else if (inFuture) { //in future
        if (kb.presses('t')){
            krill.x -= offsetR -16; //change to var
            inFuture = false;
        }
    } else {
        inFuture = false;
    }
    
}

//sprite functionality below \/\/\/\/\/
function krillAniDefine(){
    //krill ani preload
    //                  x,   y,  h,  w    where: x, y are position on canvas 
    krill = new Sprite(240, 135, 64, 32);
    krill.spriteSheet = './assets/krillWalk4D.png';
    krill.anis.offset.x = 2;             //
    krill.anis.frameDelay = 10;          //controls how quickly frames are switched between
    krill.addAnis({
        walk: { row: 0, frames: 6 },     //row determined by height(px) of sprite(I think??)
        standh: { row: 0, frames: 1},
    });
    krill.layer = 1; 
    krill.collider = 'dynamic'; 
    krill.direction = 0;
    krill.speed = 2;
    krill.changeAni('walk');
    krill.status = 'alive';
}

function krillMovement(){
    //Krill movement controls, 4 directional
    if (kb.pressing('left')){
        krill.rotation = 0;
        krill.direction = 180;        //direction of movement: R = 0, L = 180, up = -90, down = 90
        krill.changeAni('walk');
    	krill.mirror.x = true;        //since ani is right facing, need to mirror
    } else if (kb.pressing('right')){
        krill.rotation = 0;
        krill.direction = 0; 
        krill.changeAni('walk');
    	krill.mirror.x = false;
    } else if(kb.pressing('down')){ 
        krill.rotation = -90;           //ensure the hitBox around the sprite follows its change in direction
        krill.direction = 90; 
        krill.changeAni('walk');
        krill.mirror.x = true; 
    } else if(kb.pressing('up')){ 
        krill.rotation = -90; 
        krill.direction = -90; 
        krill.changeAni('walk');
        krill.mirror.x = false;
    } else {
        krill.speed = 0; 
        if (krill.direction == 90){
            krill.rotation = 90; 
            krill.changeAni('standh');
            krill.mirror.x = false;
        } else if ( krill.direction == -90){
            krill.rotation = 90; 
            krill.changeAni('standh');
            krill.mirror.x = true;
        } else{
            krill.rotation = 0; 
            krill.changeAni('standh');
        }
    }
}

//doors, so many doors omg they operate differently so they need to be dif sprites
function door1AniDefine(){
    //door ani preload
    //spawn:            x,  y, 
    door1 = new Sprite(302, 344, 16, 64);
    door1.spriteSheet = 'assets/door4.png';
    door1.anis.offset.x = 2;             //
    door1.anis.frameDelay = 10;          //controls how quickly frames are switched between
    door1.addAnis({
        closed: { row: 0, frames: 6 },     //row determined by height(px) of sprite
        open: { row: 1, frames: 6},
        opening: {row: 2, frames: 6},
        closing: {row: 3, frames: 5},
    });
    door1.rotationLock = 'true';
    door1.collider = "static";
    door1.layer = 0; 
    door1.changeAni('closed'); 
}

function door1Movement(){
    if(abs(krill.y - door1.y) < 30 && abs(door1.x - krill.x) < 90){           //basically: if within vicinity of door
        if(door1.collider != 'none'){              //if not open, e opens, if open e closes
            textSize(11);
            text('press [e] to open ', door1.x - 150, door1.y - 32);
            if(kb.presses('e')){
                door1.changeAni(['opening', 'open']); 
            }
            if (door1.ani.name == 'open'){
                door1.collider = 'none'; 
            }
        } else if (door1.collider == 'none'){
            textSize(11);
            text('press [e] to close', door1.x - 150, door1.y - 32);
            if(kb.presses('e')){ 
                door1.collider = 'static'; 
                door1.changeAni(['closing', 'closed']); 
            }
        }
    }
}

//so far just same mechanic dif spawn point
function door2AniDefine(){
    //door ani preload
    //spawn:            x,  y, 
    door2 = new Sprite(398, 344, 16, 64);
    door2.spriteSheet = 'assets/door4.png';
    door2.anis.offset.x = 2;             //
    door2.anis.frameDelay = 10;          //controls how quickly frames are switched between
    door2.addAnis({
        closed: { row: 0, frames: 6 },     //row determined by height(px) of sprite
        open: { row: 1, frames: 6},
        opening: {row: 2, frames: 6},
        closing: {row: 3, frames: 5},
    });
    door2.rotationLock = 'true';
    door2.collider = "static";
    door2.layer = 0; 
    door2.changeAni('closed'); 
}

function door2Movement(){
    if(abs(krill.y - door2.y) < 30 && abs(door2.x - krill.x) < 90){           //basically: if within vicinity of door
        if(door2.collider != 'none'){              //if not open, e opens, if open e closes
            textSize(11);
            text('press [e] to open ', door2.x + 30, door2.y - 32);
            if(kb.presses('e')){
                door2.changeAni(['opening', 'open']); 
            }
            if (door2.ani.name == 'open'){
                door2.collider = 'none'; 
            }
        } else if (door2.collider == 'none'){
            textSize(11);
            text('press [e] to close', door2.x + 30, door2.y - 32);
            if(kb.presses('e')){ 
                door2.collider = 'static'; 
                door2.changeAni(['closing', 'closed']); 
            }
        }
    }
}

//non-working state 4/10/24 4:30pm
//function update enemy, for some reason enemy is not moving at all, tried a few things nothing worked :(
function enemyAniDefine(){
    //enemy ani preload
    enemy = new Sprite(400, 135, 32, 32);
    enemy.spriteSheet = 'assets/enemyWalk.png';
    enemy.anis.offset.x = 2;             //
    enemy.anis.frameDelay = 10;          //controls how quickly frames are switched between
    enemy.addAnis({
        walk: { row: 0, frames: 6 },     //row determined by height(px) of sprite(I think??)
        stand: { row: 0, frames: 1},
    });
    enemy.changeAni('stand');

    enemy.originalPosition = createVector(enemy.position.x, enemy.position.y);
    enemy.collider = 'none'; //no colissions yet
    enemy.speed = 1;
    enemy.rotationLock = true;
}

function updateEnemy() {
    let distanceToKrill = dist(enemy.position.x, enemy.position.y, krill.position.x, krill.position.y);
    // let distanceToOriginal = dist(enemy.position.x, enemy.position.y, enemy.originalPosition.x, enemy.originalPosition.y);

    // Create vectors for positions
    let krillPos = createVector(krill.position.x, krill.position.y);
    let originalPos = createVector(enemy.originalPosition.x, enemy.originalPosition.y);

    if (distanceToKrill < 200) {  // If the Krill is within the chase range
        // Vector pointing from the enemy to the Krill
        let chaseVector = p5.Vector.sub(krillPos, enemy.position);
        chaseVector.setMag(enemy.speed);  // Set the magnitude of the vector to the enemy's speed
        enemy.velocity.x = chaseVector.x;
        enemy.velocity.y = chaseVector.y;
        
        //changing sprite animation along with movement of enemy
        if (enemy.velocity.x < 0 && enemy.velocity.y > 0) {     
            enemy.rotation = 45;                             
            enemy.changeAni('walk');
            enemy.mirror.x = false;        
        }
        else if (enemy.velocity.x > 0 && enemy.velocity.y > 0) {
            enemy.rotation = -45;
            enemy.changeAni('walk');
            enemy.mirror.x = false;
        }
        else if (enemy.velocity.x < 0 && enemy.velocity.y < 0) {
            enemy.rotation = 135;           
            enemy.changeAni('walk');
            enemy.mirror.x = false;
        }
        else if (enemy.velocity.x > 0 && enemy.velocity.y < 0) {
            enemy.rotation = -135;
            enemy.changeAni('walk');
            enemy.mirror.x = false;
        }
        else if (enemy.velocity.x < 0) {
            enemy.rotation = 90;
            enemy.changeAni('walk');
            enemy.mirror.x = true;        
        }
        else if (enemy.velocity.x > 0) {
            enemy.rotation = -90;
            enemy.changeAni('walk');
            enemy.mirror.x = false;
        }
        else if (enemy.velocity.y > 0) {
            enemy.rotation = 0;          
            enemy.changeAni('walk');
            enemy.mirror.x = false;
        }
        else if (enemy.velocity.y < 0) {
            enemy.rotation = 180;
            enemy.changeAni('walk');
            enemy.mirror.x = false;
        }
    } else {  // If the enemy needs to return to its original position
        // Vector pointing from the enemy to its original position
        let returnVector = p5.Vector.sub(originalPos, enemy.position);
        returnVector.setMag(enemy.speed);  // Set the magnitude of the vector to the enemy's speed
        enemy.velocity.x = returnVector.x;
        enemy.velocity.y = returnVector.y;
    }
}

//for mocha/chai tests
module.exports = {
    state, 
    preload, 
    setup, 
    draw, 
} 
