import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Blackjack = () => {
    const navigate = useNavigate()
    const [gameState, setGameState] = useState({
        money: 0,
        dealer: {
            hand: [],
            points: 0
        },
        player: {
            hand: [],
            points: 0
        }
    })

    return <div id='blackjack'>
        <div
          className="highlight clickable button back-button"
          onClick={() => {
            navigate("/");
          }}
        >
          &lt;-
        </div>
        <div className='card'><div>2</div><div className='suit'>&spades;</div></div>
    </div>
}

export default Blackjack;