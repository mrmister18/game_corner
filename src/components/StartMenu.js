import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const StartMenu = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)

    return <div id='games-menu'>
        <h1 style={{textAlign:"center"}}>Choose a Game</h1>
        <div id='game-options'>
            {page === 1 ? <><div>
       <div className='game-option clickable' id='tictactoe-preview' onClick={() => {navigate("/tictactoe")}}>
       </div>TIC-TAC-TOE</div>
       <div>
       <div className='game-option clickable' id='hangman-preview' onClick={() => {navigate("/hangman")}}>
       </div>HANGMAN</div>
       <div>
       <div className='game-option clickable' id='color-picker-preview' onClick={() => {navigate("/colorpicker")}}>
       </div>COLOR PICKER</div><div
        className="highlight clickable button back-button"
        onClick={() => setPage(2)}
      >
        -&gt;
      </div></> : null}
       {page === 2 ? <><div
        className="highlight clickable button back-button"
        onClick={() => setPage(1)}
      >
        &lt;-
      </div><div>
       <div className='game-option clickable' id='connect-four-preview' onClick={() => {navigate("/connectfour")}}>
       </div>CONNECT FOUR</div>
       <div>
       <div className='game-option clickable' id='simon-says-preview' onClick={() => {navigate("/simonsays")}}>
       </div>SIMON SAYS</div>
       <div>
       <div className='game-option clickable' id='blackjack-preview' onClick={() => {navigate("/blackjack")}}>
       </div>BLACKJACK</div></> : null}
       </div>
    </div>
}

export default StartMenu;