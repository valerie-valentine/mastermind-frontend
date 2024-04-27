import "./Game.css";
import { useState, useRef, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getIndividualGame, postGuessToGame, getHint } from "../NetworkMethods";
import UserContext from "../context/UserContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Game = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const overlay = useRef(null);
  const gameOverMessage = useRef(null);
  const [guess, setGuess] = useState([...Array(4).fill(null)]);
  const [gameData, setGameData] = useState(null);
  const [error, setError] = useState(null);
  const [hint, setHint] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const { authUser } = useContext(UserContext);

  const feedback = (guesses) => {
    if (error) {
      return error;
    }
    if (hint) {
      return hint;
    }
    if (guesses.length === 0) {
      return "No guesses made yet.";
    }
    const lastGuess = guesses[guesses.length - 1];
    let message = `Your previous guess was ${lastGuess.guess}. `;

    if (lastGuess.correct_num === 0 && lastGuess.correct_loc === 0) {
      message += "All incorrect. There were no correct numbers or locations.";
    } else {
      message += `There were ${lastGuess.correct_num} correct numbers and ${lastGuess.correct_loc} correct locations.`;
    }

    return message;
  };

  useEffect(() => {
    const fetchGame = async (id) => {
      try {
        const res = await getIndividualGame(id);
        if (res.status === 200) {
          setGameData(res.data.game);
          setGuess([...Array(res.data.game.difficulty_level).fill(null)]);
        } else if (res.status === 404) {
          navigate("/notfound");
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    };
    fetchGame(id);
  }, [id, navigate]);

  useEffect(() => {
    if (gameData && gameData.game_status !== "In Progress") {
      overlay.current.style.display = "";
      overlay.current.className =
        gameData.game_status === "Win" ? "win" : "lose";
      gameOverMessage.current.textContent =
        gameData.game_status === "Win"
          ? "Congrats, you won! 🎉"
          : "Sorry, you lost! 😢";
    }
  }, [gameData]);

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

  const handleSubmitGuess = async () => {
    const guessData = { guess: guess.join("") };
    try {
      const res = await postGuessToGame(gameData.game_id, guessData);
      if (res.status === 201) {
        setGameData(res.data.game);
        setError(null);
        setHint(null);
        setGuess([...Array(res.data.game.difficulty_level).fill(null)]);
      } else if (res.status === 400) {
        setError(res.data.details);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackspace = () => {
    const guessCopy = guess.slice();
    const emptyIndex =
      guessCopy.indexOf(null) === -1 ? guess.length : guessCopy.indexOf(null);
    if (emptyIndex === 0) {
      return;
    }
    guessCopy[emptyIndex - 1] = null;
    setGuess(guessCopy);
  };

  const handleHint = async () => {
    const res = await getHint(gameData.game_id);
    setHint(res.hint);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div id="overlay" className="start" ref={overlay}>
        <h2 className="title text-center">Mastermind</h2>
        <h1
          id="game-over-message"
          className="text-center"
          ref={gameOverMessage}
        ></h1>
        {gameData && gameData.game_status === "In Progress" ? (
          <button id="btn__reset" onClick={hideOverlay}>
            {gameData && gameData.guesses.length === 0 ? "Start" : "Continue"}{" "}
            Game
          </button>
        ) : (
          ""
        )}
      </div>
      <div id="banner" className="section">
        <h2 className="header">Mastermind</h2>
      </div>

      <div>
        <Button
          disabled={
            gameData && gameData.guesses && gameData.guesses.length === 0
          }
          onClick={handleHint}
        >
          Hint
        </Button>
        <Button onClick={handleModalOpen}>Past Guesses</Button>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="text-center"
            >
              Past Guesses
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              className="text-center flex gap-4 flex-col"
            >
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow className="bg-gray-300">
                      <TableCell>#</TableCell>
                      <TableCell align="center">Guess</TableCell>
                      <TableCell align="center">Correct Number</TableCell>
                      <TableCell align="center">Correct Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {gameData &&
                      gameData.guesses.map((row, index) => (
                        <TableRow
                          key={row.guess_id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell align="center">{row.guess}</TableCell>
                          <TableCell align="center">
                            {row.correct_num}
                          </TableCell>
                          <TableCell align="center">
                            {row.correct_loc}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Typography>
          </Box>
        </Modal>
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
      <div
        id="feedback"
        className={`mb-6 text-lg ${error && "text-red-500"} ${
          hint && "text-teal-500"
        }`}
      >
        {<p>{gameData && feedback(gameData.guesses)}</p>}
      </div>

      <div id="qwerty" className="section flex justify-center">
        <div className="keyrow">
          {[...Array(10).keys()].map((num, index) => {
            return (
              <button
                key={index}
                className="key"
                onClick={handleInputClick}
                disabled={
                  gameData && (num < gameData.num_min || num > gameData.num_max)
                }
              >
                {num}
              </button>
            );
          })}
          <button className="key" onClick={handleBackspace}>
            Backspace
          </button>
          <button
            className="key submit-button flex justify-center items-center gap-2"
            onClick={handleSubmitGuess}
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
      <div id="scoreboard" className="section m-auto max-w-fit mt-6">
        <ol>
          {gameData &&
            [...Array(gameData.lives)].map((entry, index) => {
              return (
                <li className="tries" key={index}>
                  <img
                    src="../liveHeart.png"
                    alt="Heart Icon"
                    className="heart-lives"
                    height="35"
                    width="30"
                  />
                </li>
              );
            })}
          {gameData &&
            gameData.guesses.map((entry, index) => {
              return (
                <li className="tries" key={index}>
                  <img
                    src="../lostHeart.png"
                    alt="Heart Icon"
                    height="35"
                    width="30"
                  />
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
};

export default Game;

{
  /* <p>{gameData && feedback(gameData.guesses)}</p> */
}
