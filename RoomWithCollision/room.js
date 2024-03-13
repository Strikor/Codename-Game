
let sheetImg, spriteImg;
let tLcorner, tRcorner, bLcorner, bRcorner, vWall, hWall;
let pWall, rWall, rrWall, aWall, bWall, cWall, dWall;
let room;
let krill;
let enemies = [];

function preload() {
    sheetImg = loadImage('walls32.png');      //replaced with self-created graphics
    spriteImg = loadImage('krillTrim3.png');
}

function setup() {
    createCanvas(540, 540, 'pixelated'); //may display better with 'pixelated x2' 

    krill = new Sprite;
    krill.spriteSheet = spriteImg;
    krill.addAni({});
    krill.collider = 'dynamic';
    // If we use the krill's image as its collider, he will rotate and will be unable to escape
    // Can we use an eclipse instead?

    krill.position = createVector(width / 2, height / 2);
    krill.speed = 3

    tLcorner = new Group();
    tLcorner.collider = "static";
    tLcorner.spriteSheet = sheetImg;
    tLcorner.addAni({ h: 32, w: 32, row: 4, col: 3 })
    tLcorner.tile = '1';

    tRcorner = new Group();
    tRcorner.collider = "static";
    tRcorner.spriteSheet = sheetImg;
    tRcorner.addAni({ w: 32, h: 32, row: 0, col: 6 })
    tRcorner.tile = '2';

    bLcorner = new Group();
    bLcorner.collider = "static";
    bLcorner.spriteSheet = sheetImg;
    bLcorner.addAni({ w: 32, h: 32, row: 6, col: 0 })
    bLcorner.tile = '3';

    bRcorner = new Group();
    bRcorner.collider = "static";
    bRcorner.spriteSheet = sheetImg;
    bRcorner.addAni({ w: 32, h: 32, row: 4, col: 4 })
    bRcorner.tile = '4';

    vWall = new Group();
    vWall.collider = "static";
    vWall.spriteSheet = sheetImg;
    vWall.addAni({ w: 32, h: 32, row: 4, col: 5 })
    vWall.tile = 'v';

    hWall = new Group();
    hWall.collider = "static";
    hWall.spriteSheet = sheetImg;
    hWall.addAni({ w: 32, h: 32, row: 5, col: 4 })
    hWall.tile = 'h';

    pWall = new Group(); // perpendicular
    pWall.collider = "static";
    pWall.spriteSheet = sheetImg;
    pWall.addAni({ w: 32, h: 32, row: 6, col: 3 })
    pWall.tile = 'p';

    rWall = new Group();
    rWall.collider = "static";
    rWall.spriteSheet = sheetImg;
    rWall.addAni({ w: 32, h: 32, row: 4, col: 3 })
    rWall.tile = 'r';

    rrWall = new Group();
    rrWall.collider = "static";
    rrWall.spriteSheet = sheetImg;
    rrWall.addAni({ w: 32, h: 32, row: 2, col: 6 })
    rrWall.tile = '>';

    aWall = new Group();
    aWall.collider = "static";
    aWall.spriteSheet = sheetImg;
    aWall.addAni({ w: 32, h: 32, row: 1, col: 1 })
    aWall.tile = 'a';

    bWall = new Group();
    bWall.collider = "static";
    bWall.spriteSheet = sheetImg;
    bWall.addAni({ w: 32, h: 32, row: 5, col: 6 })
    bWall.tile = 'b';

    cWall = new Group();
    cWall.collider = "static";
    cWall.spriteSheet = sheetImg;
    cWall.addAni({ w: 32, h: 32, row: 6, col: 5 })
    cWall.tile = 'c';

    dWall = new Group();
    dWall.collider = "static";
    dWall.spriteSheet = sheetImg;
    dWall.addAni({ w: 32, h: 32, row: 6, col: 4 })
    dWall.tile = 'd';

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
        15, 32, //px from left of canvas, px from top of canvas
        32, 32  //h, w in px of each tile
    )

    krill.speed = 3;
    if (kb.pressing('up')) {
        krill.direction = -90;
    }

    enemies.push(createEnemy(100, 100));
    enemies.push(createEnemy(100, height - 100));
}

function draw() {
    background('lightgray')  //maybe make some sort of sciency blue gradient for final product ~~(. _ .)~~
    //noLoop();

    updateKrillPosition();

    enemies.forEach(enemy => {
        if (isKrillInSight(enemy, krill)) {
            moveTowardskrill(enemy, krill);
        }
        fill(enemy.color);
        ellipse(enemy.position.x, enemy.position.y, 20, 20);
    });
}

function updateKrillPosition() {
    let speed = krill.speed;

    console.log("Krill Position:", krill.position.x, krill.position.y);

    //Direction
    if (kb.pressing('up')) {
        krill.position.y -= 1 + (speed);
    }
    if (kb.pressing('down')) {
        krill.position.y += 1 + (speed);
    }
    if (kb.pressing('left')) {
        krill.position.x -= 1 + (speed);
    }
    if (kb.pressing('right')) {
        krill.position.x += 1 + (speed);
    }

    krill.position.x = constrain(krill.position.x, 0, width - 16);
    krill.position.y = constrain(krill.position.y, 0, height - 16);

    console.log("Updated Krill Position:", krill.position.x, krill.position.y);
}

function createEnemy(x, y) {
    return {
        position: createVector(x, y),
        speed: 2,
        sightRange: 200,
        color: 'red'
    };
}

function isKrillInSight(enemy, krill) {
    // return p5.Vector.dist(enemy.position, krill.position) <= enemy.sightRange;
    // // Enemies can see through walls, is this intended?
    // // Should there be multiple types of walls? e.g. window vs wall?
}

function moveTowardsKrill(enemy, krill) {
    let direction = p5.Vector.sub(krill.position, enemy.position).normalize();
    enemy.position.add(direction.mult(enemy.speed));
}