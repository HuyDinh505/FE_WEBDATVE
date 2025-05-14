import React, { useState } from "react";

const schedules = [
  "10:00 - 12:00",
  "13:00 - 15:00",
  "16:00 - 18:00",
  "19:00 - 21:00",
  "22:00 - 00:00",
];

const rooms = [
  "IMAX - HCinema",
  "4DX - HCinema",
  "Standard - HCinema",
  "VIP Lounge - HCinema",
];

const initialTickets = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  movie: `Phim ${index + 1}`,
  schedule: schedules[index % schedules.length], // Lấy suất chiếu từ danh sách
  room: rooms[index % rooms.length], // Lấy phòng chiếu từ danh sách
  user: `Người dùng ${index + 1}`,
  seat: `A${(index % 10) + 1}`,
  price: `${100000 + (index % 5) * 5000} VND`,
  status: index % 5 === 0 ? "Đã hủy" : "Đã thanh toán",
  createdAt: "13-04-2024",
}));

const ManageTickets = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentTickets = tickets.slice(startIdx, startIdx + itemsPerPage);

  // Xử lý duyệt vé
  const approveTicket = (id) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: "Đã thanh toán" } : ticket
      )
    );
  };

  // Xử lý hủy vé
  const cancelTicket = (id) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: "Đã hủy" } : ticket
      )
    );
  };

  // Xử lý xóa vé
  const deleteTicket = (id) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full h-full mx-auto">
      <div className="flex justify-between mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          + Tạo vé
        </button>
        <button className="bg-gray-200 text-black px-4 py-2 rounded">
          🔄 Refresh
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border p-2">Mã đơn hàng</th>
            <th className="border p-2">Tên phim</th>
            <th className="border p-2">Suất chiếu</th>
            <th className="border p-2">Phòng chiếu</th>
            <th className="border p-2">Người đặt</th>
            <th className="border p-2">Ghế</th>
            <th className="border p-2">Giá vé</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Ngày đặt</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentTickets.length > 0 ? (
            currentTickets.map((ticket) => (
              <tr key={ticket.id} className="text-center text-gray-700">
                <td className="border p-2 text-blue-500 cursor-pointer">
                  {ticket.id}
                </td>
                <td className="border p-2">{ticket.movie}</td>
                <td className="border p-2 text-red-500">{ticket.schedule}</td>
                <td className="border p-2">{ticket.room}</td>
                <td className="border p-2">{ticket.user}</td>
                <td className="border p-2">{ticket.seat}</td>
                <td className="border p-2">{ticket.price}</td>
                <td className="border p-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      ticket.status === "Đã thanh toán"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="border p-2">{ticket.createdAt}</td>
                <td className="border p-2 space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                    onClick={() => approveTicket(ticket.id)}
                  >
                    Duyệt vé
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                    onClick={() => cancelTicket(ticket.id)}
                  >
                    Hủy vé
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    onClick={() => deleteTicket(ticket.id)}
                  >
                    Xóa vé
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="border p-4 text-center text-gray-500">
                Không có vé nào!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PHÂN TRANG */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          className={`px-3 py-1 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ◀
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 text-white"
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default ManageTickets;
