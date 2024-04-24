import React from "react";
import "./Game.css";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const Game = ({ game_data }) => {
  const { id } = useParams();
  const overlay = useRef(null);
  const [guess, setGuess] = useState([...Array(4).fill(null)]);

  const gameData = {
    id: 1,
    answer: "1234",
    lives: 5,
    difficulty_level: 4,
    num_min: 0,
    num_max: 9,
  };

  const hideOverlay = () => {
    overlay.current.style.display = "none";
  };

  const handleInputClick = (event) => {
    const key = event.target;
    const keyVal = key.textContent;
    const guessCopy = guess.slice();
    const emptyIndex = guessCopy.indexOf(null);
    guessCopy[emptyIndex] = keyVal;
    setGuess(guessCopy);
  };

  const handleBackspace = () => {
    const guessCopy = guess.slice();
    const emptyIndex =
      guessCopy.indexOf(null) === -1 ? 4 : guessCopy.indexOf(null);
    if (emptyIndex === 0) {
      return;
    }
    guessCopy[emptyIndex - 1] = null;
    setGuess(guessCopy);
  };

  //   hideOverlay();

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <div id="overlay" className="start" ref={overlay} >
        <h2 className="title center">Mastermind</h2>
        <h1 id="game-over-message"></h1>
        <button id="btn__reset" onClick={hideOverlay}>
          Start Game
        </button>
      </div> */}
      <div id="banner" className="section">
        <h2 className="header">Mastermind</h2>
      </div>

      <div id="phrase" className="section">
        <ul>
          {guess.map((letter, index) => {
            return (
              <li className={`letter ${letter !== null && "show"}`}>
                {letter}
              </li>
            );
          })}
        </ul>
      </div>

      <div id="qwerty" className="section flex justify-center">
        <div class="keyrow">
          {[...Array(10).keys()].map((num) => {
            return (
              <button className="key" onClick={handleInputClick}>
                {num}
              </button>
            );
          })}
          <button className="key" onClick={handleBackspace}>
            Backspace
          </button>
          <button
            className="key submit-button flex justify-center items-center gap-2"
            onClick={handleBackspace}
            disabled={guess.indexOf(null) !== -1}
          >
            Enter
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20 4v9a4 4 0 0 1-4 4H6.914l2.5 2.5L8 20.914L3.086 16L8 11.086L9.414 12.5l-2.5 2.5H16a2 2 0 0 0 2-2V4z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
