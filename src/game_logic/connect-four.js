export function inputTurn(x, token, board) {
    for (let i = board.length - 1; i >= 0 ; i--) {
      if (!board[i][x]) {board[i][x] = token
                        return board}
    } return board
  }
  
  function checkHorizontal(token, board, player) {
    for (let i = board.length - 1; i >= 0 ; i--) {
      let row = board[i].join("")
      if (!row) {break}
      if (row.includes(token.repeat(4))) {
        return `${player} Wins!`
      }
    }
  }
  
  function checkVertical(token, board, player) {
    for (let i = 0; i < 6; i++) {
      let column = ""
      for (let j = board.length - 1; j >= 0; j--) {
        if (board[j][i]) {column += board[j][i]}
        else {break}
      } if (column.includes(token.repeat(4))) {return `${player} Wins!`}
    }
  }
  
  function checkDiagonalRight(token, board, player) {
    for (let i = 3; i < 5; i++) {
      let line = ""
      let x = 0
      let y = i
      while (board[y] && board[y][x] !== undefined) {
        line += board[y][x]
        x++
        y--
      } if (line.includes(token.repeat(4))) {
        return `${player} Wins!`
      }
    }
    for (let i = 0; i < 4; i++) {
      let line = ""
      let x = i
      let y = 5
      while (board[y] && board[y][x] !== undefined) {
        line += board[y][x]
        x++
        y--
      } if (line.includes(token.repeat(4))) {
        return `${player} Wins!`
      }
    }
  }
  
  function checkDiagonalLeft(token, board, player) {
    for (let i = 3; i < 5; i++) {
      let line = ""
      let x = 6
      let y = i
      while (board[y] && board[y][x] !== undefined) {
        line += board[y][x]
        x--
        y--
      } if (line.includes(token.repeat(4))) {
        return `${player} Wins!`
      }
    }
    for (let i = 6; i >= 3; i--) {
      let line = ""
      let x = i
      let y = 5
      while (board[y] && board[y][x] !== undefined) {
        line += board[y][x]
        x--
        y--
      } if (line.includes(token.repeat(4))) {
        return `${player} Wins!`
      }
    }
  }
  
  export function checkWin(token, board, player) {
    if (checkHorizontal(token, board, player)) {return checkHorizontal(token, board, player)}
    if (checkVertical(token, board, player)) {return checkVertical(token, board, player)}
    if (checkDiagonalLeft(token, board, player)) {return checkDiagonalLeft(token, board, player)}
    if (checkDiagonalRight(token, board, player)) {return checkDiagonalRight(token, board, player)}
  }

  export function checkTie(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (!board[i][j]) {return}
        }
    } return "Tie!"
  }

  export function computerTurn(input, board) {
    let potentialMoves = []
    for (let i = 0; i < board[0].length; i++) {
        if (!board[0][i]) {
          potentialMoves.push(i)}
    } 
    if (potentialMoves.length) {
      for (let i = 0; i < potentialMoves.length; i++) {
        inputTurn(potentialMoves[i], input, board)
        if (checkWin(input, board, "Computer")) {
        return inputTurn(potentialMoves[i], input, board)}
        inputTurn(potentialMoves[i], 0, board)
      }
      for (let i = 0; i < potentialMoves.length; i++) {
        inputTurn(potentialMoves[i], "R", board)
        if (checkWin("R", board, "Player")) {
        return inputTurn(potentialMoves[i], input, board)}
        inputTurn(potentialMoves[i], 0, board)
      }
    let move = potentialMoves[Math.floor(Math.random() * potentialMoves.length)]
    return inputTurn(move, input, board)} else {return board}
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