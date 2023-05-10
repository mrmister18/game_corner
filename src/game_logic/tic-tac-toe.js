let board = [[null, null, null], [null, null, null], [null, null, null]]

export function resetBoard() {
  board = [[null, null, null], [null, null, null], [null, null, null]]
  return board
}

export function inputTurn(y, x, input) {
  board[x][y] = input
  return board
}
function checkAcross() {
  for (let i = 0; i < board.length; i++) {
    let boardRow = board[i];
    if (
      boardRow[0] === boardRow[1] &&
      boardRow[1] === boardRow[2] &&
      boardRow[0]
    ) {
      return `${boardRow[0].toUpperCase()} Wins!`;
    }
  }
}

function checkVertical() {
  for (let i = 0; i < board.length; i++) {
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i]
    ) {
      return `${board[0][i].toUpperCase()} Wins!`;
    }
  }
}

function checkDiagonal() {
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0]
  ) {
    return `${board[0][0].toUpperCase()} Wins!`;
  } else if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[1][1]
  ) {
    return `${board[0][2].toUpperCase()} Wins!`;
  }
}

function checkTie() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j]) {
        return;
      }
    }
  }
  return "Tie";
}

export function checkWin() {
  if (checkAcross()) {
    return checkAcross();
  } else if (checkVertical()) {
    return checkVertical();
  } else if (checkDiagonal()) {
    return checkDiagonal();
  } else if (checkTie()) {
    return checkTie();
  }
}

export function computerTurn(input) {
  let potentialMoves = []
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j]) {
        potentialMoves.push([j, i])}}
  } 
  if (potentialMoves.length) {
  let move = potentialMoves[Math.floor(Math.random() * potentialMoves.length)]
  return inputTurn(move[0], move[1], input)} else {return board}
}

export function onePlayer() {
    document.getElementById("1Player").style.display = "none";
    document.getElementById("P1-name-input").style.display = "inline";
}

export function twoPlayer() {
    document.getElementById("1Player").style.display = "none";
    document.getElementById("2Player").style.display = "none";
    document.getElementById("P1-name-input").style.display = "inline";
    document.getElementById("P2-name-input").style.display = "inline";
}

export function playerSelectMenu() {
  document.getElementById("1Player").style.display = "inline";
  document.getElementById("2Player").style.display = "inline";
  document.getElementById("P1-name-input").style.display = "none";
  document.getElementById("P2-name-input").style.display = "none";
}