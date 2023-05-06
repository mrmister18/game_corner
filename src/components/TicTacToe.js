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
        <div>
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
            <span className='player-option clickable highlight' id="1Player" onClick={onePlayer}>{P1Name}</span>
            <input id="P1-name-input" className="player-option" value={P1Name} onChange={(e) => setP1Name(e.value)}></input>
            <span className='player-option clickable highlight' id="2Player" onClick={() => {setPlayerNumbers(2)}}>{P2Name}</span>
            <input id="P2-name-input" className="player-option" value={P2Name} onChange={(e) => setP2Name(e.value)}></input>
          </div>
        </div>
        <div>
        <div className="highlight clickable button" onClick={resetBoard}>
          Reset
        </div>
        <div className="highlight clickable button" onClick={() => navigate('/tictactoe')}>
          Players
        </div>
        <div className="highlight clickable button">
          Submit
        </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
