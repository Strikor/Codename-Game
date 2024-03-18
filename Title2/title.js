let mySound, bgImg, button, buttonimg;

function preload() {
    soundFormats("mp3");
    mySound = loadSound('Krill (1).mp3');
    bgImg = loadImage('titlescreen.png');
    //buttonimg = loadImage('button.png')
}

function setup() {
    createCanvas(960, 540, 'pixelated'); //may display better with 'pixelated x2'
    //button.mouseClicked();
    //button.size(65,32);
    //button.position(910,400);
    //backgroundMusic();
}

function draw() {
    background(bgImg,);
}
/*
function backgroundMusic(){
    mySound.play();
    mySound.loop();
    mySound.setVolume(0.5);
    userStartAudio();
}
*/
/*
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
*/