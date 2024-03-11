let krill, enemy;      //name of sprite(s) go here

function preload() {
    //                  x,   y,  w,  h    where: x, y are position on canvas 
 	krill = new Sprite(240, 135, 64, 32);
	krill.spriteSheet = 'assets/krillWalk4D.png';
	krill.anis.offset.x = 2;             //
	krill.anis.frameDelay = 10;          //controls how quickly frames are switched between
    

	krill.addAnis({
		walk: { row: 0, frames: 6 },     //row determined by height(px) of sprite(I think??)
        standh: { row: 0, frames: 1},
        standv: { row: 1, frameSize: [32, 64], frames: 1},
		up: { row: 1, frameSize: [32, 64], frames: 6 }
	});

    krill.collider = 'dynamic'; 

	krill.changeAni('walk');
    
    
}

function setup() {
    //           w,   h  note: at this scale preview on vscode is kinda weird but looks good on browser to me
	new Canvas(480, 270, 'pixelated');     
	allSprites.pixelPerfect = true;

    enemy = new Sprite(270, 30, 70, 10);
    enemy.collider = 'static';  
}
// Define constants for tile size and map dimensions
const TILE_SIZE = 32; // Adjust this according to your map
const MAP_WIDTH = 15; // Adjust this according to your map
const MAP_HEIGHT = 10; // Adjust this according to your map

// Define a 2D array to represent your map where each element represents a tile
// For simplicity, let's assume '0' represents regular tiles and '1' represents slow tiles
const map = [
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Function to check if a given tile is a slow zone
function isSlowTile(tileX, tileY) {
    return map[tileY][tileX] === 1;
}

function draw() {
    clear();

    // Draw the map
    for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
            // Determine the position of the tile
            let tileX = x * TILE_SIZE;
            let tileY = y * TILE_SIZE;

            // Draw regular tiles
            if (map[y][x] === 0) {
                fill(200); // Regular tile color
            }
            // Draw slow zones with a different color
            else if (map[y][x] === 1) {
                fill(255, 0, 0); // Slow zone color (red)
            }
            
          
            // Draw the tile
            rect(tileX, tileY, TILE_SIZE, TILE_SIZE);
        }
    }
    // Convert krill's position to tile coordinates
    let krillTileX = Math.floor(krill.position.x / TILE_SIZE);
    let krillTileY = Math.floor(krill.position.y / TILE_SIZE);

    // Adjust krill speed based on slow zones
    if (isSlowTile(krillTileX, krillTileY)) {
        krill.speed = 0.5; // Reduce speed when in slow zones
    } else {
        krill.speed = 2; // Restore normal speed otherwise
    }

     if (kb.pressing('left')){
        krill.direction = 180;        //direction of movement: R = 0, L = 180, up = -90, down = 90
        krill.changeAni('walk');
    	krill.mirror.x = true;        //since ani is right facing, need to mirror
    }
    else if (kb.pressing('right')){
        krill.direction = 0; 
        krill.changeAni('walk');
    	krill.mirror.x = false;
    } 
    else if(kb.pressing('down')){ 
        krill.direction = 90; 
        krill.changeAni('up');
        krill.mirror.x = true;  
    }
    else if(kb.pressing('up')){ 
        krill.direction = -90; 
        krill.changeAni('up');
        krill.mirror.x = false; 
    }
    else{
        krill.speed = 0; 
        krill.changeAni('standv');
    } 
}



// some notes: 
// because the spite is assymetrical the animations are of different height and width so this messes up 
// collision, as seen with my simple wall sprite thingy, there are two ways to go about this
// 1. keep it as is, one sprite, two different animation sizes, somehow deal with collision some other way
// 2. have two different sprites, 1 for up/down, 1, for l/r 
// 3. set the sprite h/w to some constant number and have the actual drawings be larger than this, thus
//    making it so the hit box doesnt actually line up
// I am not sure what direction to go with this so some feedback would be greatly appreciated