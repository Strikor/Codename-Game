// Define CSS styles as a string
const styles = `
    body {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-image: linear-gradient(#00BFFF, #191970);
    }

    .screen {
        text-align: center;
    }

    h1 {
        color: white;
    }

    button {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #6495ED;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        margin: 10px;
    }

    button:hover {
        background-color: #00008B;
    }
`;

// Define HTML structure as a string
const htmlContent = `
    <div id="title-screen" class="screen">
        <h1>Codename</h1>
        <button onclick="toggleScreens()">Start Game</button>
    </div>

    <div id="level-select-screen" class="screen" style="display: none;">
        <h1>Select a Level</h1>
        <button onclick="startTutorialLevel()">Tutorial Level</button>
        <button onclick="startLevel1()">Level 1</button>
    </div>
`;

// Append styles to head
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

// Append HTML content to body
document.body.innerHTML = htmlContent;

// Include p5.js script
const scriptElement = document.createElement('script');
scriptElement.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js';
document.body.appendChild(scriptElement);

// Define p5.js script
const p5Script = `
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
`;

// Append p5.js script to body
const p5ScriptElement = document.createElement('script');
p5ScriptElement.textContent = p5Script;
document.body.appendChild(p5ScriptElement);
