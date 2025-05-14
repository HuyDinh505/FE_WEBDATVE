import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";

const TicketTable = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      movie: "Avengers",
      user: "Nguyễn Văn A",
      seat: "A1",
      date: "20/03/2025",
    },
    {
      id: 2,
      movie: "Parasite",
      user: "Trần Thị B",
      seat: "B3",
      date: "21/03/2025",
    },
    {
      id: 3,
      movie: "Inception",
      user: "Lê Văn C",
      seat: "C5",
      date: "22/03/2025",
    },
  ]);

  const [search, setSearch] = useState("");

  // Hàm tìm kiếm vé theo tên phim hoặc người đặt
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.movie.toLowerCase().includes(search.toLowerCase()) ||
      ticket.user.toLowerCase().includes(search.toLowerCase())
  );

  // Hàm xóa vé
  const handleDelete = (id) => {
    setTickets((prevTickets) =>
      prevTickets.filter((ticket) => ticket.id !== id)
    );
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Danh Sách Vé Đã Đặt</h2>

      {/* Ô tìm kiếm */}
      <TextField
        label="Tìm kiếm vé..."
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Bảng danh sách vé */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Phim</strong>
              </TableCell>
              <TableCell>
                <strong>Người Đặt</strong>
              </TableCell>
              <TableCell>
                <strong>Ghế</strong>
              </TableCell>
              <TableCell>
                <strong>Ngày</strong>
              </TableCell>
              <TableCell>
                <strong>Hành động</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.movie}</TableCell>
                  <TableCell>{ticket.user}</TableCell>
                  <TableCell>{ticket.seat}</TableCell>
                  <TableCell>{ticket.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(ticket.id)}
                    >
                      Hủy Vé
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Không tìm thấy vé nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TicketTable;
