//import * as tiles from './tiles.js';

var krill; 

function preload(){
    spriteImg = loadImage('assets/krillTrim3.png');
}

function startGame() {
    new Canvas(540, 540, 'pixelated'); //may display better with 'pixelated x2' 

    print('startGame');
    

    krill.speed = 3;
    if (kb.pressing('up')){
        krill.direction = -90;
    }

}

function draw() {
    background('lightgray')  //maybe make some sort of sciency blue gradient for final product ~~(. _ .)~~
    //noLoop();
}
