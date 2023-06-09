import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hslToRGB, randomColor, hexToRGB } from "../game_logic/colorpicker";

const ColorPicker = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({
    color: "",
    model: "",
    options: [],
    guesses: [],
    gameOver: true,
    message: "Pick a Model",
    picking: "",
  });

  return (
    <div id="color-guesser">
      <div
        className="highlight clickable button back-button"
        onClick={() => {
          navigate("/");
        }}
      >
        &lt;-
      </div>
      <div className="column">
        <div
          className="title"
          >
          {gameState.message}
        </div>
        {gameState.model ? null : (
          <div id="models" className="row">
            <div
              className="clickable highlight button"
              onClick={() => {
                let gameStateCopy = { ...gameState };
                gameStateCopy.model = "hex";
                gameStateCopy.message = "Difficulty?";
                setGameState(gameStateCopy);
              }}
            >
              HEX
            </div>
            <div
              className="clickable highlight button"
              onClick={() => {
                let gameStateCopy = { ...gameState };
                gameStateCopy.model = "rgb";
                gameStateCopy.message = "Difficulty?";
                setGameState(gameStateCopy);
              }}
            >
              RGB
            </div>
            <div
              className="clickable highlight button"
              onClick={() => {
                let gameStateCopy = { ...gameState };
                gameStateCopy.model = "hsl";
                gameStateCopy.message = "Difficulty?";
                setGameState(gameStateCopy);
              }}
            >
              HSL
            </div>
          </div>
        )}
        {gameState.model && !gameState.color
          ? <div>{Array.from({ length: 9 }, (_, i) => i + 2).map((number) => {
              return (
                <span
                  className="clickable highlight button"
                  onClick={() => {
                    let gameStateCopy = { ...gameState };
                    gameStateCopy.color = randomColor(gameState.model);
                    for (let i = 0; i < number - 1; i++) {
                      let color = randomColor(gameState.model);
                      while (color === gameState.color) {
                        color = randomColor(gameState.model);
                      }
                      gameStateCopy.options.push(randomColor(gameState.model));
                    }
                    gameStateCopy.options.splice(
                      Math.floor(
                        Math.random() * gameStateCopy.options.length + 1
                      ),
                      0,
                      gameStateCopy.color
                    );
                    gameStateCopy.message = "Mode?";
                    setGameState(gameStateCopy);
                  }}
                >
                  {number}
                </span>
              );
            })}</div>
          : null}
        {gameState.model && gameState.color && !gameState.picking ? (
          <div className="row">
            <span
              className="clickable highlight button"
              onClick={() => {
                let gameStateCopy = { ...gameState };
                gameStateCopy.picking = "color";
                gameStateCopy.message = "Pick the right color";
                gameStateCopy.gameOver = false;
                setGameState(gameStateCopy);
              }}
            >
              Pick Color
            </span>
            <span
              className="clickable highlight button"
              onClick={() => {
                let gameStateCopy = { ...gameState };
                gameStateCopy.picking = "value";
                gameStateCopy.message = "Pick the right color value";
                gameStateCopy.gameOver = false;
                setGameState(gameStateCopy);
              }}
            >
              Pick Value
            </span>
          </div>
        ) : null}
        {gameState.color && gameState.model && gameState.picking ? (
          <div id="color-guesser-board" className="column">
            <div
              className="color-option button"
              style={
                gameState.picking === "value" || gameState.gameOver
                  ? gameState.model === "hex"
                    ? { backgroundColor: `#${gameState.color}`,
                    color: `rgb(${Math.abs(255 - hexToRGB(gameState.color)[0])}, ${Math.abs(255 - hexToRGB(gameState.color)[1])}, ${Math.abs(255 - hexToRGB(gameState.color)[2])})`,
                    border: '1px solid white'
                   }
                    : gameState.model === "rgb"
                    ? {
                        backgroundColor: `rgb(${gameState.color[0]}, ${gameState.color[1]}, ${gameState.color[2]})`,
                        color: `rgb(${Math.abs(255 - gameState.color[0])}, ${Math.abs(255 - gameState.color[1])}, ${Math.abs(255 - gameState.color[2])})`,
                        border: '1px solid white'
                      }
                    : {
                        backgroundColor: `hsl(${gameState.color[0]}, ${gameState.color[1]}%, ${gameState.color[2]}%)`,
                        color: `rgb(${Math.abs(255 - hslToRGB(gameState.color)[0])}, ${Math.abs(255 - hslToRGB(gameState.color)[1])}, ${Math.abs(255 - hslToRGB(gameState.color)[2])})`,
                        border: '1px solid white'
                      }
                  : null
              }
            >
              {gameState.picking === "color" || gameState.gameOver
                ? gameState.model === "hex"
                  ? `#${gameState.color}`
                  : gameState.model === "rgb"
                  ? `rgb(${gameState.color[0]}, ${gameState.color[1]}, ${gameState.color[2]})`
                  : `hsl(${gameState.color[0]}, ${gameState.color[1]}%, ${gameState.color[2]}%)`
                : null}
            </div>
            <div id="color-options" className="row">
              {gameState.options.map((option) => {
        
                return (
                  <div
                    className={`${gameState.gameOver || gameState.guesses.includes(option) ? null : "clickable highlight"} button color-option`}
                    onClick={() => {
                      if (gameState.gameOver) {return}
                      let gameStateCopy = { ...gameState };
                      if (option === gameStateCopy.color) {
                        gameStateCopy.message = "You Win!";
                        gameStateCopy.gameOver = true;
                      } else {
                        gameStateCopy.message = "Try Again";
                        gameStateCopy.guesses.push(option);
                      }
                      setGameState(gameStateCopy);
                    }}
                    style={
                      gameState.picking === "color" ||
                      gameState.gameOver ||
                      gameState.guesses.includes(option)
                        ? gameState.model === "hex"
                          ? { backgroundColor: `#${option}`,
                        color: `rgb(${Math.abs(255 - hexToRGB(option)[0])}, ${Math.abs(255 - hexToRGB(option)[1])}, ${Math.abs(255 - hexToRGB(option)[2])})` }
                          : gameState.model === "rgb"
                          ? {
                              backgroundColor: `rgb(${option[0]}, ${option[1]}, ${option[2]})`,
                              color: `rgb(${Math.abs(255 - option[0])}, ${Math.abs(255 - option[1])}, ${Math.abs(255 - option[2])})`
                            }
                          : {
                              backgroundColor: `hsl(${option[0]}, ${option[1]}%, ${option[2]}%)`,
                              color: `rgb(${Math.abs(255 - hslToRGB(option)[0])}, ${Math.abs(255 - hslToRGB(option)[1])}, ${Math.abs(255 - hslToRGB(option)[2])})`
                            }
                        : null
                    }
                  >
                    {gameState.guesses.includes(option) ||
                    gameState.picking === "value" ||
                    gameState.gameOver
                      ? gameState.model === "hex"
                        ? `#${option}`
                        : gameState.model === "rgb"
                        ? `rgb(${option[0]}, ${option[1]}, ${option[2]})`
                        : `hsl(${option[0]}, ${option[1]}%, ${option[2]}%)`
                      : null}
                  </div>
                );
              })}
            </div>
            <div className="row">
              <div className="button highlight clickable"
              onClick={() => {
                let gameStateCopy = { ...gameState };
                gameStateCopy.color = randomColor(gameState.model);
                gameStateCopy.options = []
                for (let i = 0; i < gameState.options.length - 1; i++) {
                  let color = randomColor(gameState.model);
                  while (color === gameState.color) {
                    color = randomColor(gameState.model);
                  }
                  gameStateCopy.options.push(randomColor(gameState.model));
                }
                gameStateCopy.options.splice(
                  Math.floor(
                    Math.random() * gameStateCopy.options.length + 1
                  ),
                  0,
                  gameStateCopy.color
                );
                gameStateCopy.message = "Pick the Color";
                gameStateCopy.gameOver = false
                setGameState(gameStateCopy);
              }}>New Game</div>
              <div className="button highlight clickable"
              onClick={() => {
                setGameState({
                  color: "",
                  model: "",
                  options: [],
                  guesses: [],
                  gameOver: true,
                  message: "Pick a Model",
                  picking: "",
                })
              }}>Settings</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ColorPicker;
