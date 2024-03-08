let krill;      //name of sprite(s) go here

function preload() {
    //                  x,   y,  w,  h    where: x, y are position on canvas 
 	krill = new Sprite(240, 135, 64, 32);
	krill.spriteSheet = 'assets/krillTopdownWalk.png';
	krill.anis.offset.x = 2;             //
	krill.anis.frameDelay = 10;          //controls how quickly frames are switched between

	krill.addAnis({
		walk: { row: 0, frames: 6 },     //row determined by height(px) of sprite(I think??)
		stand: { row: 0, frames: 1 }
	});
	krill.changeAni('walk');
}

function setup() {
    //           w,   h  note: at this scale preview on vscode is kinda weird but looks good on browser to me
	new Canvas(480, 270, 'pixelated');     
	allSprites.pixelPerfect = true;
}

function draw() {
	clear();

    krill.speed = 1.5;            //try some other speeds, I like 1.5  

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
        krill.changeAni('walk');
        krill.mirror.x = true; 
    }
    else if(kb.pressing('up')){ 
        krill.direction = -90; 
        krill.changeAni('walk');
        krill.mirror.x = false; 
    }
    else{
        krill.speed = 0; 
        krill.changeAni('stand');
    } 

}