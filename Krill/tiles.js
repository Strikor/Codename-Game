let sheetImg, floorSheet; 
let tLcorner, tRcorner, bLcorner, bRcorner, vWall, hWall; 
let pWall, rWall, rrWall, aWall, bWall, cWall, dWall, conL, conR, conD;
let wood, square, rugCorner; 
let room;

let connecting;

//chang to recieve string, then recall load
function loadTileSprites(){
    sheetImg = loadImage('./assets/walls16.png');      //replaced with self-created graphics
    floorSheet = loadImage('./assets/floor.png'); 
}

function loadTiles() {
    tLcorner = new Group();
    tLcorner.collider = "static"; 
    tLcorner.spriteSheet= sheetImg; 
    tLcorner.addAni({h:16, w: 16, row: 9, col: 7})
    tLcorner.tile = '1'; 

    tRcorner = new Group();
    tRcorner.collider = "static"; 
    tRcorner.spriteSheet= sheetImg; 
    tRcorner.addAni({w:16, h:16, row:1, col:13})
    tRcorner.tile = '2'; 

    bLcorner = new Group();
    bLcorner.collider = "static"; 
    bLcorner.spriteSheet= sheetImg; 
    bLcorner.addAni({w:16, h:16, row:13, col:1})
    bLcorner.tile = '3'; 

    bRcorner = new Group();
    bRcorner.collider = "static"; 
    bRcorner.spriteSheet= sheetImg; 
    bRcorner.addAni({w:16, h:16, row:9, col:9})
    bRcorner.tile = '4'; 

    vWall = new Group();
    vWall.collider = "static";  
    vWall.spriteSheet= sheetImg; 
    vWall.addAni({w:16, h:16, row:6, col:1})
    vWall.tile = 'v'; 
    
    hWall = new Group();
    hWall.collider = "static";  
    hWall.spriteSheet= sheetImg; 
    hWall.addAni({w:16, h:16, row:3, col:6})
    hWall.tile = 'h'; 

    pWall = new Group(); // perpendicular
    pWall.collider = "static";
    pWall.spriteSheet=sheetImg;
    pWall.addAni({w:16, h:16, row:13, col:7})
    pWall.tile = 'p';

    /* Redundant same as 1
    rWall = new Group();
    rWall.collider = "static";
    rWall.spriteSheet=sheetImg;
    rWall.addAni({w:16, h:16, row:4, col:3})
    rWall.tile = 'r';
    */

    rrWall = new Group();
    rrWall.collider = "static";
    rrWall.spriteSheet=sheetImg;
    rrWall.addAni({w:16, h:16, row:14, col:13})
    rrWall.tile = '>';

    aWall = new Group();
    aWall.collider = "static";
    aWall.spriteSheet=sheetImg;
    aWall.addAni({w:16, h:16, row:3, col:3})
    aWall.tile = 'a';

    bWall = new Group();
    bWall.collider = "static";
    bWall.spriteSheet=sheetImg;
    bWall.addAni({w:16, h:16, row:11, col:13})
    bWall.tile = 'b';

    cWall = new Group();
    cWall.collider = "static";
    cWall.spriteSheet=sheetImg;
    cWall.addAni({w:16, h:16, row:13, col:11})
    cWall.tile = 'c';

    dWall = new Group();
    dWall.collider = "static";
    dWall.spriteSheet=sheetImg;
    dWall.addAni({w:16, h:16, row:13, col:9})
    dWall.tile = 'd';

    //tile connections unmapped below, needed for switch from 32px tiles to 16px \/\/\/\/
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

    conL = new Group();
    conL.collider = "static";
    conL.spriteSheet=sheetImg;
    conL.addAni({h:16, w: 16, row:5, col:1})
    conL.tile = '@';

    conR = new Group();
    conR.collider = "static";
    conR.spriteSheet=sheetImg;
    conR.addAni({h:16, w: 16, row:7, col:13})
    conR.tile = '!';

    conD = new Group();
    conD.collider = "static";
    conD.spriteSheet=sheetImg;
    conD.addAni({h:16, w: 16, row:1, col:5})
    conD.tile = '?';

    //floor
    wood = new Group();
    wood.collider = "none";
    wood.spriteSheet=floorSheet;
    wood.addAni({h:32, w: 32, row:1, col: 0})
    wood.tile = '`';
   

    square = new Group();
    square.collider = "none";
    square.spriteSheet=floorSheet;
    square.addAni({h:32, w: 32, row:0, col: 1})
    square.tile = '/';
  
    square1 = new Group();
    square1.collider = "none";
    square1.spriteSheet=floorSheet;
    square1.addAni({h:32, w: 32, row:0, col: 2})
    square1.tile = 'o';

    rug1 = new Group();
    rug1.collider = "none";
    rug1.spriteSheet=floorSheet;
    rug1.addAni({h:32, w: 32, row:2, col: 0})
    rug1.tile = 'Z';

    rug2 = new Group();
    rug2.collider = "none";
    rug2.spriteSheet=floorSheet;
    rug2.addAni({h:32, w: 32, row:2, col: 2});
    rug2.tile = 'X';

    rug3 = new Group();
    rug3.collider = "none";
    rug3.spriteSheet=floorSheet;
    rug3.addAni({h:32, w: 32, row:2, col: 1});
    rug3.tile = 'A';

    rug4 = new Group();
    rug4.collider = "none";
    rug4.spriteSheet=floorSheet;
    rug4.addAni({h:32, w: 32, row:2, col: 3});
    rug4.tile = 'A';

    red = new Group();
    red.collider = "none";
    red.spriteSheet = floorSheet;
    red.addAni({h:32, w: 32, row:3, col: 1});
    red.tile = 'q';

    rugCorner =  new Group();
    rugCorner.collider = "none";
    rugCorner.spriteSheet = floorSheet;
    rugCorner.addAni({h:32, w: 32, row:3, col: 0})
    rugCorner.tile = 'j';

    // Connection Mapping
    connecting = {
        '1': [2,0,2,
              0,1,1,
              2,1,0],
        '2': [2,0,2,
              1,1,0,
              0,1,2],
        '3': [2,1,0,
              0,1,1,
              2,0,2],
        '4': [0,1,2,
              1,1,0,
              2,0,2],
        'v': [2,1,2,
              0,1,0,
              2,1,2],
        'h': [2,0,2,
              1,1,1,
              2,0,2],
        'p': [0,1,0,
              1,1,1,
              2,0,2],
        '>': [1,1,2,
              1,1,0,
              0,1,0],
        'a': [2,0,2,
              0,1,1,
              2,1,1],
        'b': [2,0,2,
              1,1,0,
              1,1,2],
        'c': [2,1,1,
              0,1,1,
              2,0,2],
        'd': [2,0,2,
              1,1,0,
              2,0,2]
    }
}
module.exports = {
      loadTileSprites,
      loadTiles
}
