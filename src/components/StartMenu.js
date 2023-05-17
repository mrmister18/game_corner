import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

const StartMenu = () => {
    const navigate = useNavigate()

    return <div id='games-menu'>
        <h1 style={{textAlign:"center"}}>Choose a Game</h1>
        <div id='game-options'>
            <div>
       <div className='game-option clickable' id='tictactoe-preview' onClick={() => {navigate("/tictactoe")}}>
       </div>TIC-TAC-TOE</div>
       <div>
       <div className='game-option clickable' id='hangman-preview' onClick={() => {navigate("/hangman")}}>
       </div>HANGMAN</div>
       <div>
       <div className='game-option clickable' id='color-guesser-preview' onClick={() => {navigate("/colorpicker")}}>
       </div>COLOR GUESSER</div>
       </div>
    </div>
}

export default StartMenu;