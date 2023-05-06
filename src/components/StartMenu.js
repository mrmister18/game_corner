import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

const StartMenu = () => {
    const navigate = useNavigate()

    return <div id='games-menu'>
        <h1>Choose a Game</h1>
        <div id='game-options'>
       <div className='game-option clickable' onClick={() => {navigate("/tictactoe")}}>
       </div>
       <div className='game-option clickable'>
       </div>
       </div>
    </div>
}

export default StartMenu;