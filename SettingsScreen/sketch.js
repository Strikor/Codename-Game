let mySound;
let backgroundImage;
let buttonImage;
let buttonX;
let buttonY;
let buttonWidth = 200;
let buttonHeight = 50;
let checkboxX;
let checkboxY;
let checkboxSize = 20;
let checkboxChecked = false;
let volumeSlider;

function preload() {
    soundFormats("mp3");
    mySound = loadSound('Krill (1).mp3');
    // Load the background image
    backgroundImage = loadImage('SettingsScreen.png');
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

    // Set checkbox position
    checkboxX = width / 2.25 - 50; // Adjust X position here
    checkboxY = height / 2.89 + 50; // Adjust Y position here

    // Create volume slider
    volumeSlider = createSlider(0, 1, 0.5, 0.01);
    volumeSlider.position(450, 450); // Adjust slider position
    volumeSlider.style('width', '100px'); // Adjust slider width
    volumeSlider.style('background-color', 'green'); // Set slider background color to green
    volumeSlider.style('color', 'green'); // Set slider color to green
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

    // Draw the checkbox
    fill('green'); // Change color to green
    stroke(0);
    rect(checkboxX, checkboxY, checkboxSize, checkboxSize);
    if (checkboxChecked) {
        line(checkboxX, checkboxY, checkboxX + checkboxSize, checkboxY + checkboxSize);
        line(checkboxX + checkboxSize, checkboxY, checkboxX, checkboxY + checkboxSize);
    }

    // Set volume based on slider value
    mySound.setVolume(volumeSlider.value());
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

    // Check if the mouse is over the checkbox when clicked
    if (mouseX > checkboxX && mouseX < checkboxX + checkboxSize && mouseY > checkboxY && mouseY < checkboxY + checkboxSize) {
        checkboxChecked = !checkboxChecked; // Toggle checkbox state
    }
}
