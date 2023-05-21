import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { inputTurn, checkTie, checkWin } from '../game_logic/connect-four';

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
        gameOver: false,
        playerNumbers: 0,
        message: "Players?"
    })
    const [currentPlayer, setCurrentPlayer] = useState(gameState.players[0])

    function switchPlayers() {
        let gameStateCopy = { ...gameState };
        if (currentPlayer[0] === "R") {
          setCurrentPlayer(gameStateCopy.players[1]);
        } else {
          setCurrentPlayer(gameStateCopy.players[0]);
        }
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
      <div className='title'>{gameState.message}</div>
      <div className='column' id='connect-four-board'>
      {gameState.board.map((row) => {
        return <div className='row'>{row.map((cell, idx) => {
            return <div className={`connect-four-cell ${gameState.gameOver ? null : "clickable"}`} onClick={() => {
                if (!gameState.gameOver) {
                let gameStateCopy = {...gameState}
                gameStateCopy.board = inputTurn(idx, currentPlayer[0], gameStateCopy.board)
                if (checkWin(currentPlayer[0], gameStateCopy.board, currentPlayer[1])) {gameStateCopy.message = checkWin(currentPlayer[0], gameStateCopy.board, currentPlayer[1])
                gameStateCopy.gameOver = true}
                else if (checkTie(gameStateCopy.board)) {gameStateCopy.message = checkTie(gameStateCopy.board)
                    gameStateCopy.gameOver = true}
                setGameState(gameStateCopy)
                switchPlayers()}
            }}><div className='hole' style={cell === "Y" ? {backgroundColor:"yellow"} : cell === "R" ? {backgroundColor:"red"} : null}></div></div>
        })}</div>
      })}</div>
      <div className='row'>
        <div className='clickable button highlight'>{gameState.players[0][1]}</div>
        <div className='clickable button highlight'>{gameState.players[1][1]}</div>
      </div>
    </div>
}

export default ConnectFour;