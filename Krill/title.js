let mySound;
let backgroundImage;
let buttonImage;
let buttonX;
let buttonY;
let buttonWidth = 200;
let buttonHeight = 50;

function preloadTitle() {
    soundFormats("mp3");
    mySound = loadSound('assets/title/Krill_In_Water.mp3');
    // Load the background image
    backgroundImage = loadImage('assets/title/titlescreen.png');
    // Load the button image
    buttonImage = loadImage('assets/title/button.png'); // Replace 'button.png' with the path to your PNG button image
}

function setupTitle() {
    // Create the canvas
    createCanvas(windowWidth, windowHeight);
    backgroundMusic();

    // Set button position
    buttonX = width / 2 - buttonWidth / 2;
    buttonY = height / 2 - buttonHeight / 2;
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
    image(buttonImage, buttonX, buttonY, buttonWidth, buttonHeight);
}

function mouseClickedTitle() {
    // Check if the mouse is over the button when clicked
    if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
        state = "game";
        clear();
        noCanvas();
        mySound.stop();
        preloadGame();
        setup();
    }
}
