let sheetImg, floorSheet, fs, ps; 
let tLcorner, tRcorner, bLcorner, bRcorner, vWall, hWall; 
let pWall, rWall, rrWall, aWall, bWall, cWall, dWall, conL, conR, conD;
let wood, square, rugCorner; 
let room;
var dim;
let connecting;

let ftLcorner, ftRcorner, fbLcorner, fbRcorner, fvWall,  fhWall,  fpWall,  fconL,   fconR,   fconD;   

//chang to recieve string, then recall load
function loadTileSprites(){
    sheetImg = loadImage('assets/walls16.png');      //replaced with self-created graphics
    futureWallImg = loadImage('assets/walls16FB.png'); 
    floorSheet = loadImage('assets/floor.png'); 
}

function loadTiles(){
    //walls
    
    tLcorner = tileMaker('1', 9, 7, 's', sheetImg); 
    tRcorner = tileMaker('2', 1, 13, 's', sheetImg); 
    bLcorner = tileMaker('3', 13, 1, 's', sheetImg); 
    bRcorner = tileMaker('4', 9, 9, 's', sheetImg); 
    vWall = tileMaker('v', 6, 1, 's', sheetImg); 
    hWall = tileMaker('h', 3, 6, 's', sheetImg); 
    pWall = tileMaker('p', 13, 7, 's', sheetImg); 
    //rrWall = tileMaker('>', 14, 13, 's', sheetImg); 
    //aWall = tileMaker('a', 3, 3, 's', sheetImg); 
    //bWall = tileMaker('b', 11, 13, 's', sheetImg); 
    //cWall = tileMaker('c', 13, 11, 's', sheetImg); 
    //dWall = tileMaker('d', 13, 9, 's', sheetImg); 
    //tile connections unmapped below, needed for switch from 32px tiles to 16px \/\/\/\/
    //Iht = tileMaker('-', 11, 12, 's', sheetImg); 
    //Ihb = tileMaker('_', 13, 12, 's', sheetImg); 
    //Ivr = tileMaker('+', 12, 13, 's', sheetImg); 
    //Ivl = tileMaker('*', 12, 11, 's', sheetImg); 
    //sqr = tileMaker('~', 12, 12, 's', sheetImg); 
    conL = tileMaker('@', 5, 1, 's', sheetImg); 
    conR = tileMaker('!', 7, 13, 's', sheetImg); 
    conD = tileMaker('?', 1, 5, 's', sheetImg); 

    //future walls
    ftLcorner = tileMaker('5', 9,  7,  's',  futureWallImg); 
    ftRcorner = tileMaker('6', 1,  13, 's',  futureWallImg); 
    fbLcorner = tileMaker('7', 13, 1,  's',  futureWallImg); 
    fbRcorner = tileMaker('8', 9,  9,  's',  futureWallImg); 
    fvWall =    tileMaker('l', 6,  1,  's',  futureWallImg); 
    fhWall =    tileMaker('m', 3,  6,  's',  futureWallImg); 
    fpWall =    tileMaker('n', 13, 7,  's',  futureWallImg); 
    fconL =     tileMaker('e', 5,  1,  's',  futureWallImg); 
    fconR =     tileMaker('i', 7,  13, 's',  futureWallImg); 
    fconD =     tileMaker('k', 1,  5,  's',  futureWallImg); 

    //floors
    wood = tileMaker('`', 1, 0, 'n', floorSheet); 
    square = tileMaker('/', 0, 1, 'n', floorSheet);
    squareHoleL = tileMaker('G', 0, 3, 's', floorSheet);
    squareHoleR = tileMaker('H', 1, 3, 's', floorSheet);
    square1 = tileMaker('o', 0, 2, 'n', floorSheet);
    square1HoleL = tileMaker('Q', 2, 3, 's', floorSheet);
    square1HoleR = tileMaker('W', 3, 3, 's', floorSheet);
    rug1 = tileMaker('Z', 2, 0, 'n', floorSheet);
    rug2 = tileMaker('X', 2, 2, 'n', floorSheet);
    rug3 = tileMaker('A', 2, 1, 'n', floorSheet);
    rug4 = tileMaker('B', 3, 2, 'n', floorSheet);
    red = tileMaker('q', 3, 1, 'n', floorSheet);
    rugCorner =  tileMaker('j', 3, 0, 'n', floorSheet);
    

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


function tileMaker(char, aniRow, aniCol, collider, sh){
      temp = new Group();
      temp.collider = collider; 
      if (sh == floorSheet){ dim = 32; }
      else { dim = 16; }
      temp.spriteSheet= sh; 
      temp.addAni({h:dim, w:dim, row: aniRow, col: aniCol});
      temp.tile = char;
      return temp; 
}