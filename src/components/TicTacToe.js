import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const TicTacToe = () => {
  const [message, setMessage] = useState("Number of Players?");
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [playerSelect, setPlayerSelect] = useState(true);
  const [gameOver, setGameOver] = useState(true);
  const [P1Name, setP1Name] = useState("1P");
  const [P2Name, setP2Name] = useState("2P");
  const players = [
    ["x", P1Name],
    ["o", P2Name],
  ];
  const [currentPlayer, setCurrentPlayer] = useState(
    players[Math.round(Math.random())]
  );
  const [playerNumbers, setPlayerNumbers] = useState(0);

  const navigate = useNavigate();

  function onePlayer() {
    if (!playerNumbers) {
      setPlayerNumbers(1);
      document.getElementById("1Player").style.display = "none";
      document.getElementById("P1-name-input").style.display = "inline";
      setP2Name("COMPUTER");
    }
  }

  function twoPlayer() {
    if (!playerNumbers) {
      setPlayerNumbers(2);
      document.getElementById("1Player").style.display = "none";
      document.getElementById("2Player").style.display = "none";
      document.getElementById("P1-name-input").style.display = "inline";
      document.getElementById("P2-name-input").style.display = "inline";
    }
  }

  function resetBoard() {
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setGameOver(false);
  }

  function switchPlayer() {
    if (currentPlayer[0] === "x") {
      setCurrentPlayer(["o", P2Name]);
      setMessage(`${P2Name}'s Turn`);
    } else if (currentPlayer[0] === "o") {
      setCurrentPlayer(["x", P1Name]);
      setMessage(`${P1Name}'s Turn`);
    }
  }

  function inputTurn(x, y, currentPlayer, board) {
    if (!board[y][x]) {
      let boardCopy = [...board];
      boardCopy[y][x] = currentPlayer;
      setBoard(boardCopy);
      switchPlayer();
    }
  }

  function computerTurn(board) {
    setTimeout(() => {
      let potentialMoves = [];
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (!board[i][j]) {
            potentialMoves.push([j, i]);
          }
        }
      }
      if (potentialMoves.length) {
        let move =
          potentialMoves[Math.floor(Math.random() * potentialMoves.length)];
        if (currentPlayer[0] === "x") {
          inputTurn(move[0], move[1], "o", board);
          setCurrentPlayer(["x", P1Name]);
          setMessage(`${P1Name}'s Turn`);
        } else {
          inputTurn(move[0], move[1], "x", board);
          setCurrentPlayer(["o", P2Name]);
          setMessage(`${P2Name}'s Turn`);
        }
      }
    }, 2000);
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
      setMessage(checkAcross());
      setGameOver(true);
      return true;
    } else if (checkVertical()) {
      setMessage(checkVertical());
      setGameOver(true);
      return true;
    } else if (checkDiagonal()) {
      setMessage(checkDiagonal());
      setGameOver(true);
      return true;
    } else if (checkTie()) {
      setMessage(checkTie());
      setGameOver(true);
      return true;
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
                if (gameOver || (playerNumbers === 1 && currentPlayer[0] === "o")) {
                  return;
                }
                inputTurn(0, 0, currentPlayer[0], board);
                if (playerNumbers === 1 && !checkWin()) {
                  setMessage("Thinking...");
                  computerTurn(board);
                }
                checkWin();
              }}
            >
              <span>{board[0][0]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                if (gameOver || (playerNumbers === 1 && currentPlayer[0] === "o")) {
                  return;
                }
                inputTurn(1, 0, currentPlayer[0], board);
                if (playerNumbers === 1 && !checkWin()) {
                  setMessage("Thinking...");
                  computerTurn(board);
                }
                checkWin();
              }}
            >
              <span>{board[0][1]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                if (gameOver || (playerNumbers === 1 && currentPlayer[0] === "o")) {
                  return;
                }
                inputTurn(2, 0, currentPlayer[0], board);
                if (playerNumbers === 1 && !checkWin()) {
                  setMessage("Thinking...");
                  computerTurn(board);
                }
                checkWin();
              }}
            >
              <span>{board[0][2]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                if (gameOver || (playerNumbers === 1 && currentPlayer[0] === "o")) {
                  return;
                }
                inputTurn(0, 1, currentPlayer[0], board);
                if (playerNumbers === 1 && !checkWin()) {
                  setMessage("Thinking...");
                  computerTurn(board);
                }
                checkWin();
              }}
            >
              <span>{board[1][0]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                if (gameOver || (playerNumbers === 1 && currentPlayer[0] === "o")) {
                  return;
                }
                inputTurn(1, 1, currentPlayer[0], board);
                if (playerNumbers === 1 && !checkWin()) {
                  setMessage("Thinking...");
                  computerTurn(board);
                }
                checkWin();
              }}
            >
              <span>{board[1][1]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                if (gameOver || (playerNumbers === 1 && currentPlayer[0] === "o")) {
                  return;
                }
                inputTurn(2, 1, currentPlayer[0], board);
                if (playerNumbers === 1 && !checkWin()) {
                  setMessage("Thinking...");
                  computerTurn(board);
                }
                checkWin();
              }}
            >
              <span>{board[1][2]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                if (gameOver || (playerNumbers === 1 && currentPlayer[0] === "o")) {
                  return;
                }
                inputTurn(0, 2, currentPlayer[0], board);
                if (playerNumbers === 1 && !checkWin()) {
                  setMessage("Thinking...");
                  computerTurn(board);
                }
                checkWin();
              }}
            >
              <span>{board[2][0]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                if (gameOver || (playerNumbers === 1 && currentPlayer[0] === "o")) {
                  return;
                }
                inputTurn(1, 2, currentPlayer[0], board);
                if (playerNumbers === 1 && !checkWin()) {
                  setMessage("Thinking...");
                  computerTurn(board);
                }
                checkWin();
              }}
            >
              <span>{board[2][1]}</span>
            </div>
            <div
              className="cell"
              onClick={() => {
                if (gameOver || (playerNumbers === 1 && currentPlayer[0] === "o")) {
                  return;
                }
                inputTurn(2, 2, currentPlayer[0], board);
                if (playerNumbers === 1 && !checkWin()) {
                  setMessage("Thinking...");
                  computerTurn(board);
                }
                checkWin();
              }}
            >
              <span>{board[2][2]}</span>
            </div>
          </div>
          <div id="display-names" className="row">
            <span
              className={`player-option ${
                gameOver && !playerNumbers ? "clickable highlight" : null
              } ${currentPlayer[0] === "x" && !gameOver ? "active" : null}`}
              id="1Player"
              onClick={onePlayer}
            >
              {P1Name}
            </span>
            <input
              id="P1-name-input"
              className="player-option"
              value={P1Name}
              onChange={(e) => setP1Name(e.target.value)}
            ></input>
            <span
              className={`player-option ${
                gameOver && !playerNumbers ? "clickable highlight" : null
              } ${currentPlayer[0] === "o" && !gameOver ? "active" : null}`}
              id="2Player"
              onClick={twoPlayer}
            >
              {P2Name}
            </span>
            <input
              id="P2-name-input"
              className="player-option"
              value={P2Name}
              onChange={(e) => setP2Name(e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <div
            className="highlight clickable button"
            onClick={() => {
              resetBoard();
              setGameOver(true);
              setPlayerNumbers(0);
              setPlayerSelect(true);
              setP1Name("1P");
              setP2Name("2P");
              document.getElementById("1Player").style.display = "inline";
              document.getElementById("2Player").style.display = "inline";
              document.getElementById("P1-name-input").style.display = "none";
              document.getElementById("P2-name-input").style.display = "none";
              setMessage("Number of Players?");
            }}
          >
            Players
          </div>
          {playerNumbers && !playerSelect ? (
            <div
              className="highlight clickable button"
              onClick={() => {
                resetBoard();
                if (playerNumbers === 1 && currentPlayer[0] === "o") {
                  setMessage("Thinking...");
                  computerTurn([
                    [null, null, null],
                    [null, null, null],
                    [null, null, null],
                  ]);
                  setCurrentPlayer(["x", P1Name])
                } else {
                  setMessage(`${currentPlayer[1]}'s Turn`);
                }
              }}
            >
              Reset
            </div>
          ) : null}
          {playerNumbers && playerSelect ? (
            <div
              className="highlight clickable button"
              onClick={() => {
                setGameOver(false);
                setPlayerSelect(false);
                document.getElementById("1Player").style.display = "inline";
                document.getElementById("2Player").style.display = "inline";
                document.getElementById("P1-name-input").style.display = "none";
                document.getElementById("P2-name-input").style.display = "none";
                if (playerNumbers === 1 && currentPlayer[0] === "o") {
                  setMessage("Thinking...");
                  computerTurn([
                    [null, null, null],
                    [null, null, null],
                    [null, null, null],
                  ]);
                } else {
                  setMessage(`${currentPlayer[1]}'s Turn`);
                }
              }}
            >
              Submit
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
