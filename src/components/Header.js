import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Button from "@mui/material/Button";
import UserContext from "../context/UserContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Header() {
  const { authUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button
            color="inherit"
            className="text-xl"
            onClick={() => navigate("/")}
          >
            Mastermind
          </Button>
        </Typography>
        <Button color="inherit" onClick={handleModalOpen}>
          Instructions
        </Button>
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
              Instructions
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              className="text-center flex gap-4 flex-col"
            >
              <p>Welcome to Mastermind.</p>
              <p>Play against the computer and break the code to win.</p>
              <p>
                A random number from 0-9 will be generated based on the level
                you've chosen.
              </p>
              <p>You will have between 3 to 20 attempts to guess the number.</p>
              <p>Hints will be provided to help you along the way.</p>
              <p>Good luck!</p>
            </Typography>
          </Box>
        </Modal>

        <Button color="inherit" onClick={() => navigate("/new_game")}>
          New Game
        </Button>
        <Button color="inherit" onClick={() => navigate("/score_board")}>
          Score Board
        </Button>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {!authUser ? (
              <>
                <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
                <MenuItem onClick={() => navigate("/signup")}>Sign Up</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => navigate("/signout")}>
                  Sign Out
                </MenuItem>
              </>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
