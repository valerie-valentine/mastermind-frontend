import React from "react";
import { useState } from "react";
import "./NewGameForm.css";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import { createUser } from "../NetworkMethods";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const NewUserForm = ({ onCreateClient }) => {
  const navigate = useNavigate();
  const { actions } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newClient = {
      email: email,
      password: password,
      username: username,
    };
    const response = await createUser(newClient);
    if (response.status === 201) {
      try {
        const user = await actions.signIn(newClient);
        user ? navigate("/new_game") : navigate("/error");
      } catch (error) {
        console.log(error);
      }
    }
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const checkInputs = () => {
    return (
      !email.includes("@") ||
      !email.includes(".") ||
      password.length < 8 ||
      password.length > 20 ||
      username.length < 3
    );
  };

  return (
    <div className="NewGameForm flex flex-col justify-center max-w-fit m-auto">
      <h2 className="text-center">Sign Up</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 max-w-md m-auto"
      >
        <TextField
          error={username !== "" && username.length < 3}
          id="username"
          label="Username"
          variant="standard"
          helperText="Please enter username with at least 3 characters"
          onChange={handleUsernameChange}
        />
        <TextField
          error={email !== "" && (!email.includes("@") || !email.includes("."))}
          id="email"
          label="Email"
          type="email"
          variant="standard"
          helperText="Please enter a valid email"
          onChange={handleEmailChange}
        />
        <TextField
          error={
            password !== "" && (password.length < 8 || password.length > 20)
          }
          id="password"
          label="Password"
          variant="standard"
          helperText="Enter a password between 8 and 20 characters"
          onChange={handlePasswordChange}
        />
        <div className="flex gap-4 w-fit m-auto">
          <Button
            className="w-32"
            variant="contained"
            type="submit"
            disabled={checkInputs()}
          >
            Sign Up
          </Button>
          <Button className="w-32" variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
      <p className="mt-10">
        Already have a user account? Click here to{" "}
        <Link to="/login">sign in</Link>!
      </p>
    </div>
  );
};

export default NewUserForm;
