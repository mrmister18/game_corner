import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const TicTacToe = () => {
  const [message, setMessage] = useState("Number of Players?");
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const players = ["x", "o"]
  const [currentPlayer, setCurrentPlayer] = useState(players[Math.round(Math.random())]);
  const [playerSelect, setPlayerSelect] = useState(true)
  const [gameOver, setGameOver] = useState(true);
  const [P1Name, setP1Name] = useState("1P")
  const [P2Name, setP2Name] = useState("2P")
  const [playerNumbers, setPlayerNumbers] = useState(0)

  const navigate = useNavigate();

  function onePlayer() {
    if (!playerNumbers) {
    setPlayerNumbers(1)
            document.getElementById("1Player").style.display = "none"
            document.getElementById("P1-name-input").style.display = "inline"
            setP2Name("COMPUTER")
            }
  }

  function twoPlayer() {
    if (!playerNumbers) {
      setPlayerNumbers(2)
              document.getElementById("1Player").style.display = "none"
              document.getElementById("2Player").style.display = "none"
              document.getElementById("P1-name-input").style.display = "inline"
              document.getElementById("P2-name-input").style.display = "inline"
              }
  }

  function resetBoard() {
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

  function inputTurn(x, y) {
    if (!board[y][x]) {
      let boardCopy = [...board];
      boardCopy[y][x] = currentPlayer;
      setBoard(boardCopy);
      switchPlayer();
    }
  }

  function computerTurn() {
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

  function checkWin() {
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

  return (
    <div id="tictactoe">
      <div
        className="highlight clickable button back-button"
        onClick={() => {
          navigate("/");
        }}
      >
        &lt;-
      </div>
      <div className="row">
        <div className="column">
          <div className="title">{message}</div>
          <div className={`board ${gameOver ? null : "clickable"}`}>
            <div
              className="cell"
              onClick={() => {
                  if (gameOver) {
                      return;
                    }
                    inputTurn(0, 0);
                    checkWin();
              }}
            >
              <span>{board[0][0]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                  if (gameOver) {
                      return;
                    }
                    inputTurn(1, 0);
                    checkWin();
              }}
            >
              <span>{board[0][1]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                  if (gameOver) {
                      return;
                    }
                    inputTurn(2, 0);
                    checkWin();
              }}
            >
              <span>{board[0][2]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                  if (gameOver) {
                      return;
                    }
                    inputTurn(0, 1);
                    checkWin();
              }}
            >
              <span>{board[1][0]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                  if (gameOver) {
                      return;
                    }
                    inputTurn(1, 1);
                    checkWin();
              }}
            >
              <span>{board[1][1]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                  if (gameOver) {
                      return;
                    }
                    inputTurn(2, 1);
                    checkWin();
              }}
            >
              <span>{board[1][2]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                  if (gameOver) {
                      return;
                    }
                    inputTurn(0, 2);
                    checkWin();
              }}
            >
              <span>{board[2][0]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                  if (gameOver) {
                      return;
                    }
                    inputTurn(1, 2);
                    checkWin();
              }}
            >
              <span>{board[2][1]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                  if (gameOver) {
                      return;
                    }
                    inputTurn(2, 2);
                    checkWin();
              }}
            >
              <span>{board[2][2]}</span>
            </div>
          </div>
          <div id="display-names" className="row">
            <span className={`player-option ${gameOver && !playerNumbers ? "clickable highlight" : null}`} id="1Player" onClick={onePlayer}>{P1Name}</span>
            <input id="P1-name-input" className="player-option" value={P1Name} onChange={(e) => setP1Name(e.target.value)}></input>
            <span className={`player-option ${gameOver && !playerNumbers ? "clickable highlight" : null}`} id="2Player" onClick={twoPlayer}>{P2Name}</span>
            <input id="P2-name-input" className="player-option" value={P2Name} onChange={(e) => setP2Name(e.target.value)}></input>
          </div>
        </div>
        <div>
        <div className="highlight clickable button" onClick={() => {
          resetBoard()
          setGameOver(true)
          setPlayerNumbers(0)
          setPlayerSelect(true)
          setP1Name("1P")
          setP2Name("2P")
          document.getElementById("1Player").style.display = "inline"
          document.getElementById("2Player").style.display = "inline"
            document.getElementById("P1-name-input").style.display = "none"
            document.getElementById("P2-name-input").style.display = "none"
            setMessage("Number of Players?")
        }}>
          Players
        </div>
        { playerNumbers && !playerSelect ? <div className="highlight clickable button" onClick={resetBoard}>
          Reset
        </div> : null}
        {playerNumbers && playerSelect ? <div className="highlight clickable button"
        onClick={() => {
          setGameOver(false)
          setPlayerSelect(false)
          document.getElementById("1Player").style.display = "inline"
          document.getElementById("2Player").style.display = "inline"
            document.getElementById("P1-name-input").style.display = "none"
            document.getElementById("P2-name-input").style.display = "none"
        }}>
          Submit
        </div> : null}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
