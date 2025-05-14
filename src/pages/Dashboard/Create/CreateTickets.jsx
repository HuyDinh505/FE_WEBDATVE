import React, { useState } from "react";

const CreateTickets = ({ onAddTicket }) => {
  const [newTicket, setNewTicket] = useState({
    movie: "",
    schedule: "",
    room: "",
    user: "",
    seat: "",
    price: "",
    date: "",
    status: "Chờ duyệt",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newTicket.movie ||
      !newTicket.schedule ||
      !newTicket.room ||
      !newTicket.user ||
      !newTicket.seat ||
      !newTicket.price ||
      !newTicket.date
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Gửi dữ liệu lên ManageTickets để thêm vé mới
    onAddTicket(newTicket);

    // Reset form
    setNewTicket({
      movie: "",
      schedule: "",
      room: "",
      user: "",
      seat: "",
      price: "",
      date: "",
      status: "Chờ duyệt",
    });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Thông tin vé</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Cột 1 */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              * Tên phim
            </label>
            <input
              type="text"
              value={newTicket.movie}
              onChange={(e) =>
                setNewTicket({ ...newTicket, movie: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              * Suất chiếu
            </label>
            <input
              type="text"
              value={newTicket.schedule}
              onChange={(e) =>
                setNewTicket({ ...newTicket, schedule: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="20:00 - 22:00"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              * Phòng chiếu
            </label>
            <input
              type="text"
              value={newTicket.room}
              onChange={(e) =>
                setNewTicket({ ...newTicket, room: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="IMAX - HCinema"
              required
            />
          </div>
        </div>

        {/* Cột 2 */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              * Người đặt
            </label>
            <input
              type="text"
              value={newTicket.user}
              onChange={(e) =>
                setNewTicket({ ...newTicket, user: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              * Ghế ngồi
            </label>
            <input
              type="text"
              value={newTicket.seat}
              onChange={(e) =>
                setNewTicket({ ...newTicket, seat: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="A5, B3..."
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              * Giá vé (VND)
            </label>
            <input
              type="number"
              value={newTicket.price}
              onChange={(e) =>
                setNewTicket({ ...newTicket, price: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              * Ngày chiếu
            </label>
            <input
              type="date"
              value={newTicket.date}
              onChange={(e) =>
                setNewTicket({ ...newTicket, date: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
      </form>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
          onClick={handleSubmit}
        >
          Cập nhật
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex-1"
        >
          Xóa vé
        </button>
      </div>
    </div>
  );
};

export default CreateTickets;
