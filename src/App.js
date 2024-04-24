import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  kBaseUrl,
  createGame,
  getIndividualGame,
  getAllGames,
  postGuessToGame,
  getAllGuessesForGame,
  deleteGame,
  getHint,
  createUser,
  getUser,
  authenticateUser,
  getAllUserGames,
  deleteUser,
} from "./NetworkMethods.js";

function App() {
  const [gamesData, setGamesData] = useState([]);
  // console.log(
  //   createGame({
  //     lives: 20,
  //     difficulty_level: 4,
  //     num_min: 0,
  //     num_max: 7,
  //     user_id: 7,
  //   })
  // );
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hi</h1>
      </header>
    </div>
  );
}

export default App;
