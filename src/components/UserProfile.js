import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getUser } from "../NetworkMethods";

const UserProfile = () => {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const username = authUser ? authUser.username : null;
  const [user, setUser] = useState(null);

  const difficulties = {
    4: "Easy",
    6: "Medium",
    8: "Hard",
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser(authUser.client_id);
        if (res.status === 200) {
          setUser(res.data.client);
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
    fetchUser();
  }, []);

  return (
    <div className="Welcome flex flex-col justify-center max-w-fit m-auto">
      <h2 className="text-center mb-10">Welcome, {username}</h2>

      <h3 className="mb-8 text-center text-xl">
        <strong>Games Won:</strong> {user && user.score}
      </h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow className="bg-gray-300">
              <TableCell>Game ID</TableCell>
              <TableCell align="center">Difficulty Level</TableCell>
              <TableCell align="center">Lives</TableCell>
              <TableCell align="center">Min Number</TableCell>
              <TableCell align="center">Max Number</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user &&
              user.games.map((row) => (
                <TableRow
                  key={row.game_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => navigate(`/games/${row.game_id}`)}
                  className="cursor-pointer"
                >
                  <TableCell component="th" scope="row">
                    {row.game_id}
                  </TableCell>
                  <TableCell align="center">
                    {difficulties[row.difficulty_level]}
                  </TableCell>
                  <TableCell align="center">{row.lives}</TableCell>
                  <TableCell align="center">{row.num_min}</TableCell>
                  <TableCell align="center">{row.num_max}</TableCell>
                  <TableCell align="center">{row.game_status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserProfile;
