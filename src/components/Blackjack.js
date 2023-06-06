import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { shuffle, deal, suit } from '../game_logic/blackjack'

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
        },
        gameOver: true,
        bet: 1
    })
    const [dealerTurn, setDealerTurn] = useState(false)

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
        <div className='row'>
          <div className='column'>
            <div className='row'>
              {gameState.dealer.hand.map((card) => {
              return <div className='card'><div>{card.value}</div><div className='suit'>{suit(card.suit)}</div></div>
              })}
            </div>
            <div style={{textAlign: "center"}}>BLACK JACK PAYS 2 TO 1<br></br>DEALER MUST DRAW TO 16 AND STAND ON 17</div>
            <div className='row'>
              {gameState.player.hand.map((card) => {
              return <div className='card'><div>{card.value}</div><div className='suit'>{suit(card.suit)}</div></div>
              })}
            </div>
          </div>
          <div className='column'>
            <div className={`button ${gameState.bet < 10 && gameState.gameOver ? "clickable highlight" : null}`} onClick={() => {
              if (gameState.bet < 10 && gameState.gameOver) {
                let gameStateCopy = {...gameState}
                gameStateCopy.bet++
                setGameState(gameStateCopy)
              }
            }}>&#9650;</div>
            <div className='button'>{gameState.bet}</div>
            <div className={`button ${gameState.bet > 1 && gameState.gameOver ? "clickable highlight" : null}`} onClick={() => {
              if (gameState.bet > 1 && gameState.gameOver) {
                let gameStateCopy = {...gameState}
                gameStateCopy.bet--
                setGameState(gameStateCopy)
              }
            }}>&#9660;</div>
            <div className='button'>${gameState.money}</div>
            {gameState.gameOver ? <div className='button clickable highlight' onClick={() => {
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
              gameStateCopy.money -= gameStateCopy.bet
              gameStateCopy.gameOver = false
              setGameState(gameStateCopy)
            }}>DEAL</div> : null}
          </div>
        </div>
    </div>
}

export default Blackjack;