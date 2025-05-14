import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const MovieTable = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Avengers: Endgame",
      genre: "Hành động",
      duration: "181 phút",
    },
    { id: 2, title: "Parasite", genre: "Tâm lý", duration: "132 phút" },
    {
      id: 3,
      title: "Inception",
      genre: "Khoa học viễn tưởng",
      duration: "148 phút",
    },
  ]);

  const handleEdit = (id) => {
    console.log("Sửa phim có ID:", id);
  };

  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Tên phim</TableCell>
            <TableCell>Thể loại</TableCell>
            <TableCell>Thời lượng</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie, index) => (
            <TableRow key={movie.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{movie.title}</TableCell>
              <TableCell>{movie.genre}</TableCell>
              <TableCell>{movie.duration}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(movie.id)}
                >
                  Sửa
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(movie.id)}
                  style={{ marginLeft: 8 }}
                >
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieTable;
