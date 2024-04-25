import React from "react";
import { useContext, useState } from "react";
import "./NewGameForm.css";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { actions } = useContext(UserContext);
  const [errors, setErrors] = useState([]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newClient = {
      email: email,
      password: password,
    };
    try {
      const user = await actions.signIn(newClient);
      user ? navigate("/new_game") : setErrors(["Sign-in was unsuccessful"]);
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };

  const checkInputs = () => {
    return (
      !email.includes("@") ||
      !email.includes(".") ||
      password.length < 8 ||
      password.length > 20
    );
  };

  return (
    <div className="NewGameForm flex flex-col justify-center max-w-fit m-auto">
      <h2 className="text-center">Sign In</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 max-w-md m-auto"
      >
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
        <Button
          className="w-full"
          variant="contained"
          type="submit"
          disabled={checkInputs()}
        >
          Sign In
        </Button>
      </form>
      <div className="error text-red-400 text-bold text-center">
        {errors.map((error, index) => (
          <div key={index}>{error}</div>
        ))}
      </div>
      <p className="mt-10">
        Don't have a user account? Click here to{" "}
        <Link to="/signup"> sign up</Link>!
      </p>
    </div>
  );
};

export default LoginForm;
