//import * as tiles from './tiles.js';

var krill; 

function preload(){
    loadTileSprites();
    spriteImg = loadImage('./assets/krillTrim3.png');
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

    krill = new Sprite;
    krill.spriteSheet = spriteImg;
    krill.addAni({});
    krill.collider = 'dynamic';
    
    //default map
    room = new Tiles( 
        [
            '1hhhhhhhhhhhhhhh2',
            'v...............v',
            'v...............v',
            'v...............v',
            'v...............v',
            'v...............v',
            'v....1hhd.ab....v',
            'v....v....c>....v',
            'v....v.....v....v',
            'v....v.....v....v',
            'v....v.....v....v',
            'v....v.....v....v',
            'v....v.....v....v',
            'v....v.....v....v',
            'v....v.....v....v',
            '3hhhhphhhhhphhhh4'
        ],
        15,32, //px from left of canvas, px from top of canvas
        32,32  //h, w in px of each tile
    );
    

    krill.speed = 3;
    if (kb.pressing('up')){
        krill.direction = -90;
    }

}

function draw() {
    drawGame();
}

function drawGame() {
    clear();
    background('lightgray')  //maybe make some sort of sciency blue gradient for final product ~~(. _ .)~~
    //noLoop();
}
