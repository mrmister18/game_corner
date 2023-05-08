export function onePlayer() {
  if (!playerNumbers) {
  setPlayerNumbers(1)
          document.getElementById("1Player").style.display = "none"
          document.getElementById("P1-name-input").style.display = "inline"
          setP2Name("COMPUTER")
          }
}

export function twoPlayer() {
  if (!playerNumbers) {
    setPlayerNumbers(2)
            document.getElementById("1Player").style.display = "none"
            document.getElementById("2Player").style.display = "none"
            document.getElementById("P1-name-input").style.display = "inline"
            document.getElementById("P2-name-input").style.display = "inline"
            }
}

export function resetBoard() {
  setBoard([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  setGameOver(false);
  setMessage("Start");
}

function switchPlayer() {
  if (currentPlayer === "x") {
    setCurrentPlayer("o");
  } else if (currentPlayer === "o") {
    setCurrentPlayer("x");
  }
}

export function inputTurn(x, y) {
  if (!board[y][x]) {
    let boardCopy = [...board];
    boardCopy[y][x] = currentPlayer;
    setBoard(boardCopy);
    switchPlayer();
  }
}

export function computerTurn() {
  let potentialMoves = []
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!gameState.board[i][j]) {
        potentialMoves.push([j, i])}}
  } 
  let move = potentialMoves[Math.floor(Math.random() * potentialMoves.length)]
  inputTurn(move[0], move[1])
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
    setMessage(checkAcross())
    setGameOver(true);
  } else if (checkVertical()) {
    setMessage(checkVertical())
    setGameOver(true);
  } else if (checkDiagonal()) {
    setMessage(checkDiagonal())
    setGameOver(true);
  } else if (checkTie()) {
    setMessage(checkTie())
    setGameOver(true);
  }
}
