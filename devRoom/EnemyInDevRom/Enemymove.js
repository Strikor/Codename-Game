let sheetImg;
let tLcorner, tRcorner, bLcorner, bRcorner, vWall, hWall;
let pWall, rWall, rrWall, aWall, bWall, cWall, dWall, Iht, Ihb, Ivr, Ivl, sqr;
let room;
let krill;
let enemy;
let allWallGroups = [];
let detectionRange = 200;

function preload() {
    sheetImg = loadImage('assets/walls16.png');      //replaced with self-created graphics
    //                  x,   y,  h,  w    where: x, y are position on canvas 
    krill = new Sprite(240, 135, 64, 32);
    krill.spriteSheet = 'assets/krillWalk4D.png';
    krill.anis.offset.x = 2;             //
    krill.anis.frameDelay = 10;          //controls how quickly frames are switched between
    krill.addAnis({
        walk: { row: 0, frames: 6 },     //row determined by height(px) of sprite(I think??)
        standh: { row: 0, frames: 1 },
    });
    krill.layer = 1;
    krill.collider = 'dynamic';
    krill.changeAni('walk');

    enemy = new Sprite(400, 135, 32, 32);
    enemy.spriteSheet = 'assets/enemyWalk.png';
    enemy.anis.offset.x = 2;             //
    enemy.anis.frameDelay = 10;          //controls how quickly frames are switched between
    enemy.addAnis({
        walk: { row: 0, frames: 6 },     //row determined by height(px) of sprite(I think??)
        stand: { row: 0, col:3},
    });
    enemy.changeAni('walk');

    enemy.originalPosition = createVector(enemy.position.x, enemy.position.y);
    enemy.collider = 'none'; //no colissions yet
    enemy.speed = 1;
    enemy.rotationLock = true;

    //enemy setup
    //  enemy = {
    //     x: 400, // X position
    //     y: 135, // Y position
    //     size: 32, // Size of the circle representing the enemy
    //     speed: 1, // Movement speed
    //     direction: 0, // Initial movement direction (right)
    //     moveLimit: 200, // Distance the enemy moves before turning around
    //     originalX: 400 // Original X position to calculate movement limit
    // };
}

function setup() {
    createCanvas(1280, 720, 'pixelated x2'); //may display better with 'pixelated x2' 
    allSprites.pixelPerfect = true;

    tLcorner = new Group();
    tLcorner.collider = "static";
    tLcorner.spriteSheet = sheetImg;
    tLcorner.addAni({ h: 16, w: 16, row: 9, col: 7 })
    tLcorner.tile = '1';

    tRcorner = new Group();
    tRcorner.collider = "static";
    tRcorner.spriteSheet = sheetImg;
    tRcorner.addAni({ h: 16, w: 16, row: 1, col: 13 })
    tRcorner.tile = '2';

    bLcorner = new Group();
    bLcorner.collider = "static";
    bLcorner.spriteSheet = sheetImg;
    bLcorner.addAni({ h: 16, w: 16, row: 13, col: 1 })
    bLcorner.tile = '3';

    bRcorner = new Group();
    bRcorner.collider = "static";
    bRcorner.spriteSheet = sheetImg;
    bRcorner.addAni({ h: 16, w: 16, row: 9, col: 9 })
    bRcorner.tile = '4';

    vWall = new Group();
    vWall.collider = "static";
    vWall.spriteSheet = sheetImg;
    vWall.addAni({ h: 16, w: 16, row: 6, col: 1 })
    vWall.tile = 'v';

    hWall = new Group();
    hWall.collider = "static";
    hWall.spriteSheet = sheetImg;
    hWall.addAni({ h: 16, w: 16, row: 3, col: 6 })
    hWall.tile = 'h';

    pWall = new Group(); // perpendicular
    pWall.collider = "static";
    pWall.spriteSheet = sheetImg;
    pWall.addAni({ h: 16, w: 16, row: 13, col: 7 })
    pWall.tile = 'p';

    rWall = new Group();
    rWall.collider = "static";
    rWall.spriteSheet = sheetImg;
    rWall.addAni({ h: 16, w: 16, row: 4, col: 3 })
    rWall.tile = 'r';

    rrWall = new Group();
    rrWall.collider = "static";
    rrWall.spriteSheet = sheetImg;
    rrWall.addAni({ h: 16, w: 16, row: 14, col: 13 })
    rrWall.tile = '>';

    aWall = new Group();
    aWall.collider = "static";
    aWall.spriteSheet = sheetImg;
    aWall.addAni({ h: 16, w: 16, row: 3, col: 3 })
    aWall.tile = 'a';

    bWall = new Group();
    bWall.collider = "static";
    bWall.spriteSheet = sheetImg;
    bWall.addAni({ h: 16, w: 16, row: 11, col: 13 })
    bWall.tile = 'b';

    cWall = new Group();
    cWall.collider = "static";
    cWall.spriteSheet = sheetImg;
    cWall.addAni({ h: 16, w: 16, row: 13, col: 11 })
    cWall.tile = 'c';

    Iht = new Group();
    Iht.collider = "static";
    Iht.spriteSheet = sheetImg;
    Iht.addAni({ h: 16, w: 16, row: 11, col: 12 })
    Iht.tile = '-';

    Ihb = new Group();
    Ihb.collider = "static";
    Ihb.spriteSheet = sheetImg;
    Ihb.addAni({ h: 16, w: 16, row: 13, col: 12 })
    Ihb.tile = '_';

    Ivr = new Group();
    Ivr.collider = "static";
    Ivr.spriteSheet = sheetImg;
    Ivr.addAni({ h: 16, w: 16, row: 12, col: 13 })
    Ivr.tile = '+';

    Ivl = new Group();
    Ivl.collider = "static";
    Ivl.spriteSheet = sheetImg;
    Ivl.addAni({ h: 16, w: 16, row: 12, col: 11 })
    Ivl.tile = '*';

    sqr = new Group();
    sqr.collider = "static";
    sqr.spriteSheet = sheetImg;
    sqr.addAni({ h: 16, w: 16, row: 12, col: 12 })
    sqr.tile = '~';

    dWall = new Group();
    dWall.collider = "static";
    dWall.spriteSheet = sheetImg;
    dWall.addAni({ h: 16, w: 16, row: 13, col: 9 })
    dWall.tile = 'd';

    allWallGroups.push(tLcorner);
    allWallGroups.push(tRcorner);

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
        16, 16, //px from left of canvas, px from top of canvas
        16, 16  //h, w in px of each tile
    )
    //room h = 30, w = 32

}

function draw() {
    background('pink')  //maybe make some sort of sciency blue gradient for final product ~~(. _ .)~~

    //---------------------------For Slow Tiles ---------------------------------------
    // Convert krill's position to tile coordinates
    //still trying to add this part, need help

    //---------------------------Krill Controls----------------------------------------
    // set krill speed
    krill.speed = 2;


    if (kb.pressing('left') && kb.pressing('down')) {
        krill.rotation = -45;
        krill.direction = 135;        //direction of movement: R = 0, L = 180, up = -90, down = 90
        krill.changeAni('walk');
        krill.mirror.x = true;        //since ani is right facing, need to mirror
    }
    else if (kb.pressing('right') && kb.pressing('down')) {
        krill.rotation = 45;
        krill.direction = 45;
        krill.changeAni('walk');
        krill.mirror.x = false;
    }
    else if (kb.pressing('left') && kb.pressing('up')) {
        krill.rotation = 45;           //ensure the hitBox around the sprite follows its change in direction
        krill.direction = -135;
        krill.changeAni('walk');
        krill.mirror.x = true;
    }
    else if (kb.pressing('right') && kb.pressing('up')) {
        krill.rotation = -45;
        krill.direction = -45;
        krill.changeAni('walk');
        krill.mirror.x = false;
    }

    else if (kb.pressing('left')) {
        krill.rotation = 0;
        krill.direction = 180;        //direction of movement: R = 0, L = 180, up = -90, down = 90
        krill.changeAni('walk');
        krill.mirror.x = true;        //since ani is right facing, need to mirror
    }
    else if (kb.pressing('right')) {
        krill.rotation = 0;
        krill.direction = 0;
        krill.changeAni('walk');
        krill.mirror.x = false;
    }
    else if (kb.pressing('down')) {
        krill.rotation = -90;           //ensure the hitBox around the sprite follows its change in direction
        krill.direction = 90;
        krill.changeAni('walk');
        krill.mirror.x = true;
    }
    else if (kb.pressing('up')) {
        krill.rotation = -90;
        krill.direction = -90;
        krill.changeAni('walk');
        krill.mirror.x = false;
    }
    else {
        if (krill.direction == 90) {
            krill.speed = 0;
            krill.rotation = 90;
            krill.changeAni('standh');
            krill.mirror.x = false;
        }
        else if (krill.direction == -90) {
            krill.speed = 0;
            krill.rotation = 90;
            krill.changeAni('standh');
            krill.mirror.x = true;
        }
        else {
            krill.speed = 0;
            krill.rotation = 0;
            krill.changeAni('standh');
        }
    }
    krill.rotationLock = true;   //keeps enemy from spinning when hitting wall
    krill.debug = true;
    updateEnemy()

}

function updateEnemy() {
    let distanceToKrill = dist(enemy.position.x, enemy.position.y, krill.position.x, krill.position.y);
    // let distanceToOriginal = dist(enemy.position.x, enemy.position.y, enemy.originalPosition.x, enemy.originalPosition.y);

    // Create vectors for positions
    let krillPos = createVector(krill.position.x, krill.position.y);
    let originalPos = createVector(enemy.originalPosition.x, enemy.originalPosition.y);

    if (distanceToKrill < 200) {  // If the Krill is within the chase range
        // Vector pointing from the enemy to the Krill
        let chaseVector = p5.Vector.sub(krillPos, enemy.position);
        chaseVector.setMag(enemy.speed);  // Set the magnitude of the vector to the enemy's speed
        enemy.velocity.x = chaseVector.x;
        enemy.velocity.y = chaseVector.y;
        
        //changing sprite animation along with movemnet of enemy
        //directions>> L: vel x < 0, R: vel x > 0, U: vel y < 0, D: vel y > 0
        //rotation: L: positive, R: negative, D: 0, U: 180, L: 90, R: -90
        if (enemy.velocity.x < 0 && enemy.velocity.y > 0) {     
            enemy.rotation = 45;                             
            enemy.changeAni('walk');
            enemy.mirror.x = false;        
        }
        else if (enemy.velocity.x > 0 && enemy.velocity.y > 0) {
            enemy.rotation = -45;
            enemy.changeAni('walk');
            enemy.mirror.x = false;
        }
        else if (enemy.velocity.x < 0 && enemy.velocity.y < 0) {
            enemy.rotation = 135;           
            enemy.changeAni('walk');
            enemy.mirror.x = false;
        }
        else if (enemy.velocity.x > 0 && enemy.velocity.y < 0) {
            enemy.rotation = -135;
            enemy.changeAni('walk');
            enemy.mirror.x = false;
        }
        else if (enemy.velocity.x < 0) {
            enemy.rotation = 90;
            enemy.changeAni('walk');
            enemy.mirror.x = true;        
        }
        else if (enemy.velocity.x > 0) {
            enemy.rotation = -90;
            enemy.changeAni('walk');
            enemy.mirror.x = false;
        }
        else if (enemy.velocity.y > 0) {
            enemy.rotation = 0;          
            enemy.changeAni('walk');
            enemy.mirror.x = false;
        }
        else if (enemy.velocity.y < 0) {
            enemy.rotation = 180;
            enemy.changeAni('walk');
            enemy.mirror.x = false;
        }
    } else {  // If the enemy needs to return to its original position
        // Vector pointing from the enemy to its original position
        let returnVector = p5.Vector.sub(originalPos, enemy.position);
        returnVector.setMag(enemy.speed);  // Set the magnitude of the vector to the enemy's speed
        enemy.velocity.x = returnVector.x;
        enemy.velocity.y = returnVector.y;
    }
}