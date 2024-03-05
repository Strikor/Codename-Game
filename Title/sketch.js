let mySound;

function preload() {
    soundFormats("mp3");
    mySound=loadSound('Krill (1).mp3');
}

function setup() {
    noCanvas();
    backgroundMusic();
}

function backgroundMusic(){
    mySound.play();
    mySound.loop();
    mySound.setVolume(0.5);
    userStartAudio();
}

function draw() {
    // You can include any continuous animation or updates here if needed
    
}

function toggleScreens() {
    var titleScreen = select('#title-screen');
    var levelSelectScreen = select('#level-select-screen');

    titleScreen.style('display', 'none');
    levelSelectScreen.style('display', 'block');
}

function startTutorialLevel() {
    // Add functionality to start the tutorial level
    console.log('Starting Tutorial Level');
}
