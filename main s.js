const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "#0089FF";
const snakeBorder = "black";
const foodColor = "red";
const uniteSize = 25;
let running = false;
let xVelocity = uniteSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  { x: uniteSize * 4, y: 0 },
  { x: uniteSize * 3, y: 0 },
  { x: uniteSize * 2, y: 0 },
  { x: uniteSize, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 100);
  } else {
    displayGameOver();
  }
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function createFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / uniteSize) * uniteSize;
    return randNum;
  }
  foodX = randomFood(0, gameWidth - uniteSize);
  foodY = randomFood(0, gameWidth - uniteSize);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, uniteSize, uniteSize);
}
function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, uniteSize, uniteSize);
    ctx.strokeRect(snakePart.x, snakePart.y, uniteSize, uniteSize);
  });
}
function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const RIGHT = 39;
  const UP = 38;
  const DOWN = 40;

  const goingUp = yVelocity == -uniteSize;
  const goingDown = yVelocity == uniteSize;
  const goingRight = xVelocity == uniteSize;
  const goingLeft = xVelocity == -uniteSize;

  switch (true) {
    case keyPressed == LEFT && !goingRight:
      xVelocity = -uniteSize;
      yVelocity = 0;
      break;
    case keyPressed == UP && !goingDown:
      xVelocity = 0;
      yVelocity = -uniteSize;
      break;
    case keyPressed == RIGHT && !goingLeft:
      xVelocity = uniteSize;
      yVelocity = 0;
      break;
    case keyPressed == DOWN && !goingUp:
      xVelocity = 0;
      yVelocity = uniteSize;
      break;
  }
}
function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
function displayGameOver() {
  ctx.font = "50px MV Boli";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", gameWidth / 2, gameHeight / 2);
  running = false;
}
function resetGame() {
  score = 0;
  xVelocity = uniteSize;
  yVelocity = 0;
  snake = [
    { x: uniteSize * 4, y: 0 },
    { x: uniteSize * 3, y: 0 },
    { x: uniteSize * 2, y: 0 },
    { x: uniteSize, y: 0 },
    { x: 0, y: 0 },
  ];
  gameStart();
}
