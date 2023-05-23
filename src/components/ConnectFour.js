import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { inputTurn, checkTie, checkWin, onePlayer, twoPlayer, playerSelectMenu, computerTurn } from '../game_logic/connect-four';

const ConnectFour = () => {
    const navigate = useNavigate()
    const [gameState, setGameState] = useState({
        board: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
          ],
        players: [["R", "1P"], ["Y", "2P"]],
        gameOver: true,
        playerNumbers: 0,
        message: "Players?",
        playerNumbers: 0
    })
    const [currentPlayer, setCurrentPlayer] = useState([])
    const [playerSelect, setPlayerSelect] = useState(true)

    function switchPlayers() {
        let gameStateCopy = { ...gameState };
        if (currentPlayer[0] === "R") {
          setCurrentPlayer(gameStateCopy.players[1]);
        } else {
          setCurrentPlayer(gameStateCopy.players[0]);
        }
      }

      function onePlayerInput() {
        let gameStateCopy = { ...gameState };
        setCurrentPlayer(gameStateCopy.players[0]);
        gameStateCopy.board = computerTurn("Y", gameStateCopy.board);
        gameStateCopy.gameOver = false;
        gameStateCopy.message = `${gameStateCopy.players[0][1]}'s Turn`;
        if (checkWin("Y", gameStateCopy.board, "Computer")) {
          gameStateCopy.message = `Computer Wins!`;
          gameStateCopy.gameOver = true;
          setGameState(gameStateCopy);
        } else if (checkTie(gameStateCopy.board)) {
          gameStateCopy.message = `Tie`;
          gameStateCopy.gameOver = true;
          setGameState(gameStateCopy);
        }
        setGameState(gameStateCopy);
      }

    return <div id='connect-four'>
        <div
        className="highlight clickable button back-button"
        onClick={() => {
          navigate("/");
        }}
      >
        &lt;-
      </div>
      <div className='row'>
      <div>
          <div className='title' onClick={() => {
            console.log(gameState)
          }}>{gameState.message}</div>
          <div className='column' id='connect-four-board'>
          {gameState.board.map((row) => {
            return <div className='row'>{row.map((cell, idx) => {
                return <div className={`connect-four-cell ${gameState.gameOver || gameState.message === "Thinking..." ? null : "clickable"}`} onClick={() => {
                    if (!gameState.gameOver && gameState.message !== "Thinking...") {
                    let gameStateCopy = {...gameState}
                    gameStateCopy.board = inputTurn(idx, currentPlayer[0], gameStateCopy.board)
                    if (checkWin(currentPlayer[0], gameStateCopy.board, currentPlayer[1])) {gameStateCopy.message = checkWin(currentPlayer[0], gameStateCopy.board, currentPlayer[1])
                    gameStateCopy.gameOver = true
                    setGameState(gameStateCopy)
                return}
                    else if (checkTie(gameStateCopy.board)) {gameStateCopy.message = checkTie(gameStateCopy.board)
                        gameStateCopy.gameOver = true
                        setGameState(gameStateCopy)
                    return}
                    if (gameStateCopy.playerNumbers === 1) {
                        gameStateCopy.message = "Thinking...";
                        setGameState(gameStateCopy);
                        setTimeout(() => {
                          onePlayerInput();
                        }, 2000);
                        return;
                      } else {
                        switchPlayers();
                        if (currentPlayer[0] === "R") {
                          gameStateCopy.message = `${gameStateCopy.players[1][1]}'s Turn`;
                        } else {
                          gameStateCopy.message = `${gameStateCopy.players[0][1]}'s Turn`;
                        }
                      }
                    setGameState(gameStateCopy)}
                }}><div className='hole' style={cell === "Y" ? {backgroundColor:"yellow"} : cell === "R" ? {backgroundColor:"red"} : null}></div></div>
            })}</div>
          })}</div>
          <div id="display-names" className="row">
                <span
                  className={`player-option ${
                    playerSelect && !gameState.playerNumbers
                      ? "highlight clickable"
                      : null
                  } ${
                    currentPlayer[0] === "R" && gameState.message !== "Thinking..."
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
                    currentPlayer[0] === "Y" || gameState.message === "Thinking..."
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
                setGameState({
                    board: [
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0],
                      ],
                    players: [["R", "1P"], ["Y", "2P"]],
                    gameOver: true,
                    playerNumbers: 0,
                    message: "Players?",
                    playerNumbers: 0
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
                  gameStateCopy.board = [
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                  ]
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
        </div></div>
    </div>
}

export default ConnectFour;