import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { managerAPI } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const { nguoiDung } = useAuth();
  const [formData, setFormData] = useState({
    ten_phong: "",
    so_hang: "",
    so_cot: "",
    loai_phong: "2D",
    ma_rap: nguoiDung.ma_rap, // Tự động thêm mã rạp của quản lý
    trang_thai: true,
  });

  // Fetch rooms
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await managerAPI.getRooms();
      setRooms(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách phòng chiếu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Open modal for creating/editing
  const handleOpenModal = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        ten_phong: room.ten_phong,
        so_hang: room.so_hang,
        so_cot: room.so_cot,
        loai_phong: room.loai_phong,
        ma_rap: nguoiDung.ma_rap, // Luôn sử dụng mã rạp của quản lý
        trang_thai: room.trang_thai,
      });
    } else {
      setEditingRoom(null);
      setFormData({
        ten_phong: "",
        so_hang: "",
        so_cot: "",
        loai_phong: "2D",
        ma_rap: nguoiDung.ma_rap, // Luôn sử dụng mã rạp của quản lý
        trang_thai: true,
      });
    }
    setShowModal(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRoom) {
        // Update existing room
        await managerAPI.updateRoom(editingRoom.ma_phong, formData);
        toast.success("Cập nhật phòng chiếu thành công!");
      } else {
        // Create new room
        await managerAPI.createRoom(formData);
        toast.success("Thêm phòng chiếu mới thành công!");
      }
      setShowModal(false);
      fetchRooms();
    } catch (error) {
      toast.error("Lỗi khi lưu phòng chiếu: " + error.message);
    }
  };

  // Handle room deletion
  const handleDelete = async (roomId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phòng chiếu này?")) {
      try {
        await managerAPI.deleteRoom(roomId);
        toast.success("Xóa phòng chiếu thành công!");
        fetchRooms();
      } catch (error) {
        toast.error("Lỗi khi xóa phòng chiếu: " + error.message);
      }
    }
  };

  // Filter rooms based on search term
  const filteredRooms = rooms.filter(
    (room) =>
      room.ten_phong.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.loai_phong.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý phòng chiếu</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm phòng chiếu..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" />
            Thêm phòng chiếu
          </button>
        </div>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã phòng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên phòng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số ghế
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại phòng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Đang tải...
                </td>
              </tr>
            ) : filteredRooms.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Không có phòng chiếu nào
                </td>
              </tr>
            ) : (
              filteredRooms.map((room) => (
                <tr key={room.ma_phong}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {room.ma_phong}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {room.ten_phong}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {room.so_ghe} ({room.so_hang}x{room.so_cot})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {room.loai_phong}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        room.trang_thai
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {room.trang_thai ? "Hoạt động" : "Không hoạt động"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenModal(room)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(room.ma_phong)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {editingRoom ? "Chỉnh sửa phòng chiếu" : "Thêm phòng chiếu mới"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tên phòng
                </label>
                <input
                  type="text"
                  name="ten_phong"
                  value={formData.ten_phong}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Số hàng
                </label>
                <input
                  type="number"
                  name="so_hang"
                  value={formData.so_hang}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Số cột
                </label>
                <input
                  type="number"
                  name="so_cot"
                  value={formData.so_cot}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Loại phòng
                </label>
                <select
                  name="loai_phong"
                  value={formData.loai_phong}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="2D">2D</option>
                  <option value="3D">3D</option>
                  <option value="4DX">4DX</option>
                  <option value="IMAX">IMAX</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="trang_thai"
                    checked={formData.trang_thai}
                    onChange={handleInputChange}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Hoạt động</span>
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {editingRoom ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRooms;
