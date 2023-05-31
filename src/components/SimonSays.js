import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SimonSays = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({
    pattern: [],
    guesses: [],
    gameOver: true,
    highScore: 0,
    score: 0,
  });
  const [direction, setDirection] = useState("");
  const [loading, setLoading] = useState(false)

  function inputColor(color) {
    if (!gameState.gameOver && !loading) {
      let gameStateCopy = { ...gameState };
      gameStateCopy.guesses.push(color);
      let idx = gameStateCopy.guesses.lastIndexOf(color);
      if (gameStateCopy.pattern[idx] === 0) {
        setDirection("\u2191");
      } else if (gameStateCopy.pattern[idx] === 1) {
        setDirection("\u2192");
      } else if (gameStateCopy.pattern[idx] === 2) {
        setDirection("\u2193");
      } else if (gameStateCopy.pattern[idx] === 3) {
        setDirection("\u2190");
      }
      if (gameStateCopy.guesses[idx] === gameStateCopy.pattern[idx]) {
        gameStateCopy.score++;
        setGameState(gameStateCopy);
        if (idx === gameStateCopy.pattern.length - 1) {
          gameStateCopy.guesses = [];
          gameStateCopy.pattern.push(Math.floor(Math.random() * 4));
        }
      } else {
        gameStateCopy.gameOver = true;
        if (gameStateCopy.score > gameStateCopy.highScore) {
          gameStateCopy.highScore = gameStateCopy.score;
        }
        setGameState(gameStateCopy);
      }
    }
  }

  function showPattern(pattern) {
    setLoading(true)
    setTimeout(() => {
      setDirection("");
    }, 500);
    for (let i = 0; i < pattern.length; i++) {
      setTimeout(() => {
        if (pattern[i] === 0) {
          setDirection("\u2191");
        } else if (pattern[i] === 1) {
          setDirection("\u2192");
        } else if (pattern[i] === 2) {
          setDirection("\u2193");
        } else if (pattern[i] === 3) {
          setDirection("\u2190");
        }
      }, 1000 + i * 1000);
      setTimeout(() => {
        setDirection("");
      }, 1500 + i * 1000);
    }
    setTimeout(() => {
      setDirection("");
      setLoading(false)
    }, 1000 + pattern.length * 1000);
  }

  useEffect(() => {
    showPattern(gameState.pattern);
  }, [gameState.pattern.length]);

  return (
    <div id="simon-says" style={{ width: "100%" }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div
          className="highlight clickable button back-button"
          onClick={() => {
            navigate("/");
          }}
        >
          &lt;-
        </div>
        <div>
          <div>HI SCORE: {gameState.highScore}</div>
          <div>SCORE: {gameState.score}</div>
        </div>
      </div>
      <div id="simon-says-board" className="column">
        <div
          id="red"
          style={direction === "\u2191" ? { borderBottomColor: "red" } : null}
          className="clickable"
          onClick={() => inputColor(0)}
        ></div>
        <div className="row">
          <div
            id="green"
            style={
              direction === "\u2190" ? { borderRightColor: "green" } : null
            }
            className="clickable"
            onClick={() => inputColor(3)}
          ></div>
          <div
            id="simon-center"
            className="row"
            style={
              direction === "\u2191"
                ? { color: "red" }
                : direction === "\u2192"
                ? { color: "blue" }
                : direction === "\u2193"
                ? { color: "yellow" }
                : direction === "\u2190"
                ? { color: "green" }
                : null
            }
          >
            {direction}
          </div>
          <div
            id="blue"
            style={direction === "\u2192" ? { borderLeftColor: "blue" } : null}
            className="clickable"
            onClick={() => inputColor(1)}
          ></div>
        </div>
        <div
          id="yellow"
          style={direction === "\u2193" ? { borderTopColor: "yellow" } : null}
          className="clickable"
          onClick={() => inputColor(2)}
        ></div>
      </div>
      <div className="row">
        <div
          className="clickable button highlight"
          onClick={async () => {
            let gameStateCopy = { ...gameState };
            gameStateCopy.score = 0;
            gameStateCopy.pattern = [Math.floor(Math.random() * 4)];
            gameStateCopy.gameOver = false;
            gameStateCopy.guesses = [];
            setGameState(gameStateCopy);
          }}
        >
          NEW GAME
        </div>
      </div>
    </div>
  );
};

export default SimonSays;
