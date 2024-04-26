import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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
  getAllUserGames,
  deleteUser,
} from "./NetworkMethods.js";
import NewGameForm from "./components/NewGameForm.js";
import Game from "./components/Game.js";
import NewUserForm from "./components/NewUserForm.js";
import LoginForm from "./components/LoginForm.js";
import UserSignout from "./components/UserSignout.js";
import Header from "./components/Header.js";
import Welcome from "./components/Welcome.js";
import UserProfile from "./components/UserProfile.js";
import Error from "./components/Error.js";
import NotFound from "./components/NotFound.js";
import ScoreBoard from "./components/ScoreBoard.js";

function App() {
  const [gamesData, setGamesData] = useState([]);

  const createNewGame = (newGame) => {
    createGame(newGame).then((response) => {
      console.log(response);
      getAllGames().then((response) => {
        setGamesData(response);
      });
    });
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="new_game"
          element={<NewGameForm onCreateGame={createNewGame} />}
        />
        <Route
          path="games/:id"
          element={<Game getGame={getIndividualGame} />}
        />
        <Route
          path="signup"
          element={<NewUserForm createUser={createUser} />}
        />
        <Route path="login" element={<LoginForm />} />
        <Route path="signout" element={<UserSignout />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="score_board" element={<ScoreBoard />} />
        <Route path="error" element={<Error />} />
        <Route path="notfound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

// <div className="App">
// <Header />
// <Routes>
//   <Route path="/" element={<Courses />} />
//   <Route path="/courses/:id" element={<CourseDetail />} />
//   <Route element={<PrivateRoute />} >
//     <Route path="/courses/:id/update" element={<UpdateCourse />} />
//     <Route path="/courses/create" element={<CreateCourse />} />
//   </Route>
//   <Route path="/signin" element={<UserSignIn />} />
//   <Route path="/signout" element={<UserSignOut />} />
//   <Route path="/signup" element={<UserSignUp />} />
//   <Route path="/forbidden" element={<Forbidden />} />
//   <Route path="/error" element={<UnhandledError />} />
//   <Route path="/notfound" element={<NotFound item="course"/>} />
//   <Route path="*" element={<NotFound />} />
// </Routes>
// </div>
