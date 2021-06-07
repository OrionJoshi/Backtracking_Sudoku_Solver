// return true if board get solved otherwise false
function solved(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

// get all the possibile board
function nextBoards(board) {
  const res = [];
  const firstEmpty = findEmptySquare(board);
  if (firstEmpty != undefined) {
    const y = firstEmpty[0];
    const x = firstEmpty[1];

    for (let i = 1; i <= 9; i++) {
      var newBoard = [...board];
      var row = [...newBoard[y]];
      row[x] = i;
      newBoard[y] = row;
      res.push(newBoard);
    }
  }
  return res;
}

// search for empty square
function findEmptySquare(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == 0) {
        return [i, j];
      }
    }
  }
}

// filter validate board only
function keepOnlyValid(boards) {
  return boards.filter((b) => validBoard(b));
}

function validBoard(board) {
  return rowGood(board) && columnGood(board) && boxesGood(board);
}

// check whether board is valid from row
function rowGood(board) {
  for (let i = 0; i < 9; i++) {
    const cur = [];
    for (let j = 0; j < 9; j++) {
      if (cur.includes(board[i][j])) {
        return false;
      } else if (board[i][j] != 0) {
        cur.push(board[i][j]);
      }
    }
  }
  return true;
}

// check whether board is valid from column
function columnGood(board) {
  for (let i = 0; i < 9; i++) {
    const cur = [];
    for (let j = 0; j < 9; j++) {
      if (cur.includes(board[j][i])) {
        return false;
      } else if (board[j][i] != 0) {
        cur.push(board[j][i]);
      }
    }
  }
  return true;
}

// check whether board is valid from subgrid of size 3×3
function boxesGood(board) {
  // represent first size 3×3  box out of nine
  const boxCoordinates = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];

  for (let y = 0; y < 9; y += 3) {
    for (let x = 0; x < 9; x += 3) {
      const cur = [];
      for (let i = 0; i < 9; i++) {
        let coordinates = [...boxCoordinates[i]];
        coordinates[0] += y;
        coordinates[1] += x;

        if (cur.includes(board[coordinates[0]][coordinates[1]])) {
          return false;
        } else if (board[coordinates[0]][coordinates[1]] != 0) {
          cur.push(board[coordinates[0]][coordinates[1]]);
        }
      }
    }
  }
  return true;
}

// backtracking logic
function searchForSolution(boards) {
  if (boards.length < 1) {
    return false;
  } else {
    // backtracking search
    var first = boards.shift();
    const tryPath = getSolved(first);
    if (tryPath != false) {
      return tryPath;
    } else {
      return searchForSolution(boards);
    }
  }
}

// solve board
function getSolved(board) {
  if (solved(board)) {
    return board;
  } else {
    const possibilities = nextBoards(board);
    const validBoards = keepOnlyValid(possibilities);
    return searchForSolution(validBoards);
  }
}
