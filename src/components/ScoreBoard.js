import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getTopPlayers } from "../NetworkMethods";

const ScoreBoard = () => {
  const navigate = useNavigate();
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    const fetchTopPlayers = async () => {
      try {
        const res = await getTopPlayers();
        if (res.status === 200) {
          setTopPlayers(res.data);
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    };
    fetchTopPlayers();
  }, []);

  return (
    <div className="Welcome flex flex-col justify-center max-w-fit m-auto">
      <h2 className="text-center mb-10">Top Players</h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow className="bg-gray-300">
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topPlayers &&
              topPlayers.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ScoreBoard;
