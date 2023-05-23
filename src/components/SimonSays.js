import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const SimonSays = () => {
    const navigate = useNavigate()
    const [gameState, setGameState] = useState({
        pattern: [],
        guesses: [],
        gameOver: true,
        highScore: 0,
        message: `&larr;`
    })

    return <div id='simon-says'>
        <div
        className="highlight clickable button back-button"
        onClick={() => {
          navigate("/");
        }}
      >
        &lt;-
      </div>
      <div id='simon-says-board' className='column'>
        <div id='red'></div>
        <div className='row'>
            <div id='green'></div>
            <div id="simon-center">{gameState.message}</div>
            <div id='blue'></div>
        </div>
        <div id='yellow'></div>
      </div>
    </div>
}

export default SimonSays;