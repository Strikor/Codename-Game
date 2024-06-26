let state = "editor";

//computer screen puzzle stuffs
let compStat = "notComp";
let sprSh, indicators;
let doorUnlock, D1, D2;
let D1locked = false;
let D2locked = true;

let fspr, comp, desk1, chair1, chair2, chair3, couch1, desk2, desk3, table1;
const furnArray = [];
let compX = 58;
let compY = 320;

let doorspr, door, door1, door2, door3, door4, exit;
const doorArray = [];

//used in ents.push line 155
let kSx = 80; 
let kSy = 750; 

let ents = [];
var krill = null;
let speed = 0;
var spriteImg = null;
let krillHealth = 100; // Initial health
const maxKrillHealth = 100; // Maximum health
const futureOffset = 100;  //Pixels from present map to future map
let numJumps = 0; //iterated when player jumps to future
let test = 0;

let mapArray;
let map;

let Level1Music;
let DeathSound;
let TimeTravelSound;
let AlarmSound;
let LevelCompleteSound;
let MeowSound;

//let statements for enemy
var enemies = [];

function preloadGameSounds(){
    Level1Music = loadSound('/archive/GameSounds/CodeNameKrill-Level1Music.mp3');
    DeathSound = loadSound('/archive/GameSounds/CodeNameKrill-DeathSound.mp3');
    TimeTravelSound = loadSound('/archive/GameSounds/CodeNameKrill-TimeTravlingSound.mp3');
    AlarmSound = loadSound('/archive/GameSounds/Danger Alarm Sound Effect.mp3');
    LevelCompleteSound = loadSound('/archive/GameSounds/Krill-level-completed.mp3');
    MeowSound = loadSound('/archive/GameSounds/meowsoundsforKrill.mp3');
}

function level1musicloop(){
    Level1Music.play();
    Level1Music.loop();
    Level1Music.setVolume(0.2);
}

function preload(){
    state = "title";
    loadTileSprites();
    preloadTitle();
    preloadGameSounds();
    
    //preloadGame();
    //Basically nothing should ever be put here
    mapArray = loadStrings('./assets/testMapPresent.txt');  //default map
    mapArrayLVL1P = loadStrings('./assets/mapLVL1P.txt');
    mapArrayLVL1F = loadStrings('./assets/mapLVL1F.txt'); 
    floorMap = loadStrings('./assets/floorMap.txt'); 
    floorMapF = loadStrings('./assets/floorFuture.txt');
    //loading images for sprite ani
    sprSh = loadImage('assets/compScreen.png');
    indicators = loadImage('assets/indicators.png');
    fspr = loadImage('assets/deskF.png');
    doorspr = loadImage('assets/door4.png');
}

function preloadGame() {
    //ani defines for sprites
    krillAniDefine();

    doorAniDefine();
    doorArray.push(door1 = doorSpawn(462, 344, 0));
    doorArray.push(door2 = doorSpawn(622, 104, 0));
    doorArray.push(door3 = doorSpawn(622, 520, 0));
    doorArray.push(door4 = doorSpawn(904, 718, 90));
    doorArray.push(exit = doorSpawn(1070, 232, 0));    //win door

    setUpCompScreen();
    setUpDB();

    //makes sure furniture is spawned only once
    furnitureAniDefine();
    //lab01: corner of wall = 16, 16
    furnArray.push(comp = furnitureSpawn(0, 58, 320, 0));
    furnArray.push(chair = furnitureSpawn(7, comp.x + 46, comp.y - 48, 0));
    furnArray.push(desk1 = furnitureSpawn(1, 58, 100, 0));
    furnArray.push(chair1 = furnitureSpawn(4, desk1.x + 48, desk1.y, 0));
    furnArray.push(table1 = furnitureSpawn(6, 386, 96, 0));
    furnArray.push(chair2 = furnitureSpawn(4, table1.x - 98, table1.y, 180));
    furnArray.push(chair3 = furnitureSpawn(4, table1.x, table1.y + 92, 90));
    furnArray.push(couch1 = furnitureSpawn(5, 206, 400, 90));
    furnArray.push(sTable = furnitureSpawn(8, (couch1.x + 80), couch1.y - 8, 180));

    //hall: TL corner of wall = 464, 16 
    furnArray.push(sTable1 = furnitureSpawn(8, 545, 48, 0));

    //room attached to hall/office: TL corner of wall = 16, 432
    furnArray.push(oDesk1 = furnitureSpawn(1, 100, 468, 90));
    furnArray.push(oChair1 = furnitureSpawn(4, oDesk1.x, oDesk1.y + 48, 90));
    furnArray.push(oDesk2 = furnitureSpawn(2, oDesk1.x + 132, oDesk1.y, 90));
    furnArray.push(oChair2 = furnitureSpawn(7, oDesk2.x - 32, oDesk2.y + 45, 90));
    oDesk2.mirror.y = true;
    furnArray.push(oDesk3 = furnitureSpawn(3, oDesk2.x + 87, 508, -180));
    furnArray.push(oChair3 = furnitureSpawn(7, oDesk3.x - 48, oDesk3.y + 23, 180));
    furnArray.push(oDesk4 = furnitureSpawn(2, 60, 644, 0));
    furnArray.push(oChair4 = furnitureSpawn(7, oDesk4.x + 48, oDesk4.y - 40, 0));
    furnArray.push(oDesk5 = furnitureSpawn(0, oDesk4.x + 87, oDesk4.y + 40, -90));
    furnArray.push(oChair5 = furnitureSpawn(7, oDesk5.x, oDesk4.y - 8, -90));
    furnArray.push(oCouch = furnitureSpawn(5, oDesk5.x + 328, oDesk5.y + 12, 90));
    furnArray.push(oTable = furnitureSpawn(8, oCouch.x + 80, oCouch.y - 8, 90));
    furnArray.push(oChair6 = furnitureSpawn(7, oTable.x, oTable.y - 48, 0));

    //lobby: TL corner of wall = 624, 16
    //Lab02: TL corner of wall = 624, 432
    //K.R.I.L.: TL corner of wall = 16, 720
    /*
    
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
    for (let i = 0; i < tmpEnts.length; i++) {
        let tmp = tmpEnts[i].split(' ');
        ents.push({
            type: tmp[0],
            x: tmp[1],
            y: tmp[2],
            width: tmp[3],
            height: tmp[4]
        });
    }

    for (let i = 0; i < ents.length; i++) {
        if (ents[i].type == 'krillSpawn') {
            krill.x = ents[i].x;
            krill.y = ents[i].y;
            ents.splice(i, 1);
            break;

        }
    }

    room = new Tiles(lines, 15, 16, 16, 16);
    room.layer = 1;
    roomFuture = new Tiles(lines, 15, 16, 16, 16);

    floor = new Tiles(lines, 32, 32, 32, 32);
    floor.layer = 0;

    console.log("room created");
    console.log(room);

    findMaxRoomWidth();
    console.log("max room width: ", maxRoomWidth);
}

function loadEnemies() {
    createEnemy(540, 105);
    createEnemy(165, 65);
    createEnemy(71, 562);
}
function setup() {
    if (state === "title") {
        setupTitle();
    } else if (state === "game") {
        createCanvas(640, 360, 'pixelated'); //may display better with 'pixelated x2'
        loadTiles();
        loadEnemies();

        floor = new Tiles(
            floorMap,
            32, 32,
            32, 32
        );
        floor.layer = 0;


        floorF = new Tiles(
            floorMapF, 
            (offsetR + 16), 32, 
            32,32
        );
        floorF.layer = 0; 
 
        //default map
        room = new Tiles(
            mapArrayLVL1P,
            16, 16, //px from left of canvas, px from top of canvas
            16, 16  //h, w in px of each tile
        );
        room.layer = 1;

        //console.log(maxRoomWidth);
        roomFuture = new Tiles(
            mapArrayLVL1F,
            offsetR,16, // change to const + maxlength of mapArray[i]*16 ex: 16 + 32*16
            16,16
        );


        ents.push({ type: 'krillSpawn', x: kSx, y: kSy, width: 16, height: 16 });
        ents.push({ type: 'krillHurt', x: 272, y: 368, width: 160, height: 128 }); //needs to be updated with map

        for (let i = 0; i < ents.length; i++) {
            if (ents[i].type == 'krillSpawn') {
                krill.x = ents[i].x;
                krill.y = ents[i].y;
                ents.splice(i, 1);
                break;

            }
        }
        level1musicloop();
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
    background('black');  //maybe make some sort of sciency blue gradient for final product ~~(. _ .)~~s
    console.log(krill.x + ", " + krill.y);
    //translate(width / 2, height / 2);
    camera.x = krill.x + krill.width / 2;
    camera.y = krill.y + krill.height / 2;

    if (debugMode != undefined && debugMode == true) {
        //camera.zoom = 2;
        //Debug draw triggers
        camera.on();
        for (var i = 0; i < ents.length; i++) {
            // Add entity types as needed. Sprites can also be added here
            if (ents[i].type == "krillSpawn") {
                fill(129, 84, 146, 100);
            } else if (ents[i].type == "krillHurt") {
                fill(70, 32, 85, 100);
            } else if (ents[i].type == "krillGoal") {
                fill(201, 179, 32, 100);
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


    //door1 open/close controls
    camera.on();    //keeps text where I want it
    doorMovementLock(door1, D1locked);
    doorMovementLock(door2, D2locked);
    doorMovementNoLock(door3);
    doorMovementNoLock(door4);
    doorMovementNoLock(exit);  //win door movement 
    camera.off();

    //computerInteraction, if not in future
    if (abs(krill.y - compY) < 30 && abs(compX - krill.x) < 90) {
        if (compStat != "comp" && kb.pressed('e')) {
            compStat = "comp";
            setUpCompScreen();
            setUpDB();
        }
        if (compStat == "comp" && kb.pressed('x')) {
            compStat = "notComp";
        }
        if (compStat == "comp") {
            doorUnlock.visible = true;
            doorUnlock.collider = 's';
            computerScreen.visible = true;
            D1locked = controls(D1, D1locked);
            D2locked = controls(D2, D2locked);
        }
        else if (compStat == "notComp") {
            doorUnlock.life = 0;
            computerScreen.life = 0;
        }
    }

    //table1.text = krill.x + ' ' + krill.y;
    //else defaults to 0;
    if (krill.status != 'slowed') {
        speed = 3;
    }

    //Krill movement controls
    if (compStat == "comp") {
        krill.speed = 0;
        krill.collider = 'n';
    } else {
        krill.speed = speed;
        krill.collider = 'd';
        krillMovement();
    }

    //Fixes js rounding error with sprite position
    //krill.x = Math.round(krill.x);       //causes problems when krill speed >2
    //krill.y = Math.round(krill.y);
    //krill.rotationLock = true;          
    //krill.debug = true; 

    timeTravel();
    triggers();
}



//function definitions\/\/\/\/\/
function postDraw() {
    drawHealthBar();
}

let tmpFrameCounter = 0;//Micilanious frame counter for triggers to use
function triggers() {
    for (let i = 0; i < ents.length; i++) {
        if (ents.length != 0 && krill.x + krill.width > ents[i].x && krill.x < ents[i].x + ents[i].width && krill.y + krill.height > ents[i].y && krill.y < ents[i].y + ents[i].height) {
            if (ents[i].type == 'krillHurt') {
                tmpFrameCounter++;
                if (tmpFrameCounter % 60 == 0) {//Every 60 frames
                    tmpFrameCounter = 0;
                    krillHealth -= 1;
                }

            } else if (ents[i].type == 'krillGoal') {
                console.log("You win!");
                //Add win condition here

            } else if (ents[i].type == 'slowTile') {
                krill.status = 'slowed';

            }
        } else {//This is the default tile, when not triggering set back to defaults
            krill.status = 'alive';
            tmpFrameCounter = 0;
            console.log("Default tile");
        }
    }
    updateEnemies(); // PLEASE DONT TOUCH, required for the enemy to function
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
    if (mouseIsPressed) {
        krillHealth -= 0.5;

    }
    if (krillHealth < 0) {
        krillHealth = 0;

    }

}

function mouseClicked() {
    if (state === "title") {
        mouseClickedTitle();
    }
}

function findMaxRoomWidth() {
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
    if (!inFuture) { //in present
        if (kb.pressed('t')) {
            krill.x += offsetR - 16; //change to var
            inFuture = true;
            if(Level1Music.isPlaying()){
                Level1Music.stop();
                TimeTravelSound.play();
            }
            level1musicloop();
            numJumps++;             //helpful to keep track
            furnArray.forEach(element => {       //moves all furniture to future
                if (element != oCouch && element != chair3){
                    element.x += (offsetR -16);
                    element.changeAni(element.ani.name + 'F'); 
                }
            });
            doorArray.forEach(element => {       //moves all doors to future
                element.x += (offsetR - 16);
            });
        }
    } else if (inFuture) { //in future
        if (kb.pressed('t')){
            krill.x -= offsetR -16; //change to var
            if(Level1Music.isPlaying()){
                Level1Music.stop();
                TimeTravelSound.play();
            }
            Level1Music.play();
            Level1Music.loop();
            Level1Music.setVolume(0.2);
            furnArray.forEach(element => {      //moves all furniture back to present
                if(element != oCouch && element != chair3){
                    element.x -= (offsetR -16);
                    element.changeAni(element.ani.name.substring(0, element.ani.name.length - 1)); 
                }
            }); 
            doorArray.forEach(element => {      //moves all door back to present
                element.x -= (offsetR - 16);
            });
            inFuture = false;
        }
    } else {
        inFuture = false;
    }

}

//sprite functionality below \/\/\/\/\/
//krill layer = 2
function krillAniDefine() {
    //krill ani preload
    krill = new Sprite();
    krill.spriteSheet = './assets/krillWalk4D.png';
    krill.anis.offset.x = 2;             //
    krill.anis.frameDelay = 10;          //controls how quickly frames are switched between
    krill.addAnis({
        walk: { row: 0, frames: 6 },     //row determined by height(px) of sprite(I think??)
        standh: { row: 0, frames: 1 },
    });
    krill.h = 32;
    krill.w = 64;
    krill.layer = 2;
    krill.collider = 'dynamic';
    krill.direction = 0;
    krill.changeAni('walk');
    krill.status = 'alive';
}
function krillMovement() {
    //Krill movement controls, 4 directional
    if (kb.pressing('left')) {
        krill.rotation = 0;
        krill.direction = 180;        //direction of movement: R = 0, L = 180, up = -90, down = 90
        krill.changeAni('walk');
        krill.mirror.x = true;        //since ani is right facing, need to mirror
    } else if (kb.pressing('right')) {
        krill.rotation = 0;
        krill.direction = 0;
        krill.changeAni('walk');
        krill.mirror.x = false;
    } else if (kb.pressing('down')) {
        krill.rotation = -90;           //ensure the hitBox around the sprite follows its change in direction
        krill.direction = 90;
        krill.changeAni('walk');
        krill.mirror.x = true;
    } else if (kb.pressing('up')) {
        krill.rotation = -90;
        krill.direction = -90;
        krill.changeAni('walk');
        krill.mirror.x = false;
    } else {
        krill.speed = 0;
        if (krill.direction == 90) {
            krill.rotation = 90;
            krill.changeAni('standh');
            krill.mirror.x = false;
        } else if (krill.direction == -90) {
            krill.rotation = 90;
            krill.changeAni('standh');
            krill.mirror.x = true;
        } else {
            krill.rotation = 0;
            krill.changeAni('standh');
        }
    }
}

//doors, so many doors omg they operate differently so they need to be dif sprites
// door layer = 1, below krill
function doorAniDefine() {
    //door ani preload
    door = new Group();
    door.spriteSheet = doorspr;
    door.anis.offset.x = 2;             //
    door.anis.frameDelay = 2;          //controls how quickly frames are switched between
    door.addAnis({
        closed: { row: 0, frames: 6, frameDelay: 5, h: 64, w: 16 },     //row determined by height(px) of sprite
        open: { row: 1, frames: 6, frameDelay: 5, h: 64, w: 16 },
        opening: { row: 2, frames: 6, h: 64, w: 16 },
        closing: { row: 3, frames: 5, h: 64, w: 16 },
    });
    door.rotationLock = 'true';
    door.collider = "static";
}

//standardized door placement
function doorSpawn(x, y, direction) {
    thing = new door.Sprite();
    thing.x = x;
    thing.y = y;
    thing.rotation = direction;
    thing.rotationLock = 'true';
    thing.collider = "static";
    thing.layer = 1;
    thing.changeAni('closed');
    return thing;
}

//for doors with bool locks that need unlocked with the computer
function doorMovementLock(spr, lock) {
    if (abs(krill.y - spr.y) < 30 && abs(spr.x - krill.x) < 90) {           //basically: if within vicinity of door
        if (spr.collider != 'none' && !lock) {              //if not open, e opens, if open e closes
            if (kb.presses('e')) {
                spr.changeAni(['opening', 'open']);
            }
            if (spr.ani.name == 'open') {
                spr.collider = 'none';
            }
        } else if (spr.collider != 'none' && lock) {
            if (kb.presses('e')) {
                //do nothing 
            }
        } else if (spr.collider == 'none') {
            if (kb.presses('e')) {
                spr.collider = 'static';
                spr.changeAni(['closing', 'closed']);
            }
        }
    }
}

//doors with no locks
let val1, val2;
function doorMovementNoLock(spr) {
    if (spr.rotation != 0) {
        val1 = 90;
        val2 = 30;
    } else {
        val1 = 30;
        val2 = 90;
    }
    if (abs(krill.y - spr.y) < val1 && abs(spr.x - krill.x) < val2) {           //basically: if within vicinity of door
        if (spr.collider != 'none') {              //if not open, e opens, if open e closes
            if (kb.presses('e')) {
                spr.changeAni(['opening', 'open']);
            }
            if (spr.ani.name == 'open') {
                spr.collider = 'none';
            }
        } else if (spr.collider == 'none') {
            if (kb.presses('e')) {
                spr.collider = 'static';
                spr.changeAni(['closing', 'closed']);
            }
        }
    }
}

//computerScreen.layer = 5, arbitrary, just needs to be above krill and tiles
function setUpCompScreen() {
    computerScreen = new Sprite(compX + 50, compY + 13, 300, 300);
    computerScreen.spriteSheet = sprSh;
    computerScreen.addAnis({
        screen: { row: 0, frames: 1, h: 156, w: 300 }
    });
    computerScreen.collider = 'n';
    computerScreen.changeAni('screen');
    computerScreen.layer = 5;
    computerScreen.visible = false;
}

//doorUnlock buttons, layer = 6, above compScreen
function setUpDB() {
    doorUnlock = new Group();
    doorUnlock.spriteSheet = indicators;
    doorUnlock.addAnis({
        nL: { row: 0, frames: 1, h: 9, w: 48 },
        nU: { row: 1, frames: 1, h: 9, w: 48 },
        yL: { row: 2, frames: 1, h: 9, w: 48 },
        yU: { row: 3, frames: 1, h: 9, w: 48 }

    })
    doorUnlock.visible = false;
    doorUnlock.collider = 'n';
    doorUnlock.anis.frameDelay = 5;

    D1 = new doorUnlock.Sprite();
    D1.x = compX + 61;
    D1.y = compY - 15;
    D1.layer = 6;
    D1.changeAni('nL');

    D2 = new doorUnlock.Sprite();
    D2.x = compX + 61;
    D2.y = compY - 4;
    D1.layer = 6;
    D2.changeAni('nL');
}

function controls(spr, locked) {
    doorUnlock.visible = true;
    computerScreen.visible = true;
    if (spr.mouse.hovering() && locked) {
        spr.changeAni('yL');
    } else if (spr.mouse.hovering() && !locked) {
        spr.changeAni('yU');
    } else if (!spr.mouse.hovering() && !locked) {
        spr.changeAni('nU');
    } else if (!spr.mouse.hovering() && locked) {
        spr.changeAni('nL');
    }
    if (locked == true && spr.mouse.presses()) {
        spr.changeAni('yU');
        locked = false;
    } else if (locked == false && spr.mouse.presses()) {
        spr.changeAni('yL');
        locked = true;
    }
    return locked;
}

//maybe turn into a group of sprites for all tables/furniture
//layer = 1, same as door
function furnitureAniDefine() {
    furniture = new Group();
    furniture.spriteSheet = fspr;
    furniture.addAnis({
      comp: { row: 0, frames: 1, h:128, w:48 },
      compF: {row: 0, col: 1, frames: 1, h:128, w:48 },
      desk1: { row: 1, frames: 1, h:128, w:48},
      desk1F: {row: 1, col: 1, frames: 1, h:128, w:48 },
      desk2: { row: 2, frames: 1, h:128, w:48},
      desk2F: {row: 2, col: 1, frames: 1, h:128, w:48 },
      desk3: { row: 0, col: 2, frames: 1, h:128, w:48},
      desk3F: {row: 0, col: 9, frames: 1, h:128, w:48 },
      chairs: { row: 1, col: 2, frames: 1, h:128, w:48},
      chairsF: { row: 1, col: 3, frames: 1, h:128, w:48},
      chair: { row: 3, col: 6, frames: 1, h:48, w:48},
      chairF: { row: 3, col: 7, frames: 1, h:48, w:48},
      sTable: { row: 3, col: 8, frames: 1, h:48, w:48},
      sTableF: { row: 3, col: 9, frames: 1, h:48, w:48},
      couch: { row: 1, col: 4, frames: 1, h:128, w:48},
      couchF: { row: 1, col: 5, frames: 1, h:128, w:48},
      table: { row: 0, col: 1, frames: 1, h:128, w:144},
      tableF: { row: 0, col: 2, frames: 1, h:128, w:144},
    })
    furniture.collider = 's';
}
function furnitureSpawn(type, x, y, direction) {
    item = new furniture.Sprite();
    item.x = x;
    item.y = y;
    item.rotation = direction;
    item.rotationLock = 'true';
    item.collider = "static";
    item.layer = 1;
    switch (type) {
        case 0:
            item.changeAni('comp');
            break;
        case 1:
            item.changeAni('desk1');
            break;
        case 2:
            item.changeAni('desk2');
            break;
        case 3:
            item.changeAni('desk3');
            break;
        case 4:
            item.changeAni('chairs');
            break;
        case 5:
            item.changeAni('couch');
            break;
        case 6:
            item.h = 128;
            item.w = 144;
            item.changeAni('table');
            break;
        case 7:
            item.h = 48;
            item.w = 48;
            item.changeAni('chair');
            break;
        case 8:
            item.h = 48;
            item.w = 48;
            item.changeAni('sTable');
            break;
        default:
            item.changeAni('desk1');
    }
    return item;
}

//for mocha/chai tests
module.exports = {
    state,
    preload,
    setup,
    draw,
}

// Enemy Logic and Defintions
function createEnemy(x, y) {
    var enemy = new Sprite(x, y, 32, 32);
    enemy.spriteSheet = 'assets/enemyWalk.png';
    enemy.anis.offset.x = 2;
    enemy.anis.frameDelay = 10; // Controls how quickly frames switch between animations
    enemy.addAnis({
        walk: { row: 0, frames: 6 },   // Animation for walking
        stand: { row: 0, frames: 1 },  // Animation for standing
    });
    enemy.changeAni('stand');         // Set initial animation to 'stand'
    enemy.originalPosition = createVector(x, y); // Save the original position for potential use
    enemy.collider = 'dynamic';          // Initially, no collisions are active
    enemy.speed = 1;                  // Set the initial movement speed
    enemy.rotationLock = true;        // Lock rotation if needed for simpler physics
    enemies.push(enemy);              // Add the new enemy to the global list
}

// Function to update all enemies in the game loop
function updateEnemies() {
    enemies.forEach(enemy => {
        updateEnemy(enemy); // Update each enemy based on individual properties
    });
}

function updateEnemy(enemy) {
    console.log("Updating enemy state...");
    let krillPos = createVector(krill.x, krill.y);
    let enemyPos = createVector(enemy.position.x, enemy.position.y);

    let distanceToKrill = dist(enemyPos.x, enemyPos.y, krillPos.x, krill.y);
    console.log("Distance to Krill:", distanceToKrill);

    let distanceFromSpawn = dist(enemyPos.x, enemyPos.y, enemy.originalPosition.x, enemy.originalPosition.y);

    if (distanceToKrill < 200) {
        let chaseVector = p5.Vector.sub(krillPos, enemyPos);
        chaseVector.setMag(1);
        enemy.velocity = chaseVector;
        console.log("Chasing Krill:", chaseVector);
    } else if (distanceFromSpawn > 100) {
        let returnVector = p5.Vector.sub(createVector(enemy.originalPosition.x, enemy.originalPosition.y), enemyPos);
        returnVector.setMag(1);
        enemy.velocity = returnVector;
        console.log("Returning to spawn:", returnVector);
    } else {
        if (!enemy.roamingDirection || frameCount % 60 === 0) {
            enemy.roamingDirection = p5.Vector.random2D();
            enemy.roamingDirection.setMag(1);
            enemy.velocity = enemy.roamingDirection;
            console.log("Roaming:", enemy.roamingDirection);
        }

        handleEnemyAnimation(enemy, enemy.velocity);
    }

    function handleEnemyAnimation(enemy, velocity) {
        // Determine the animation based on the velocity
        if (velocity.mag() > 0) {
            enemy.changeAni('walk');
        } else {
            enemy.changeAni('stand');
        }
    }
}
