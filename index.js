const grid = document.querySelector(".grid");
const button = document.getElementById("start");
const score = document.getElementById("score");
let squares = [];
let currentSnake = [0, 1, 2];

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

function move() {
  const last = currentSnake.pop();
  squares[last].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + 1);
  const first = squares[currentSnake[0]];
  first.classList.add("snake");
}

move();
