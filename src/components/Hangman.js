import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {} from "../game_logic/hangman";

const Hangman = () => {
  const navigate = useNavigate();

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
      <div id="hangman-visual" className="setup column">
        <div id="rafter" className="active"></div>
        <div className="row" id="between">
          <div id="hanged-man" className="row">
            <div id="left-arm" className="active"></div>
            <div id="center" className="column">
              <div id="rope" className="active"></div>
              <div id="head" className="active"></div>
              <div id="body" className="active"></div>
              <div id="legs" className="row">
                <div id="left-leg" className="active"></div>
                <div id="right-leg" className="active"></div>
              </div>
            </div>
            <div id="right-arm" className="active"></div>
          </div>
          <div id="pole" className="active"></div>
        </div>
        <div id="floor" className="active"></div>
      </div>
    </div>
  );
};

export default Hangman;
