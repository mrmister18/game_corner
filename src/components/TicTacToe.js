import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  resetBoard,
  inputTurn,
  checkWin,
  onePlayer,
  twoPlayer,
  playerSelectMenu,
  computerTurn,
} from "../game_logic/tic-tac-toe";

const TicTacToe = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    players: [
      ["X", "1P"],
      ["O", "2P"],
    ],
    playerNumbers: 0,
    message: "Number of Players?",
    gameOver: true,
  });
  const [playerSelect, setPlayerSelect] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState([]);

  function switchPlayers() {
    let gameStateCopy = { ...gameState };
    if (currentPlayer[0] === "X") {
      setCurrentPlayer(gameStateCopy.players[1]);
    } else {
      setCurrentPlayer(gameStateCopy.players[0]);
    }
  }

  function onePlayerInput() {
    let gameStateCopy = { ...gameState };
    setCurrentPlayer(gameStateCopy.players[0]);
    gameStateCopy.board = computerTurn("O");
    gameStateCopy.gameOver = false;
    gameStateCopy.message = `${gameStateCopy.players[0][1]}'s Turn`;
    if (checkWin() !== "Tie" && checkWin()) {
      gameStateCopy.message = `Computer Wins!`;
      gameStateCopy.gameOver = true;
      setGameState(gameStateCopy);
    } else if (checkWin()) {
      gameStateCopy.message = `Tie`;
      gameStateCopy.gameOver = true;
      setGameState(gameStateCopy);
    }
    setGameState(gameStateCopy);
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
          <div className="title">
            {gameState.message}
          </div>
          <div className={`board`}>
            {gameState.board.map((row, idx) => {
              let arr = [];
              for (let i = 0; i < row.length; i++) {
                arr.push(
                  <div
                    className={`cell ${
                      gameState.gameOver || gameState.message === "Thinking..."
                        ? null
                        : "clickable"
                    }`}
                    onClick={() => {
                      if (
                        !gameState.gameOver &&
                        gameState.message !== "Thinking..."
                      ) {
                        let gameStateCopy = { ...gameState };
                        gameStateCopy.board = inputTurn(
                          i,
                          idx,
                          currentPlayer[0]
                        );
                        if (checkWin() !== "Tie" && checkWin()) {
                          gameStateCopy.message = `${currentPlayer[1]} Wins!`;
                          gameStateCopy.gameOver = true;
                          setGameState(gameStateCopy);
                          return;
                        } else if (checkWin()) {
                          gameStateCopy.message = `Tie`;
                          gameStateCopy.gameOver = true;
                          setGameState(gameStateCopy);
                          return;
                        }
                        if (gameStateCopy.playerNumbers === 1) {
                          gameStateCopy.message = "Thinking...";
                          setGameState(gameStateCopy);
                          setTimeout(() => {
                            onePlayerInput();
                          }, 2000);
                          return;
                        } else {
                          switchPlayers();
                          if (currentPlayer[0] === "X") {
                            gameStateCopy.message = `${gameStateCopy.players[1][1]}'s Turn`;
                          } else {
                            gameStateCopy.message = `${gameStateCopy.players[0][1]}'s Turn`;
                          }
                        }
                        setGameState(gameStateCopy);
                      }
                    }}
                  >
                    <span>{gameState.board[idx][i]}</span>
                  </div>
                );
              }
              return arr;
            })}
          </div>
          <div id="display-names" className="row">
            <span
              className={`player-option ${
                playerSelect && !gameState.playerNumbers
                  ? "highlight clickable"
                  : null
              } ${
                currentPlayer[0] === "X" && gameState.message !== "Thinking..."
                  ? "active"
                  : null
              }`}
              id="1Player"
              onClick={() => {
                if (playerSelect && !gameState.playerNumbers) {
                  onePlayer();
                  let gameStateCopy = { ...gameState };
                  gameStateCopy.playerNumbers = 1;
                  gameStateCopy.players[1][1] = "Computer";
                  gameStateCopy.message = "Name?"
                  setGameState(gameStateCopy);
                }
              }}
            >
              {gameState.players[0][1]}
            </span>
            <input
            maxLength={8}
              id="P1-name-input"
              className="player-option"
              value={gameState.players[0][1]}
              onChange={(e) => {
                let gameStateCopy = { ...gameState };
                gameStateCopy.players[0][1] = e.target.value;
                setGameState(gameStateCopy);
              }}
            ></input>
            <span
              className={`player-option ${
                playerSelect && !gameState.playerNumbers
                  ? "highlight clickable"
                  : null
              } ${
                currentPlayer[0] === "O" || gameState.message === "Thinking..."
                  ? "active"
                  : null
              }`}
              id="2Player"
              onClick={() => {
                if (playerSelect && !gameState.playerNumbers) {
                  twoPlayer();
                  let gameStateCopy = { ...gameState };
                  gameStateCopy.playerNumbers = 2;
                  gameStateCopy.message = "Names?"
                  setGameState(gameStateCopy);
                }
              }}
            >
              {gameState.players[1][1]}
            </span>
            <input
            maxLength={8}
              id="P2-name-input"
              className="player-option"
              value={gameState.players[1][1]}
              onChange={(e) => {
                let gameStateCopy = { ...gameState };
                gameStateCopy.players[1][1] = e.target.value;
                setGameState(gameStateCopy);
              }}
            ></input>
          </div>
        </div>
        <div>
          <div
            className="highlight clickable button"
            onClick={() => {
              if (gameState.message !== "Thinking...") {
                playerSelectMenu();
                resetBoard();
                setGameState({
                  board: [
                    [null, null, null],
                    [null, null, null],
                    [null, null, null],
                  ],
                  players: [
                    ["X", "1P"],
                    ["O", "2P"],
                  ],
                  playerNumbers: 0,
                  message: "Number of Players?",
                  gameOver: true,
                });
                setPlayerSelect(true);
                setCurrentPlayer([]);
              }
            }}
          >
            Players
          </div>
          {gameState.playerNumbers && !playerSelect ? (
            <div
              className="highlight clickable button"
              onClick={() => {
                if (gameState.message !== "Thinking...") {
                  let gameStateCopy = { ...gameState };
                  gameStateCopy.board = resetBoard();
                  gameStateCopy.gameOver = false;
                  gameStateCopy.message = `${currentPlayer[1]}'s Turn`;
                  setGameState(gameStateCopy);
                }
              }}
            >
              Reset
            </div>
          ) : null}
          {playerSelect && gameState.playerNumbers ? (
            <div
              className="highlight clickable button"
              onClick={() => {
                playerSelectMenu();
                setPlayerSelect(false);
                let gameStateCopy = { ...gameState };
                gameStateCopy.gameOver = false;
                let random = gameState.players[Math.round(Math.random())];
                if (gameStateCopy.playerNumbers === 2) {
                  setCurrentPlayer(random);
                } else {
                  setCurrentPlayer(gameStateCopy.players[0]);
                  if (random[1] === "Computer") {
                    gameStateCopy.message = "Thinking...";
                    setGameState(gameStateCopy);
                    setTimeout(() => {
                      onePlayerInput();
                    }, 2000);
                    return;
                  }
                }
                gameStateCopy.message = `${random[1]}'s Turn`;
                setGameState(gameStateCopy);
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
