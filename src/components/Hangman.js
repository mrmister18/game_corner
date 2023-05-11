import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {} from "../game_logic/hangman";

const Hangman = () => {
  const navigate = useNavigate();
const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
const [gameState, setGameState] = useState({
    word: "word",
    definition: "",
    tries: 10,
    message: "Guesses Remaining: 10",
    gameOver: false,
    guesses: []
})

  return (
    <div id="hangman">
      <div
        className="highlight clickable button back-button"
        onClick={() => {
          navigate("/");
        }}
      >
        &lt;-
      </div>
      <div className="title" onClick={() => {console.log(gameState)}}>{gameState.message}</div>
      <div className="row hangman-board">
          <div className="column">
              <div id="hangman-visual" className="setup column">
                <div id="rafter" className={gameState.tries >= 8 ? null : "active"}></div>
                <div className="row" id="between">
                  <div id="hanged-man" className="row">
                    <div id="left-arm"></div>
                    <div id="center" className="column">
                      <div id="rope" className={gameState.tries >= 7 ? null : "active"}></div>
                      <div id="head" className={gameState.tries >= 6 ? null : "active"}></div>
                      <div id="body" className={gameState.tries >= 5 ? null : "active"}></div>
                      <div id="legs" className="row">
                        <div id="left-leg" className={gameState.tries >= 2 ? null : "active"}></div>
                        <div id="right-leg" className={gameState.tries >= 1 ? null : "active"}></div>
                      </div>
                    </div>
                    <div id="right-arm"></div>
                  </div>
                  <div id="pole" className={gameState.tries >= 9 ? null : "active"}></div>
                </div>
                <div id="floor" className={gameState.tries >= 10 ? null : "active"}></div>
              </div>
              <div className="row" style={{justifyContent:"space-between"}}>
              {Array.from(gameState.word.toUpperCase()).map((letter) => {
                return <span className="letter" style={{textDecoration:"underline", margin:"5px"}}
                >{gameState.guesses.includes(letter) ? letter : <span>&nbsp;</span>}</span>
              })}</div>
          </div>
          <div className="row" style={{width:"65% "}}>
          <div id="alphabet">
          {alphabet.map((letter) => {
            return <span onClick={() => {
                if (!gameState.gameOver && !gameState.guesses.includes(letter)) {
                    let gameStateCopy = {...gameState}
                    gameStateCopy.guesses.push(letter)
                    gameStateCopy.tries --
                    gameStateCopy.message = `Guesses Remaining: ${gameStateCopy.tries}`
                    if (!gameStateCopy.tries) {gameStateCopy.gameOver = true
                    gameStateCopy.message = "Game Over"}
                    setGameState(gameStateCopy)
                }
            }}
            className={`letter smaller-button ${gameState.guesses.includes(letter) ? "active" : "highlight clickable"}`}>{letter}</span>
          })}</div>
          <div className="column">
          <div className="button highlight clickable" onClick={() => {
            setGameState({
                word: "",
                definition: "",
                tries: 10,
                message: "Guesses Remaining: 10",
                gameOver: false,
                guesses: []
            })
          }}>New Word</div>
          <div className="button highlight clickable">Hint</div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Hangman;
