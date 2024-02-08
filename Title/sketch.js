//Good start

function setup() {
    noCanvas();
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

function startLevel1() {
    // Add functionality to start level 1
    console.log('Starting Level 1');
}