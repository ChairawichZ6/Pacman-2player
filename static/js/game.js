const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const PLAYER_RADIUS = 15;
const PLAYER_SPEED = 5;

// Define the obstacles  for Level Design
const obstacles = [
    { x: 40, y: 100, width: 50, height: 150 },
    { x: 230, y: 200, width: 100, height: 50 },
    { x: 200, y: 350, width: 150, height: 50 },
    { x: 380, y: 100, width: 50, height: 200 },
    // Add more obstacles as needed
];

const yellowDots = [];

// Function to generate random positions within the canvas boundaries
function generateRandomPosition() {
    const x = Math.random() * (canvas.width - 10) + 5; // Random x coordinate
    const y = Math.random() * (canvas.height - 10) + 5; // Random y coordinate
    return { x, y };
}

// Generate 21 random yellow dots
for (let i = 0; i < 21; i++) {
    let dot = generateRandomPosition();
    while (isCollidingWithObstacle(dot)) {
        dot = generateRandomPosition();
    }
    yellowDots.push(dot);
}

const player1 = {
    x: canvas.width / 4,
    y: canvas.height / 2,
    dotCount: 0,
};

const player2 = {
    x: (canvas.width / 4) * 3,
    y: canvas.height / 4, // Changed spawn position for Player 2
    dotCount: 0,
};

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    const movePlayer1 = (dx, dy) => {
        const newX = player1.x + dx;
        const newY = player1.y + dy;

        if (!isCollidingWithObstacle({ x: newX, y: newY })) {
            player1.x = newX;
            player1.y = newY;
        }
    };

    const movePlayer2 = (dx, dy) => {
        const newX = player2.x + dx;
        const newY = player2.y + dy;

        if (!isCollidingWithObstacle({ x: newX, y: newY })) {
            player2.x = newX;
            player2.y = newY;
        }
    };

    switch (event.key) {
        // Handle player movement (W, A, S, D for Player 1, Arrow keys for Player 2)
        case 'w':
            movePlayer1(0, -PLAYER_SPEED);
            break;
        case 's':
            movePlayer1(0, PLAYER_SPEED);
            break;
        case 'a':
            movePlayer1(-PLAYER_SPEED, 0);
            break;
        case 'd':
            movePlayer1(PLAYER_SPEED, 0);
            break;
        case 'ArrowUp':
            movePlayer2(0, -PLAYER_SPEED);
            break;
        case 'ArrowDown':
            movePlayer2(0, PLAYER_SPEED);
            break;
        case 'ArrowLeft':
            movePlayer2(-PLAYER_SPEED, 0);
            break;
        case 'ArrowRight':
            movePlayer2(PLAYER_SPEED, 0);
            break;
    }

    // Check for yellow dot collection
    collectYellowDots(player1);
    collectYellowDots(player2);

    drawGame();
}

function isCollidingWithObstacle(position) {
    for (let obstacle of obstacles) {
        if (
            position.x - PLAYER_RADIUS < obstacle.x + obstacle.width &&
            position.x + PLAYER_RADIUS > obstacle.x &&
            position.y - PLAYER_RADIUS < obstacle.y + obstacle.height &&
            position.y + PLAYER_RADIUS > obstacle.y
        ) {
            return true;
        }
    }
    return false;
}

function collectYellowDots(player) {
    for (let i = yellowDots.length - 1; i >= 0; i--) {
        const dot = yellowDots[i];
        const distance = Math.sqrt((player.x - dot.x) ** 2 + (player.y - dot.y) ** 2);
        if (distance <= PLAYER_RADIUS) {
            yellowDots.splice(i, 1); // Remove the collected dot
            player.dotCount++;
        }
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw obstacles
    ctx.fillStyle = 'black';
    obstacles.forEach((obstacle) => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Draw yellow dots
    ctx.fillStyle = 'yellow';
    yellowDots.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw Player 1
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(player1.x, player1.y, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    // Draw Player 2
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(player2.x, player2.y, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    // Display dot count for each player
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.fillText('Player 1 Dots: ' + player1.dotCount, 10, 25);
    ctx.textAlign = 'right';
    ctx.fillText('Player 2 Dots: ' + player2.dotCount, canvas.width - 10, 25);

    // Check if all yellow dots are collected
    if (yellowDots.length === 0) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        const winner = player1.dotCount > player2.dotCount ? 'Player 1' : 'Player 2';
        ctx.fillText(winner + ' Wins!', canvas.width / 2, canvas.height / 2);
    }
}

drawGame();
