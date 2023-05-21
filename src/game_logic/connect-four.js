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