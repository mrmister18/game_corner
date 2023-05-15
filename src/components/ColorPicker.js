import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { randomColor } from '../game_logic/colorpicker';

const ColorPicker = () => {
    const navigate = useNavigate()
    const [gameState, setGameState] = useState({
        color: "",
        model: "",
        options: [],
        gameOver: true,
        message : "Pick a Model",
        picking: ""
    })

    return <div id='color-guesser'>
        <div
        className="highlight clickable button back-button"
        onClick={() => {
          navigate("/");
        }}
      >
        &lt;-
      </div>
        <div className='title' onClick={() => {console.log(gameState)}}>{gameState.message}</div>
        {gameState.model ? null : <div id='models' className='row'>
            <div className='clickable highlight button' onClick={() => {
                let gameStateCopy = {...gameState}
                gameStateCopy.model = "hex"
                gameStateCopy.message = "Difficulty?"
                setGameState(gameStateCopy)
            }}>HEX</div>
            <div className='clickable highlight button' onClick={() => {
                let gameStateCopy = {...gameState}
                gameStateCopy.model = "rgb"
                gameStateCopy.message = "Difficulty?"
                setGameState(gameStateCopy)
            }}>RGB</div>
            <div className='clickable highlight button' onClick={() => {
                let gameStateCopy = {...gameState}
                gameStateCopy.model = "hsl"
                gameStateCopy.message = "Difficulty?"
                setGameState(gameStateCopy)
            }}>HSL</div>
        </div>}
        {gameState.model && !gameState.color ? Array.from({length: 9}, (_, i) => i + 2).map((number) => {
            return <span className='clickable highlight button' onClick={() => {
                let gameStateCopy = {...gameState}
                gameStateCopy.color = randomColor(gameState.model)
                for (let i = 0; i < number - 1; i++) {
                    let color = randomColor(gameState.model)
                    while (color === gameState.color) {color = randomColor(gameState.model)}
                    gameStateCopy.options.push(randomColor(gameState.model))
                }
                gameStateCopy.options.splice(Math.floor(Math.random() * gameStateCopy.options.length + 1), 0, gameStateCopy.color)
                gameStateCopy.message = "Mode?"
                setGameState(gameStateCopy)
            }}>{number}</span>
        }) : null}
        {gameState.model && gameState.color && !gameState.picking ? <div className='row'>
            <span className='clickable highlight button' onClick={() => {
                let gameStateCopy = {...gameState}
                gameStateCopy.picking = "color"
                setGameState(gameStateCopy)
            }}>Pick Color</span>
            <span className='clickable highlight button' onClick={() => {
                let gameStateCopy = {...gameState}
                gameStateCopy.picking = "value"
                setGameState(gameStateCopy)
            }}>Pick Value</span>
        </div> : null}
        {gameState.color && gameState.model && gameState.picking ? <div id='color-guesser-board' className='column'>
            <div id='color'>{gameState.model === "hex" ? `#${gameState.color}` : gameState.model === "rgb" ? `rgb(${gameState.color[0]}, ${gameState.color[1]}, ${gameState.color[2]})` : `hsl(${gameState.color[0]}, ${gameState.color[1]}%, ${gameState.color[2]}%)`}</div>
            <div id='color-options' className='row'>
                {gameState.options.map((option) => {
                    return <div className='clickable highlight button'>{gameState.model === "hex" ? `#${option}` : gameState.model === "rgb" ? `rgb(${option[0]}, ${option[1]}, ${option[2]})` : `hsl(${option[0]}, ${option[1]}%, ${option[2]}%)`}</div>
                })}
            </div>
            </div> : null}
    </div>
}

export default ColorPicker;