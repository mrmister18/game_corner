import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pointTally, shuffle, suit } from "../game_logic/blackjack";

const Blackjack = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({
    deck: [],
    money: 1000,
    dealer: {
      hand: [],
      points: 0,
    },
    player: {
      hand: [],
      points: 0,
    },
    gameOver: true,
    bet: 1,
    message: "BLACKJACK"
  });
  const [dealerTurn, setDealerTurn] = useState(false);

  useEffect(() => {
    let suits = ["hearts", "diamonds", "spades", "clubs"];
    let values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
        deck.push({
          suit: suits[i],
          value: values[j],
        });
      }
    }
    let gameStateCopy = { ...gameState, deck: deck };
    setGameState(gameStateCopy);
  }, []);
  return (
    <div id="blackjack">
      <div
        className="highlight clickable button back-button"
        onClick={() => {
          navigate("/");
        }}
      >
        &lt;-
      </div>
      <div className="row">
        <div className="column">
          <div className="title">{gameState.message}</div>
        <div>{dealerTurn || (gameState.dealer.hand.length && gameState.gameOver) ? gameState.dealer.points : null}</div>
          <div className="row">
            {gameState.dealer.hand.map((card, idx) => {
              return (
                <div className="card">
                  {idx === 0 && !dealerTurn && !gameState.gameOver ? null : <><div>{card.value}</div>
                  <div className="suit">{suit(card.suit)}</div></>}
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center" }}>
            BLACK JACK PAYS 2 TO 1<br></br>DEALER MUST DRAW TO 16 AND STAND ON
            17
          </div>
          <div className="row">
            {gameState.player.hand.map((card) => {
              return (
                <div className="card">
                  <div>{card.value}</div>
                  <div className="suit">{suit(card.suit)}</div>
                </div>
              );
            })}
          </div>
          {gameState.player.hand.length ? <div>{gameState.player.points}</div> : null}
        </div>
        <div className="column">
          <div
            className={`button ${
              gameState.bet < 10 && gameState.gameOver
                ? "clickable highlight"
                : null
            }`}
            onClick={() => {
              if (gameState.bet < 10 && gameState.gameOver) {
                let gameStateCopy = { ...gameState };
                gameStateCopy.bet++;
                setGameState(gameStateCopy);
              }
            }}
          >
            &#9650;
          </div>
          <div className="button">{gameState.bet}</div>
          <div
            className={`button ${
              gameState.bet > 1 && gameState.gameOver
                ? "clickable highlight"
                : null
            }`}
            onClick={() => {
              if (gameState.bet > 1 && gameState.gameOver) {
                let gameStateCopy = { ...gameState };
                gameStateCopy.bet--;
                setGameState(gameStateCopy);
              }
            }}
          >
            &#9660;
          </div>
          <div className="button">${gameState.money}</div>
          {gameState.gameOver ? (
            <div
              className="button clickable highlight"
              onClick={() => {
                let gameStateCopy = { ...gameState };
                gameStateCopy.deck = gameStateCopy.deck.concat(gameStateCopy.player.hand, gameStateCopy.dealer.hand)
          gameStateCopy.player.hand = []
          gameStateCopy.dealer.hand = []
                gameStateCopy.deck = shuffle(gameStateCopy.deck);
                function initDeal(hand) {
                  hand.push(gameStateCopy.deck[0]);
                  gameStateCopy.deck.splice(0, 1);
                  return hand;
                }
                gameStateCopy.player.hand = initDeal(gameStateCopy.player.hand);
                gameStateCopy.dealer.hand = initDeal(gameStateCopy.dealer.hand);
                gameStateCopy.player.hand = initDeal(gameStateCopy.player.hand);
                gameStateCopy.dealer.hand = initDeal(gameStateCopy.dealer.hand);
                gameStateCopy.money -= gameStateCopy.bet;
                gameStateCopy.gameOver = false;
                gameStateCopy.player.points = pointTally(gameStateCopy.player.hand)
                gameStateCopy.dealer.points = pointTally(gameStateCopy.dealer.hand)
                gameStateCopy.message = "PLAYER'S TURN"
                setGameState(gameStateCopy);
                setDealerTurn(false)
              }}
            >
              DEAL
            </div>
          ) : null}
          {gameState.gameOver ? null : (<>
            <div
              className="button clickable highlight"
              onClick={() => {
                let gameStateCopy = { ...gameState };
                function hit(hand) {
                  let gameStateCopy = { ...gameState };
                  hand.push(gameStateCopy.deck[0]);
                  gameStateCopy.deck.splice(0, 1);
                  return hand;
                }
                gameStateCopy.player.hand = hit(gameStateCopy.player.hand);
                gameStateCopy.player.points = pointTally(gameStateCopy.player.hand)
                if (gameStateCopy.player.points > 21) {gameStateCopy.message = "BUST"
              gameStateCopy.gameOver = true
            }
                setGameState(gameStateCopy)
              }}
            >
              HIT
            </div>
            <div className="button highlight clickable" onClick={() => {
              setDealerTurn(true)
              let gameStateCopy = { ...gameState };
              function hit(hand) {
                let gameStateCopy = { ...gameState };
                hand.push(gameStateCopy.deck[0]);
                gameStateCopy.deck.splice(0, 1);
                return hand;
              }
              while (gameStateCopy.dealer.points < 17) {gameStateCopy.dealer.hand = hit(gameStateCopy.dealer.hand)
                gameStateCopy.dealer.points = pointTally(gameStateCopy.dealer.hand)}
                setGameState(gameStateCopy)
            }}>STAND</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blackjack;
