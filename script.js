// Creates game screen and object that makes other objects on screen
const c = document.getElementById("Canvas");
const ctx = c.getContext("2d");

let GameSwitch = false
const player1Rect = {
    x: 10,
    y: 350,
    width: 10,
    height: 100,
    speed: 5,
    points: 0
}
const player2Rect = {
    x: 1330,
    y: 350,
    width: 10,
    height: 100,
    speed: 5,
    points: 0
}

const ball = {
    x: 675,
    y: 400,
    rad: 15,
    speedX: 5,
    speedY: 5


}

// Game Loop
window.onload = function(){
    var framesPerSecond = 30;
	setInterval(function() {
        drawStart();
        if (GameSwitch == true){
            ballMovement();
			drawGame();
            scoring();	
        }	
		}, 1000/framesPerSecond);
        // Listen for keyboard events
    document.addEventListener('keydown', handleKeyDown);
}

function handleKeyDown(event) {
    switch (event.key) {

        // Starts game 
        case 'Enter':
            GameSwitch = true
            console.log("Enter was pressed")
            break;

        // Player 1 Controls
        case 'w' || 'W':
            player1Rect.y -= player1Rect.speed;
            console.log("Player2 Y-position: " + player1Rect.y)
            break;
        case 's' || 'S':
            player1Rect.y += player1Rect.speed;
            console.log("Player2 Y-position: " + player1Rect.y)
            break;

        // Player 2 Controls 
        case 'ArrowUp':
            player2Rect.y -= player2Rect.speed;
            console.log("Player1 Y-position: " + player2Rect.y)
            break;
        case 'ArrowDown':
            player2Rect.y += player2Rect.speed;
            console.log("Player1 Y-position: " + player2Rect.y)
            break;
    }
    drawGame();
}

function drawStart(){
    ctx.font = "50px Arial";
    ctx.fillStyle = "White";
    ctx.fillText("Press Enter To Start",445,375);
}

// Draws everthing in the game when it needs to be updated
function drawGame(){
    ctx.clearRect(0, 0, c.width, c.height);
    drawScoreboard();
    drawPlayer1();
    drawPlayer2();
    drawBall();
}

function drawScoreboard() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Player 1: " + player1Rect.points, 20, 30);
    ctx.fillText("Player 2: " + player2Rect.points, c.width - 140, 30);
}

// function draws Player Paddle for every frame 
function drawPlayer1(){
    ctx.fillStyle = 'white';
    ctx.fillRect(player1Rect.x, player1Rect.y, player1Rect.width, player1Rect.height);
}

// function draws Computer Paddle for every frame 
function drawPlayer2(){
    ctx.fillStyle = 'white';
    ctx.fillRect(player2Rect.x, player2Rect.y, player2Rect.width, player2Rect.height);
}

// function draws Ball for every frame 
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.rad, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
}

function scoring() {
    if (ball.x <= 0) { 
        player2Rect.points++; 
        if (player2Rect.points >= 5) {
            resetGame();
            GameSwitch = false
        }
        resetBall(); 
    } else if (ball.x >= c.width) { 
        player1Rect.points++; 
        if (player1Rect.points >= 5) {
            resetGame();
            GameSwitch = false
        }
        resetBall(); 
    }
}

function resetGame() {
    player1Rect.points = 0;
    player2Rect.points = 0;

    resetBall();

    ctx.clearRect(0, 0, c.width, c.height);
}

function resetBall() {
    ball.x = c.width / 2;
    ball.y = c.height / 2;
}

function ballMovement(){

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y - ball.rad <= 0 || ball.y + ball.rad >= c.height) {
        ball.speedY = -ball.speedY;
    }

    if (ball.x - ball.rad <= player1Rect.x + player1Rect.width && ball.y >= player1Rect.y && ball.y <= player1Rect.y + player1Rect.height) {
        ball.speedX = -ball.speedX; 
    }

    if (ball.x + ball.rad >= player2Rect.x && ball.y >= player2Rect.y && ball.y <= player2Rect.y + player2Rect.height) {
        ball.speedX = -ball.speedX; 
    }
    
}