
let sheetImg; 
let tLcorner, tRcorner, bLcorner, bRcorner, vWall, hWall; 
let pWall, rWall, rrWall, aWall, bWall, cWall, dWall, Iht, Ihb, Ivr, Ivl, sqr;
let room; 
let krill; 

function preload(){
    sheetImg = loadImage('walls16.png');      //replaced with self-created graphics
    spriteImg = loadImage('krillTrim3.png');
}

function setup() {
    new Canvas(540, 540, 'pixelated'); //may display better with 'pixelated x2' 

    krill = new Sprite;
    krill.spriteSheet = spriteImg;
    krill.addAni({});
    krill.collider = 'dynamic';

    
    tLcorner = new Group();
    tLcorner.collider = "static"; 
    tLcorner.spriteSheet= sheetImg; 
    tLcorner.addAni({h:16, w: 16, row: 9, col: 7})
    tLcorner.tile = '1'; 

    tRcorner = new Group();
    tRcorner.collider = "static"; 
    tRcorner.spriteSheet= sheetImg; 
    tRcorner.addAni({h:16, w: 16, row:1, col:13})
    tRcorner.tile = '2'; 

    bLcorner = new Group();
    bLcorner.collider = "static"; 
    bLcorner.spriteSheet= sheetImg; 
    bLcorner.addAni({h:16, w: 16, row:13, col:1})
    bLcorner.tile = '3'; 

    bRcorner = new Group();
    bRcorner.collider = "static"; 
    bRcorner.spriteSheet= sheetImg; 
    bRcorner.addAni({h:16, w: 16, row:9, col:9})
    bRcorner.tile = '4'; 

    vWall = new Group();
    vWall.collider = "static";  
    vWall.spriteSheet= sheetImg; 
    vWall.addAni({h:16, w: 16, row:6, col:1})
    vWall.tile = 'v'; 
    
    hWall = new Group();
    hWall.collider = "static";  
    hWall.spriteSheet= sheetImg; 
    hWall.addAni({h:16, w: 16, row:3, col:6})
    hWall.tile = 'h'; 

    pWall = new Group(); // perpendicular
    pWall.collider = "static";
    pWall.spriteSheet=sheetImg;
    pWall.addAni({h:16, w: 16, row:13, col:7})
    pWall.tile = 'p';

    rWall = new Group();
    rWall.collider = "static";
    rWall.spriteSheet=sheetImg;
    rWall.addAni({h:16, w: 16, row:4, col:3})
    rWall.tile = 'r';

    rrWall = new Group();
    rrWall.collider = "static";
    rrWall.spriteSheet=sheetImg;
    rrWall.addAni({h:16, w: 16, row:14, col:13})
    rrWall.tile = '>';

    aWall = new Group();
    aWall.collider = "static";
    aWall.spriteSheet=sheetImg;
    aWall.addAni({h:16, w: 16, row:3, col:3})
    aWall.tile = 'a';

    bWall = new Group();
    bWall.collider = "static";
    bWall.spriteSheet=sheetImg;
    bWall.addAni({h:16, w: 16, row:11, col:13})
    bWall.tile = 'b';

    cWall = new Group();
    cWall.collider = "static";
    cWall.spriteSheet=sheetImg;
    cWall.addAni({h:16, w: 16, row:13, col:11})
    cWall.tile = 'c';

    Iht = new Group();
    Iht.collider = "static";
    Iht.spriteSheet=sheetImg;
    Iht.addAni({h:16, w: 16, row:11, col:12})
    Iht.tile = '-';

    Ihb = new Group();
    Ihb.collider = "static";
    Ihb.spriteSheet=sheetImg;
    Ihb.addAni({h:16, w: 16, row:13, col:12})
    Ihb.tile = '_';

    Ivr = new Group();
    Ivr.collider = "static";
    Ivr.spriteSheet=sheetImg;
    Ivr.addAni({h:16, w: 16, row:12, col:13})
    Ivr.tile = '+';

    Ivl = new Group();
    Ivl.collider = "static";
    Ivl.spriteSheet=sheetImg;
    Ivl.addAni({h:16, w: 16, row:12, col:11})
    Ivl.tile = '*';

    sqr = new Group();
    sqr.collider = "static";
    sqr.spriteSheet=sheetImg;
    sqr.addAni({h:16, w: 16, row:12, col:12})
    sqr.tile = '~';

    dWall = new Group();
    dWall.collider = "static";
    dWall.spriteSheet=sheetImg;
    dWall.addAni({h:16, w: 16, row:13, col:9})
    dWall.tile = 'd';
    
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
        15,32, //px from left of canvas, px from top of canvas
        16,16  //h, w in px of each tile
    ) 

    krill.speed = 3;
    if (kb.pressing('up')){
        krill.direction = -90;
    }

}

function draw() {
    background('lightblue')  //maybe make some sort of sciency blue gradient for final product ~~(. _ .)~~
    //noLoop();
}
 