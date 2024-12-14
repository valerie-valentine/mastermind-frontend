import React from "react";
import { useState } from "react";
import "./NewGameForm.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createGame } from "../NetworkMethods";
import UserContext from "../context/UserContext";

const difficulties = [
  {
    value: 4,
    label: "Easy",
  },
  {
    value: 6,
    label: "Medium",
  },
  {
    value: 8,
    label: "Hard",
  },
];

const NewGameForm = ({ onCreateGame }) => {
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  const [lives, setLives] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState(null);
  const [minimumNum, setMinimumNum] = useState(null);
  const [maximumNum, setMaximumNum] = useState(null);

  const handleLivesChange = (event) => {
    setLives(Number(event.target.value));
  };

  const handleDifficultyLevelChange = (event) => {
    setDifficultyLevel(event.target.value);
  };

  const handleMinimumNumChange = (event) => {
    setMinimumNum(Number(event.target.value));
  };

  const handleMaximumNumChange = (event) => {
    setMaximumNum(Number(event.target.value));
  };

  const checkInputs = () => {
    return (
      lives < 3 ||
      lives > 20 ||
      minimumNum < 0 ||
      minimumNum > 9 ||
      maximumNum < 1 ||
      maximumNum > 9 ||
      maximumNum < minimumNum ||
      difficultyLevel === null // Check if difficulty level is not selected
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newGame = {
      lives: lives,
      difficulty_level: difficultyLevel,
      num_min: minimumNum,
      num_max: maximumNum,
      client_id: authUser ? authUser.client_id : null,
    };
    const response = await createGame(newGame);
    // have a guard clause to check if response is undefined and then handle and navigate to error page
    if (response.status === 201) {
      try {
        const game = response.data.game;
        game ? navigate(`/games/${game.game_id}`) : navigate("/error");
      } catch (error) {
        console.log(error);
      }
    }
    setLives("");
    setDifficultyLevel("");
    setMinimumNum("");
    setMaximumNum("");
  };

  return (
    <div className="NewGameForm flex flex-col justify-center max-w-fit m-auto">
      <h2 className="text-center">Create a New Game</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 max-w-md m-auto"
      >
        <TextField
          error={lives !== null && (lives < 3 || lives > 20)}
          id="lives"
          label="Lives"
          variant="standard"
          helperText="Enter number of lives between 3 and 20"
          onChange={handleLivesChange}
        />
        <TextField
          id="standard-select-currency-native"
          select
          label="Difficulty Level"
          defaultValue="4"
          helperText="Please select your difficulty level"
          onChange={handleDifficultyLevelChange}
        >
          {difficulties.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          error={minimumNum !== null && (minimumNum < 0 || minimumNum > 9)}
          id="minimumNum"
          label="Minimum Number"
          variant="standard"
          helperText="Enter a number between 0 and 9"
          onChange={handleMinimumNumChange}
        />
        <TextField
          error={
            maximumNum !== null &&
            (maximumNum < 1 || maximumNum > 9 || maximumNum < minimumNum)
          }
          id="maximumNum"
          label="Maximum Number"
          variant="standard"
          helperText="Enter a number between 0 and 9 and greater than minimum number"
          onChange={handleMaximumNumChange}
        />
        <Button variant="text" type="submit" disabled={checkInputs()}>
          Create Game
        </Button>
      </form>
    </div>
  );
};

export default NewGameForm;
