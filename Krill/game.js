let state = "editor";

let ents = [];

var krill = null; 
var spriteImg = null;
let krillHealth = 100; // Initial health
const maxKrillHealth = 100; // Maximum health

function preload(){
    state = "title";
    loadTileSprites();
    loadKrillAni();
    preloadTitle();
    //preloadGame();
    //Basically nothing should ever be put here
    
}

function preloadGame() {
    //krill ani preload
    //                  x,   y,  h,  w    where: x, y are position on canvas 
    krill = new Sprite(240, 135, 64, 32);
    krill.spriteSheet = spriteImg;
    krill.anis.offset.x = 2;             //
    krill.anis.frameDelay = 10;          //controls how quickly frames are switched between
    krill.addAnis({
        walk: { row: 0, frames: 6 },     //row determined by height(px) of sprite(I think??)
        standh: { row: 0, frames: 1},
    });
    krill.layer = 1; 
    krill.collider = 'dynamic'; 
    krill.direction = 0;
    krill.changeAni('walk');

    //door ani preload
    //spawn:            x,  y, 
    door = new Sprite(510, 88, 16, 64);
    door.spriteSheet = 'assets/door4.png';
    door.anis.offset.x = 2;             //
    door.anis.frameDelay = 10;          //controls how quickly frames are switched between
    door.addAnis({
        closed: { row: 0, frames: 6 },     //row determined by height(px) of sprite
        open: { row: 1, frames: 6},
        opening: {row: 2, frames: 6},
        closing: {row: 3, frames: 5},
    });
    door.rotationLock = 'true';
    door.collider = "static";
    door.layer = 0; 
    door.changeAni('closed'); 
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

    console.log("room created");
    console.log(room);
}

function setup() {
    if (state === "title") {
        setupTitle();
    } else if (state === "game") {
        createCanvas(640, 360, 'pixelated x3'); //may display better with 'pixelated x2'
        loadTiles();
    
        //default map
        room = new Tiles( 
            [
                '1hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh2',
                'v..............................v',
                'v..............................v', //made periods for door location
                'v...............................', //
                'v...............................', //
                'v...............................', //
                'v...............................',
                'v..............................v',
                'v..............................v',
                'v..............................v',
                'v..............................v',
                'v..............................v',
                'v..............................v',
                'v..............................v',
                'v..............................v',
                'v..............................v',
                'v..............................v',
                'v..............................v',
                'v..............................v',
                'v.......................a-b....v',
                'v.......................*~+....v',
                'v..............1hhd.....c_>....v',
                'v..............v..........v....v',
                'v..............v..........v....v',
                'v..............v..........v....v',
                'v..............v..........v....v',
                'v..............v..........v....v',
                'v..............v..........v....v',
                'v..............v..........v....v',
                'v..............v..........v....v',
                '3hhhhhhhhhhhhhhphhhhhhhhhhphhhh4'
            ],
            16,16, //px from left of canvas, px from top of canvas
            16,16  //h, w in px of each tile
        );

        
        ents.push({type: 'krillSpawn', x: 64, y: 64, width: 16, height: 16});
        ents.push({type: 'krillHurt', x: 272, y: 368, width: 160, height: 128});

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
                fill(70,32,85, 100);//Due to strong color the opacity needs to be even lower
            }
            rect(ents[i].x, ents[i].y, ents[i].width, ents[i].height);
        }
        camera.off();
    }
    //scale(playerCamera.zoom);
    //translate(-playerCamera.x, -playerCamera.y);

    //Impliment a level based draw system
    
    //Krill movement controls, must be in draw fxn ----------------------------------------------------------------
    krill.speed = 2; 
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
    } else{
        if (krill.direction == 90){
            krill.speed = 0; 
            krill.rotation = 90; 
            krill.changeAni('standh');
            krill.mirror.x = false;
        } 
        else if ( krill.direction == -90){
            krill.speed = 0; 
            krill.rotation = 90; 
            krill.changeAni('standh');
            krill.mirror.x = true;
        }
        else{
            krill.speed = 0; 
            krill.rotation = 0; 
            krill.changeAni('standh');
        }
    }
    //door open/close controls
    if(krill.x > 440 && krill.y < 120){           //basically: if within vicinity of door
        if(door.collider != 'none'){              //if not open, e opens, if open e closes
            textSize(11);
            text('press [e] to open ', door.x - 150, door.y - 32);
            if(kb.presses('e')){
                door.changeAni(['opening', 'open']); 
            }
            if (door.ani.name == 'open'){
                door.collider = 'none'; 
            }
        } else if (door.collider == 'none'){
            textSize(11);
            text('press [e] to close', door.x - 150, door.y - 32);
            if(kb.presses('e')){ 
                door.collider = 'static'; 
                door.changeAni(['closing', 'closed']); 
            }
        }
    }
    //Fixes js rounding error with sprite position
    krill.x = Math.round(krill.x);
    krill.y = Math.round(krill.y);

    triggers();
    
    //krill.rotationLock = true;          //keeps sprite from spinning when hitting wall
    //krill.debug = true; //uncomment line as needed
    //------------------------------------------------------------------------------------------------------------

    drawHealthBar();
    checkKrillHealth();
}

let tmpFrameCounter = 0;//Micilanious frame counter for triggers to use
function triggers() {
    for(let i = 0; i < ents.length; i++) {
        if(krill.x + krill.width > ents[i].x && krill.x < ents[i].x + ents[i].width && krill.y + krill.height > ents[i].y && krill.y < ents[i].y + ents[i].height) {
            if(ents[i].type == 'krillHurt') {
                tmpFrameCounter++;
                if(tmpFrameCounter % 60 == 0) {//Every 60 frames
                    tmpFrameCounter = 0;
                    krillHealth -= 1;
                }
                
            }
        }
    }
    //console.log(krill.x + ", " + krill.y);
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

  
  // Function to show the modal with game over message
  function showGameOverModal() {
    var modal = document.getElementById("gameOverModal");
    modal.style.display = "block"; // Display the modal
  }
  

  
  // Function to check krill's health and display game over modal if it's zero
  function checkKrillHealth() {
    if (krillHealth <= 0) {
        noLoop();
      showGameOverModal();
    }
  }