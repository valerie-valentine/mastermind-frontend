import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import UserContext from "../context/UserContext";

const Welcome = () => {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const username = authUser ? authUser.username : null;

  return (
    <div className="Welcome flex flex-col justify-center max-w-fit m-auto">
      <h1 className="text-center mb-10">
        Welcome {authUser && username} to Mastermind!
      </h1>
      {!authUser ? (
        <ul className="flex gap-4 m-auto">
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/new_game")}>Play as Guest</Button>
          </ButtonGroup>
        </ul>
      ) : (
        <ul className="flex gap-4 m-auto">
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={() => navigate("/profile")}>Profile</Button>
            <Button onClick={() => navigate("/new_game")}>New Game</Button>
            <Button onClick={() => navigate("/signout")}>Sign Out</Button>
          </ButtonGroup>
        </ul>
      )}
    </div>
  );
};

export default Welcome;
