//import * as tiles from './tiles.js';

var krill; 

function preload(){
    loadTileSprites();
    
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
    krill.changeAni('walk');
}

function setupGame(m) {
    new Canvas(540, 540, 'pixelated'); //may display better with 'pixelated x2' 

    
    console.log(m);

    //m = m.replaceAll('W', 'h');
    //m = m.replaceAll('F', '.');

    console.log(m);

    let lines = m.split('\n');

    room = new Tiles(lines, 15, 32, 32, 32);

    console.log("room created");
    console.log(room);
}

function setup() {
    new Canvas(540, 540, 'pixelated'); //may display better with 'pixelated x2' 
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

function draw() {
    drawGame();

    //Krill movement controls, must be in draw fxn ----------------------------------------------------------------
    krill.speed = 2; 
    if (kb.pressing('left')){
        krill.rotation = 0;
        krill.direction = 180;        //direction of movement: R = 0, L = 180, up = -90, down = 90
        krill.changeAni('walk');
    	krill.mirror.x = true;        //since ani is right facing, need to mirror
    }
    else if (kb.pressing('right')){
        krill.rotation = 0;
        krill.direction = 0; 
        krill.changeAni('walk');
    	krill.mirror.x = false;
    } 
    else if(kb.pressing('down')){ 
        krill.rotation = -90;           //ensure the hitBox around the sprite follows its change in direction
        krill.direction = 90; 
        krill.changeAni('walk');
        krill.mirror.x = true; 
    }
    else if(kb.pressing('up')){ 
        krill.rotation = -90; 
        krill.direction = -90; 
        krill.changeAni('walk');
        krill.mirror.x = false;
    }
    else{
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
    krill.rotationLock = true;          //keeps sprite from spinning when hitting wall
    //krill.debug = true; //uncomment line as needed
    //------------------------------------------------------------------------------------------------------------

}

function drawGame() {
    clear();
    background('lightgray')  //maybe make some sort of sciency blue gradient for final product ~~(. _ .)~~
    //noLoop();
}