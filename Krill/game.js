let state = "editor";

let buffer;

var krill = null; 
var spriteImg = null;
let krillHealth = 100; // Initial health
const maxKrillHealth = 100; // Maximum health

function preload(){
    state = "title";
    loadTileSprites();
    spriteImg = loadImage('./assets/krillWalk4D.png'); 
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

}

function setupGame(m) {
    new Canvas(640, 360, 'pixelated x3'); //may display better with 'pixelated x2'
    loadTiles();

    let lines = m.split('\n');

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

    //translate(width / 2, height / 2);
    camera.x = krill.x
    camera.y = krill.y
    drawHealthBar();
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
    //Fixes js rounding error with sprite position
    krill.x = Math.round(krill.x);
    krill.y = Math.round(krill.y);
    
    //krill.rotationLock = true;          //keeps sprite from spinning when hitting wall
    //krill.debug = true; //uncomment line as needed
    //------------------------------------------------------------------------------------------------------------
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