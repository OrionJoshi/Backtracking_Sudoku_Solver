let gameLevel = "easy"; // default mode
let button = document.getElementById("generate-sudoku");
let solve = document.getElementById("solve");
let dropdown = document.getElementById("dropdown");
let arr = [[], [], [], [], [], [], [], [], []];
let board = [[], [], [], [], [], [], [], [], []];

// assigning div to an array
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}

// setting color for the default numbers
function setColor(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        arr[i][j].style.color = "red";
      }
    }
  }
}
// set color for the inserted numbers
function resetColor() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      arr[i][j].style.color = "green";
    }
  }
}

function changeBoard(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        arr[i][j].innerText = board[i][j];
      } else arr[i][j].innerText = "";
    }
  }
}
// requesting for the initial board
button.onclick = function () {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    resetColor();

    board = response.board;
    setColor(board);
    changeBoard(board);
  };
  xhrRequest.open(
    "get",
    `https://sugoku.herokuapp.com/board?difficulty=${gameLevel}`
  );
  //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
  xhrRequest.send();
  solve.disabled = false;
};

function solveSudokuHelper(board) {
  changeBoard(getSolved(board));
}

function solveSudoku(board) {
  solveSudokuHelper(board);
}

solve.onclick = function () {
  solveSudoku(board);
};

// drop down click event
dropdown.onclick = function (e) {
  dropdown.style.display = "none";
  switch (e.target.id) {
    case "easy":
      gameLevel = "easy";
      break;
    case "medium":
      gameLevel = "medium";
      break;
    case "hard":
      gameLevel = "hard";
      break;
  }
};
