const grid = document.querySelector(".grid");
const button = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
let squares = [];
let currentSnake = [0, 1, 2];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let timerId = 0;

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("square");
    grid.appendChild(cell);
    squares.push(cell);
  }
}

createGrid();
currentSnake.forEach((index) => squares[index].classList.add("snake"));

function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");
  clearInterval(timerId);
  currentSnake = [0, 1, 2];
  score = 0;
  scoreDisplay.textContent = score;
  direction = 1;
  intervalTime = 1000;
  generateApples();
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    (currentSnake[0] + width >= 100 && direction === 10) || //if snake has hit bottom
    (currentSnake[0] % width === 9 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -10) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    return clearInterval(timerId);
  }
  const last = currentSnake.pop();
  squares[last].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  const first = squares[currentSnake[0]];
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[last].classList.add("snake");
    currentSnake.push(last);
    generateApples();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(timerId);
    intervalTime = intervalTime * 0.9;
    timerId = setInterval(move, intervalTime);
  }
  first.classList.add("snake");
}

function generateApples() {
  do {
    //generate a random number
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

function control(e) {
  if (e.keyCode === 39) {
    // right arrow
    direction = 1;
  } else if (e.keyCode === 37) {
    // left arrow
    direction = -width;
  } else if (e.keyCode === 38) {
    // up arrow
    direction = -1;
  } else if (e.keyCode === 40) {
    // down arrow
    direction = +width;
  }
}

document.addEventListener("keyup", control);
button.addEventListener("click", startGame);
