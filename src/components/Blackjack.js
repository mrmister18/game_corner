import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Blackjack = () => {
    const navigate = useNavigate()

    return <div id='blackjack'>
        <div
          className="highlight clickable button back-button"
          onClick={() => {
            navigate("/");
          }}
        >
          &lt;-
        </div>
    </div>
}

export default Blackjack;