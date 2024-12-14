import React from "react";
import "./SplashPage.css";
import { useNavigate } from "react-router-dom";

const SplashPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Enter button clicked!");
    // Add any action you want here, like navigating to another page or showing a message.
    navigate(`/welcome`);
  };

  return (
    <div className="flicker-container">
      <h1 className="flicker-text">Mastermind</h1>
      <button className="flicker-button" onClick={handleClick}>
        Enter
      </button>
    </div>
  );
};

export default SplashPage;
