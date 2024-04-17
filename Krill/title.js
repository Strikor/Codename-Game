let mySound;
let backgroundImage;
let buttonImage;
let buttonX;
let buttonY;
let buttonWidth = 195;
let buttonHeight = 96;
let button;

function preloadTitle() {
    soundFormats("mp3");
    mySound = loadSound('assets/title/Krill_In_Water.mp3');
    // Load the background image
    backgroundImage = loadImage('assets/title/titlescreen.png');
    // Load the button image
}

function setupTitle() {
    // Create the canvas
    createCanvas(windowWidth, windowHeight, 'pixelated');
    backgroundMusic();
    
    button = createImg('assets/title/button3.png', 'start_button'); 
    button.size(buttonWidth, buttonHeight)
    button.id('start_button');

    console.log(button.id);

    // Set button position
    buttonX = width / 1.25 - buttonWidth / 2;
    buttonY = height / 1.25 - buttonHeight / 2;
    button.position(buttonX, buttonY);
}

function backgroundMusic() {
    mySound.play();
    mySound.loop();
    mySound.setVolume(0.5);
    userStartAudio();
}

function drawTitle() {
    // Draw the background image
    image(backgroundImage, 0, 0, width, height);

    // Draw the button image
    button;
    

    if (button.mousePressed()==true){
        mouseClickedTitle();
    }
    //button.hide();
}

function mouseClickedTitle() {
    // Check if the mouse is over the button when clicked
    if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {

        state = "game";        
        hideButton();
        clear();
        noCanvas();
        mySound.stop();        
        preloadGame();
        setup();        

    }
}

function hideButton() {
    button.remove();
}
