let sheetImg; 
let tLcorner, tRcorner, bLcorner, bRcorner, vWall, hWall; 
let pWall, rWall, rrWall, aWall, bWall, cWall, dWall;

function loadGroupSprites(){
    sheetImg = loadImage('./assets/walls32.png');      //replaced with self-created graphics
}

function loadGroups() {
    tLcorner = new Group();
    tLcorner.collider = "static"; 
    tLcorner.spriteSheet= sheetImg; 
    tLcorner.addAni({h:32, w: 32, row: 4, col: 3})
    tLcorner.tile = '1'; 

    tRcorner = new Group();
    tRcorner.collider = "static"; 
    tRcorner.spriteSheet= sheetImg; 
    tRcorner.addAni({w:32, h:32, row:0, col:6})
    tRcorner.tile = '2'; 

    bLcorner = new Group();
    bLcorner.collider = "static"; 
    bLcorner.spriteSheet= sheetImg; 
    bLcorner.addAni({w:32, h:32, row:6, col:0})
    bLcorner.tile = '3'; 

    bRcorner = new Group();
    bRcorner.collider = "static"; 
    bRcorner.spriteSheet= sheetImg; 
    bRcorner.addAni({w:32, h:32, row:4, col:4})
    bRcorner.tile = '4'; 

    vWall = new Group();
    vWall.collider = "static";  
    vWall.spriteSheet= sheetImg; 
    vWall.addAni({w:32, h:32, row:4, col:5})
    vWall.tile = 'v'; 
    
    hWall = new Group();
    hWall.collider = "static";  
    hWall.spriteSheet= sheetImg; 
    hWall.addAni({w:32, h:32, row:5, col:4})
    hWall.tile = 'h'; 

    pWall = new Group(); // perpendicular
    pWall.collider = "static";
    pWall.spriteSheet=sheetImg;
    pWall.addAni({w:32, h:32, row:6, col:3})
    pWall.tile = 'p';

    rWall = new Group();
    rWall.collider = "static";
    rWall.spriteSheet=sheetImg;
    rWall.addAni({w:32, h:32, row:4, col:3})
    rWall.tile = 'r';

    rrWall = new Group();
    rrWall.collider = "static";
    rrWall.spriteSheet=sheetImg;
    rrWall.addAni({w:32, h:32, row:2, col:6})
    rrWall.tile = '>';

    aWall = new Group();
    aWall.collider = "static";
    aWall.spriteSheet=sheetImg;
    aWall.addAni({w:32, h:32, row:1, col:1})
    aWall.tile = 'a';

    bWall = new Group();
    bWall.collider = "static";
    bWall.spriteSheet=sheetImg;
    bWall.addAni({w:32, h:32, row:5, col:6})
    bWall.tile = 'b';

    cWall = new Group();
    cWall.collider = "static";
    cWall.spriteSheet=sheetImg;
    cWall.addAni({w:32, h:32, row:6, col:5})
    cWall.tile = 'c';

    dWall = new Group();
    dWall.collider = "static";
    dWall.spriteSheet=sheetImg;
    dWall.addAni({w:32, h:32, row:6, col:4})
    dWall.tile = 'd';



}