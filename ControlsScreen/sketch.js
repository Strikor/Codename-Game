let mySound;
let backgroundImage;
let buttonImage;
let buttonX;
let buttonY;
let buttonWidth = 200;
let buttonHeight = 50;

function preload() {
    soundFormats("mp3");
    mySound = loadSound('Krill (1).mp3');
    // Load the background image
    backgroundImage = loadImage('Controls.png');
    // Load the button image
    buttonImage = loadImage('button.png'); // Replace 'button.png' with the path to your PNG button image
}

function setup() {
    // Create the canvas
    createCanvas(windowWidth, windowHeight);
    backgroundMusic();

    // Set button position
    buttonX = width / 1.25 - buttonWidth / 2;
    buttonY = height / 1.25 - buttonHeight / 2;
}

function backgroundMusic() {
    mySound.play();
    mySound.loop();
    mySound.setVolume(0.5);
    userStartAudio();
}

function draw() {
    // Draw the background image
    image(backgroundImage, 0, 0, width, height);
    
    // Draw the button image
    image(buttonImage, buttonX, buttonY, buttonWidth, buttonHeight);
}

function switchToNewSketch() {
    // Replace the current sketch with the new sketch
  window.location.href = "KrillEditor\\sketch.js";
}

function mouseClicked() {
    // Check if the mouse is over the button when clicked
  if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
       switchToNewSketch();
    }
}
