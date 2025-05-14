import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { managerAPI } from "../../services/api";

const ManageSeats = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    hang: "",
    cot: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      fetchSeats(selectedRoom);
    }
  }, [selectedRoom]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await managerAPI.getRooms();
      setRooms(response.data);
      setError(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Không thể tải danh sách phòng chiếu";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchSeats = async (roomId) => {
    try {
      setLoading(true);
      const response = await managerAPI.getSeatsByRoom(roomId);
      setSeats(response.data);
      setError(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Không thể tải danh sách ghế";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const validateSeatNumber = (hang, cot) => {
    if (!/^[A-Z]$/.test(hang)) {
      throw new Error("Hàng phải là một chữ cái in hoa (A-Z)");
    }
    if (!/^[1-9][0-9]?$/.test(cot)) {
      throw new Error("Cột phải là số từ 1 đến 99");
    }
    const seatExists = seats.some((seat) => seat.so_ghe === `${hang}${cot}`);
    if (!editingId && seatExists) {
      throw new Error("Ghế này đã tồn tại trong phòng");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const processedValue = name === "hang" ? value.toUpperCase() : value;
    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleRoomChange = (e) => {
    setSelectedRoom(e.target.value);
    setSeats([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedRoom) {
        toast.error("Vui lòng chọn phòng");
        return;
      }
      validateSeatNumber(formData.hang, formData.cot);
      const submitData = {
        ma_phong: selectedRoom,
        so_ghe: `${formData.hang}${formData.cot}`,
      };
      if (editingId) {
        await managerAPI.updateSeat(editingId, { so_ghe: submitData.so_ghe });
        toast.success("Cập nhật ghế thành công");
      } else {
        await managerAPI.createSeat(submitData);
        toast.success("Thêm ghế mới thành công");
      }
      setShowModal(false);
      fetchSeats(selectedRoom);
      resetForm();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Có lỗi xảy ra khi xử lý yêu cầu";
      toast.error(errorMessage);
    }
  };

  const handleEdit = (seat) => {
    const hang = seat.so_ghe.match(/[A-Z]/)[0];
    const cot = seat.so_ghe.match(/\d+/)[0];
    setEditingId(seat.ma_ghe);
    setFormData({
      hang,
      cot,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ghế này?")) {
      try {
        await managerAPI.deleteSeat(id);
        toast.success("Xóa ghế thành công");
        fetchSeats(selectedRoom);
      } catch (err) {
        toast.error(err.response?.data?.message || "Có lỗi xảy ra khi xóa ghế");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      hang: "",
      cot: "",
    });
    setEditingId(null);
  };

  if (loading && !seats.length)
    return (
      <div className="flex justify-center items-center h-64">Đang tải...</div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý ghế ngồi</h1>
        <button
          onClick={() => {
            if (!selectedRoom) {
              toast.warning("Vui lòng chọn phòng trước khi thêm ghế");
              return;
            }
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Thêm ghế mới
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Chọn phòng chiếu
        </label>
        <select
          value={selectedRoom}
          onChange={handleRoomChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Chọn phòng</option>
          {rooms.map((room) => (
            <option key={room.ma_phong} value={room.ma_phong}>
              {room.ten_phong}
            </option>
          ))}
        </select>
      </div>

      {selectedRoom && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số ghế
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {seats.map((seat) => (
                <tr key={seat.ma_ghe}>
                  <td className="px-6 py-4 whitespace-nowrap">{seat.so_ghe}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {seat.ngay_tao_ghe
                      ? new Date(seat.ngay_tao_ghe).toLocaleDateString("vi-VN")
                      : ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(seat)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(seat.ma_ghe)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Cập nhật ghế" : "Thêm ghế mới"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hàng (A-Z)
                </label>
                <input
                  type="text"
                  name="hang"
                  value={formData.hang}
                  onChange={handleInputChange}
                  maxLength="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cột (1-99)
                </label>
                <input
                  type="number"
                  name="cot"
                  value={formData.cot}
                  onChange={handleInputChange}
                  min="1"
                  max="99"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {editingId ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSeats;
