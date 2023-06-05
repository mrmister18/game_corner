import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { shuffle, deal } from '../game_logic/blackjack'

const Blackjack = () => {
    const navigate = useNavigate()
    const [gameState, setGameState] = useState({
      deck: [],
        money: 1000,
        dealer: {
            hand: [],
            points: 0
        },
        player: {
            hand: [],
            points: 0
        }
    })

    useEffect(() => {
      let suits = ["hearts", "diamonds", "spades", "clubs"]
let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
let deck = []
for (let i = 0; i < suits.length; i++) {
  for (let j = 0; j < values.length; j++) {
    deck.push({
      suit: suits[i],
      value: values[j]
    })
  }
}
let gameStateCopy = {...gameState, deck: deck}
setGameState(gameStateCopy)
    }, [])
    return <div id='blackjack'>
        <div
          className="highlight clickable button back-button"
          onClick={() => {
            navigate("/");
          }}
        >
          &lt;-
        </div>
        <div className='card' onClick={() => console.log(gameState)}><div>2</div><div className='suit'>&spades;</div></div>
        <div className='button clickable highlight' onClick={() => {
          let gameStateCopy = {...gameState}
          gameStateCopy.deck = shuffle(gameStateCopy.deck)
          function initDeal(hand) {
            let idx = Math.floor(Math.random() * gameStateCopy.deck.length)
            hand.push(gameStateCopy.deck[idx])
            gameStateCopy.deck.splice(idx, 1)
            return hand
          }
          gameStateCopy.player.hand = initDeal(gameStateCopy.player.hand)
          gameStateCopy.dealer.hand = initDeal(gameStateCopy.dealer.hand)
          gameStateCopy.player.hand = initDeal(gameStateCopy.player.hand)
          gameStateCopy.dealer.hand = initDeal(gameStateCopy.dealer.hand)
          setGameState(gameStateCopy)
        }}>DEAL</div>
    </div>
}

export default Blackjack;