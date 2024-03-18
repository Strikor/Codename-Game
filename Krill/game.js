//import * as tiles from './tiles.js';

var krill; 

function preload(){
    loadGroupSprites();
    spriteImg = loadImage('./assets/krillTrim3.png');
}

function setup() {
    new Canvas(540, 540, 'pixelated'); //may display better with 'pixelated x2' 
    loadGroups();

    krill = new Sprite;
    krill.spriteSheet = spriteImg;
    krill.addAni({});
    krill.collider = 'dynamic';

    room = new Tiles( 
        [
            '1hhhhhhhhhhhhhhh2',
            'v...............v',
            'v...............v',
            'v...............v',
            'v...............v',
            'v.........ab....v',
            'v....rhhd.c>....v',
            'v....v.....v....v',
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
    )

    krill.speed = 3;
    if (kb.pressing('up')){
        krill.direction = -90;
    }

}

function draw() {
    background('lightgray')  //maybe make some sort of sciency blue gradient for final product ~~(. _ .)~~
    //noLoop();
}
