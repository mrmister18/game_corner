import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { REACT_APP_API_KEY } = process.env;

const Hangman = () => {
  const navigate = useNavigate();
const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
const [gameState, setGameState] = useState({
    word: "word",
    definition: "definition",
    tries: 10,
    message: "Guesses Remaining: 10",
    gameOver: false,
    guesses: []
})
const [hint, setHint] = useState(false)
    async function getWord() {
            const options = {
            method: 'GET',
            url: 'https://wordsapiv1.p.rapidapi.com/words/',
            params: {random: 'true'},
            headers: {
              'X-RapidAPI-Key': REACT_APP_API_KEY,
              'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              return(response.data);
          } catch (error) {
              console.error(error);
          }
    }

    function checkWin(gameState) {
        for (let i = 0; i < gameState.word.length; i++) {
            if (!alphabet.includes(gameState.word[i].toUpperCase())) {continue}
            if (!gameState.guesses.includes(gameState.word[i].toUpperCase())) {
                return false
            }
        } return true
    }
    useEffect(() => {
        const getGameWord = async () => {
            let data = await getWord();
            while (!data.results[0]) {data = await getWord();}
            let gameStateCopy = {...gameState}
            gameStateCopy.word = data.word
            gameStateCopy.definition = data.results[0].definition
            setGameState(gameStateCopy);
          };
          getGameWord()
    }, [])

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
          <div className="column" style={{width:"50%"}}>
              <div id="hangman-visual" className="setup column">
                <div id="rafter" className={gameState.tries >= 8 ? null : "active"}></div>
                <div className="row" id="between">
                  <div id="hanged-man" className="row">
                    <div id="left-arm" style={gameState.tries >= 3 ? {borderColor:"black"} : null}></div>
                    <div id="center" className="column">
                      <div id="rope" className={gameState.tries >= 7 ? null : "active"}></div>
                      <div id="head" className={gameState.tries >= 6 ? null : "active"}></div>
                      <div id="body" className={gameState.tries >= 5 ? null : "active"}></div>
                      <div id="legs" className="row">
                        <div id="left-leg" className={gameState.tries >= 2 ? null : "active"}></div>
                        <div id="right-leg" className={gameState.tries >= 1 ? null : "active"}></div>
                      </div>
                    </div>
                    <div id="right-arm" style={gameState.tries >= 4 ? {borderColor:"black"} : null}></div>
                  </div>
                  <div id="pole" className={gameState.tries >= 9 ? null : "active"}></div>
                </div>
                <div id="floor" className={gameState.tries >= 10 ? null : "active"}></div>
              </div>
              <div className="row" style={{flexWrap:"wrap"}}>
              {gameState.word.length ? Array.from(gameState.word.toUpperCase()).map((letter) => {
                return <span className={`letter ${gameState.gameOver && !gameState.guesses.includes(letter) ? "wrong" : null}`}
                >{alphabet.includes(letter) ? gameState.guesses.includes(letter) || gameState.gameOver ? letter : <span>_</span> : letter}</span>
              }) : null}</div>
          </div>
          <div className="column" style={{width: "50%", height:"50%"}}>
          <div className="row" style={{height:"50%"}}>
          <div id="alphabet">
          {alphabet.map((letter) => {
            return <span onClick={() => {
                if (!gameState.gameOver && !gameState.guesses.includes(letter)) {
                    let gameStateCopy = {...gameState}
                    gameStateCopy.guesses.push(letter)
                    if (checkWin(gameStateCopy)) {gameStateCopy.gameOver = true
                    gameStateCopy.message = "You Win!"}
                    if (!gameState.word.toUpperCase().includes(letter)) {gameStateCopy.tries --
                    gameStateCopy.message = `Guesses Remaining: ${gameStateCopy.tries}`}
                    if (!gameStateCopy.tries) {gameStateCopy.gameOver = true
                    gameStateCopy.message = "Game Over"}
                    setGameState(gameStateCopy)
                }
            }}
            className={`smaller-button ${gameState.guesses.includes(letter) ? gameState.word.toUpperCase().includes(letter) ? "active" : "incorrect" : gameState.gameOver ? null : `highlight clickable`}`}>{letter}</span>
          })}</div>
          <div className="column" style={{alignItems:"stretch"}}>
          <div className="button highlight clickable" onClick={async () => {
            let gameStateCopy = {...gameState}
            gameStateCopy.message = "Searching..."
            setGameState(gameStateCopy)
            let data = await getWord();
            while (!data.results) {data = await getWord();}
            setHint(false)
            setGameState({
                word: data.word,
                definition: data.results[0].definition,
                tries: 10,
                message: "Guesses Remaining: 10",
                gameOver: false,
                guesses: []
            })
          }}>New Game</div>
          <div className="button highlight clickable"
          onClick={() => {setHint(true)}} style={{textAlign:"center"}}>Hint</div>
          </div>
          </div>
          <div id="hint">{hint || gameState.gameOver ? gameState.definition : null}</div>
          </div>
      </div>
    </div>
  );
};

export default Hangman;
