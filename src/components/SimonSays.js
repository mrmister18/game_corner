import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const SimonSays = () => {
    const navigate = useNavigate()
    const [gameState, setGameState] = useState({
        pattern: [],
        guesses: [],
        gameOver: true,
        highScore: 0,
        score: 0,
        direction: ""
    })

    function showPattern(gameStateCopy) {
        for (let i = 0; i < gameStateCopy.pattern.length; i++) {
            setTimeout(() => {
                gameStateCopy.direction = gameStateCopy.pattern[i]
                setGameState(gameStateCopy)
            }, i * 1000 + 1000);
        }
    }

    function inputColor(color) {
        let gameStateCopy = {...gameState}
        gameStateCopy.guesses.push(color)
        let idx = gameStateCopy.guesses.lastIndexOf(color)
        if (gameStateCopy.guesses[idx] === gameStateCopy.pattern[idx]) {
            gameStateCopy.pattern.push(Math.floor(Math.random() * 4))
            gameStateCopy.score++
            setGameState(gameStateCopy)
        } else {
            gameStateCopy.gameOver = true
            if (gameStateCopy.score > gameStateCopy.highScore) {gameStateCopy.highScore = gameStateCopy.score}
            setGameState(gameStateCopy)
        }
    }

    return <div id='simon-says' style={{width: "100%"}}>
        <div className='row' style={{justifyContent: "space-between"}}>
        <div
        className="highlight clickable button back-button"
        onClick={() => {
          navigate("/");
        }}
      >
        &lt;-
      </div>
      <div>
      <div>HI SCORE: {gameState.highScore}</div>
      <div onClick={() => console.log(gameState)}>SCORE: {gameState.score}</div>
      </div>
      </div>
      <div id='simon-says-board' className='column'>
        <div id='red' className='clickable' onClick={() => inputColor(0)}></div>
        <div className='row'>
            <div id='green' className='clickable' onClick={() => inputColor(3)}></div>
            <div id="simon-center">{gameState.direction}</div>
            <div id='blue' className='clickable' onClick={() => inputColor(1)}></div>
        </div>
        <div id='yellow' className='clickable' onClick={() => inputColor(2)}></div>
      </div>
      <div className='row'>
        <div className='clickable button highlight'
        onClick={() => {
            let gameStateCopy = {...gameState}
            gameStateCopy.score = 0
            gameStateCopy.pattern = [Math.floor(Math.random() * 4)]
            gameStateCopy.gameOver = false
            gameStateCopy.guesses = []
            setGameState(gameStateCopy)
        }}>NEW GAME</div>
      </div>
    </div>
}

export default SimonSays;