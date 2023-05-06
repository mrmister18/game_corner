let gameState = {
    players: ['x', 'o'],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    playerNames: ["", ""]
  }

let currentPlayer = gameState.players[Math.round(Math.random())]

export function resetBoard() {
    gameState = {
        players: ['x', 'o'],
        board: [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ],
        playerNames: ["", ""]}
        return gameState.board
}

function switchPlayer() {
    if (currentPlayer === "x") {currentPlayer = "o"}
    else if (currentPlayer === "o") {currentPlayer = "x"}
}

export function inputTurn(x, y) {
  if (!gameState.board[y][x]) {
    gameState.board[y][x] = currentPlayer
    switchPlayer()}
    return gameState.board
}

export function computerTurn() {
  let potentialMoves = []
  for (let i = 0; i < gameState.board.length; i++) {
    for (let j = 0; j < gameState.board[i].length; j++) {
      if (!gameState.board[i][j]) {
        potentialMoves.push([j, i])}}
  } 
  let move = potentialMoves[Math.floor(Math.random() * potentialMoves.length)]
  inputTurn(move[0], move[1])
  updateBoard()
  return gameState
}

function checkAcross() {
  for (let i = 0; i < gameState.board.length; i++) {
    let boardRow = gameState.board[i]
    if (boardRow[0] === boardRow[1] && boardRow[1] === boardRow[2] && boardRow[0]) {
      return `${boardRow[0].toUpperCase()} Wins!`
    }
  }
}

function checkVertical() {
  for (let i = 0; i < gameState.board.length; i++) {
    if (gameState.board[0][i] === gameState.board[1][i] && gameState.board[1][i] === gameState.board[2][i] && gameState.board[0][i]) {
      return `${gameState.board[0][i].toUpperCase()} Wins!`
    }
  }
}

function checkDiagonal() {
  if (gameState.board[0][0] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][2] && gameState.board[0][0]) {
    return `${gameState.board[0][0].toUpperCase()} Wins!`
  } else if (gameState.board[0][2] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][0] && gameState.board[1][1]) {
    return `${gameState.board[0][2].toUpperCase()} Wins!`
  }
}

function checkTie() {
  for (let i = 0; i < gameState.board.length; i++) {
    for (let j = 0; j < gameState.board[i].length; j++) {
      if (!gameState.board[i][j]) {return}}}
    return "Tie"
    }

export function checkWin() {
  if (checkAcross()){return checkAcross()}
  else if (checkVertical()){return checkVertical()}
  else if (checkDiagonal()) {return checkDiagonal()}
  else if (checkTie()) {return checkTie()}
}