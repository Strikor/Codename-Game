
let sheetImg; 
let tLcorner, tRcorner, bLcorner, bRcorner, vWall, hWall;
let room; 
function preload(){
    sheetImg = loadImage('assets/7x7.png'); 
}

function setup() {
    new Canvas(960, 540, 'pixelated');
    
    tLcorner = new Group();
    tLcorner.colider = "static"; 
    tLcorner.spriteSheet= sheetImg; 
    tLcorner.addAni({h:32, w: 32, row: 4, col: 3})
    tLcorner.tile = '1'; 

    tRcorner = new Group();
    tRcorner.colider = "static"; 
    tRcorner.spriteSheet= sheetImg; 
    tRcorner.addAni({w:32, h:32, row:0, col:6})
    tRcorner.tile = '2'; 

    bLcorner = new Group();
    bLcorner.colider = "static"; 
    bLcorner.spriteSheet= sheetImg; 
    bLcorner.addAni({w:32, h:32, row:6, col:0})
    bLcorner.tile = '3'; 

    bRcorner = new Group();
    bRcorner.colider = "static"; 
    bRcorner.spriteSheet= sheetImg; 
    bRcorner.addAni({w:32, h:32, row:4, col:4})
    bRcorner.tile = '4'; 

    vWall = new Group();
    vWall.colider = "static";  
    vWall.spriteSheet= sheetImg; 
    vWall.addAni({w:32, h:32, row:4, col:5})
    vWall.tile = 'v'; 
    
    hWall = new Group();
    hWall.colider = "static";  
    hWall.spriteSheet= sheetImg; 
    hWall.addAni({w:32, h:32, row:5, col:4})
    hWall.tile = 'h'; 
    
    room = new Tiles( 
        [
            '1hhhhhhhhhhhhhhhhhhhhhhhhhhhh2',
            'v............................v',
            'v............................v',
            'v............................v',
            'v............................v',
            'v............................v',
            'v............................v',
            'v............................v',
            'v............................v',
            'v............................v',
            'v............................v',
            'v............................v',
            'v............................v',
            'v............................v',
            'v............................v',
            '3hhhhhhhhhhhhhhhhhhhhhhhhhhhh4'
        ],
        15,32, //px from left of canvas, px from top of canvas
        32,32  //h, w in px of each tile
    ) //just four walls, made to look good with aspect ration of 960 x 540
  
    
}

function draw() {
    background('skyblue')
    noLoop();
}

