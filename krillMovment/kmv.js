let krill, enemy;      //name of sprite(s) go here

function preload() {
    //                  x,   y,  w,  h    where: x, y are position on canvas 
 	krill = new Sprite(240, 135, 32, 64);
	krill.spriteSheet = 'assets/krillWalk4D.png';
	krill.anis.offset.x = 0;             //
	krill.anis.frameDelay = 10;          //controls how quickly frames are switched between
   

	krill.addAnis({
		walk: { row: 0, frameSize: [64, 32], frames: 6 },     //row determined by height(px) of sprite(I think??)
        //standh: { row: 0, frames: 1},
        standv: { row: 1, frameSize: [32, 64], frames: 1},
		up: { row: 1, frameSize: [32, 64], frames: 6 }
	});

    krill.collider = 'dynamic'; 

    krill.rotationSpeed = 0;
	krill.changeAni('walk');
    
    
}

function setup() {
    //           w,   h  note: at this scale preview on vscode is kinda weird but looks good on browser to me
	new Canvas(480, 270, 'pixelated');     
	allSprites.pixelPerfect = true;

    enemy = new Sprite(270, 30, 70, 10);
    enemy.collider = 'static';  
}

function draw() {
	clear();
    krill.speed = 1.5;            //try some other speeds, I like 1.5  

    if (kb.pressing('left')){
        krill.w = 64;
        krill.h = 32;
        krill.direction = 180;        //direction of movement: R = 0, L = 180, up = -90, down = 90
        krill.changeAni('walk');
    	krill.mirror.x = true;        //since ani is right facing, need to mirror
    }
    else if (kb.pressing('right')){
        krill.w = 64;
        krill.h = 32;
        krill.direction = 0; 
        krill.changeAni('walk');
    	krill.mirror.x = false;
    } 
    else if(kb.pressing('down')){ 
        krill.direction = 90; 
        krill.changeAni('up');
        krill.mirror.y = true;  
    }
    else if(kb.pressing('up')){ 
        krill.direction = -90; 
        krill.changeAni('up');
        krill.mirror.x = false; 
    }
    else{
        krill.speed = 0; 
        krill.changeAni('standv');
        krill.mirror.x=false;
        krill.mirror.y=false;
        krill.w = 32;
        krill.h = 64;
    } 

    krill.debug = true;


}


// some notes: 
// because the spite is assymetrical the animations are of different height and width so this messes up 
// collision, as seen with my simple wall sprite thingy, there are two ways to go about this
// 1. keep it as is, one sprite, two different animation sizes, somehow deal with collision some other way
// 2. have two different sprites, 1 for up/down, 1, for l/r 
// 3. set the sprite h/w to some constant number and have the actual drawings be larger than this, thus
//    making it so the hit box doesnt actually line up
// I am not sure what direction to go with this so some feedback would be greatly appreciated
