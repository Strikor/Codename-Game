# Collision Test Room

## Walls and collision

For this test room, I used the p5.js tile use the example files Sophia added as a starting point, and adjusted the room to fit our game design. 

For the walls I used the provided 7x7.png file. Each coordinate in the file can be selected individually, and all possible wall combinations are available in this file. 

The wall collision is set to static, and the krill collision is dynamic(default).


## Krill png and sprite

I also coverted the krill gif to a png and removed the background so that it appeared more natural.

I removed the background using the GIMP photo editing software and this youtube video: https://www.youtube.com/watch?v=C8MwTo_B1Lc 

This is how I added the krill pixel art to the sprite:
spriteImg = loadImage('krillTrim3.png');
krill.spriteSheet = spriteImg;
krill.addAni({});

The krill is not animated because I saved it as a static file, but I think this addAni() function or the loadAni() function will allow us to use the dynamic animation.


## Krill movement

The krill movement is very basic, I did not implement the movement mechanisms our team has done yet.

## Walls32.png Usage 

The png file consists of 8 X 8 tiles, each being 32x32 px, the top left blank tile is row 0, col 0, the 
bottom right corner, also blank, is row 7, col 7. 
