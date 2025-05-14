import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { managerAPI } from "../../services/api";

const ManageShowtimes = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [activeShows, setActiveShows] = useState(0);
  const [formData, setFormData] = useState({
    ma_phim: "",
    ma_phong: "",
    ngay_chieu: "",
    gio_chieu: "",
  });

  useEffect(() => {
    fetchShowtimes();
    fetchMovies();
    fetchRooms();
    fetchActiveShows();
  }, []);

  const fetchActiveShows = async () => {
    try {
      const response = await managerAPI.getRevenueStats();
      setActiveShows(response.data.activeShows || 0);
    } catch (error) {
      console.error("Error fetching active shows:", error);
      setActiveShows(0);
    }
  };

  const fetchShowtimes = async () => {
    try {
      setLoading(true);
      const response = await managerAPI.getShowtimes();
      setShowtimes(response.data);
      setError(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Không thể tải danh sách suất chiếu";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await managerAPI.getMovies();
      setMovies(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Không thể tải danh sách phim";
      toast.error(errorMessage);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await managerAPI.getRooms();
      setRooms(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Không thể tải danh sách phòng chiếu";
      toast.error(errorMessage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ma_phim: parseInt(formData.ma_phim),
        ma_phong: parseInt(formData.ma_phong),
        ngay_chieu: formData.ngay_chieu,
        thoi_gian_bd: formData.gio_chieu, // Gửi trực tiếp giờ từ input time
      };

      console.log("Submitting data:", submitData);

      if (editingId) {
        await managerAPI.updateShowtime(editingId, submitData);
        toast.success("Cập nhật suất chiếu thành công");
      } else {
        await managerAPI.createShowtime(submitData);
        toast.success("Thêm suất chiếu mới thành công");
      }
      setShowModal(false);
      fetchShowtimes();
      resetForm();
    } catch (err) {
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      toast.error(
        err.response?.data?.message || "Có lỗi xảy ra khi xử lý yêu cầu"
      );
    }
  };

  const handleEdit = (showtime) => {
    setEditingId(showtime.ma_suat_chieu);
    setFormData({
      ma_phim: showtime.ma_phim.toString(),
      ma_phong: showtime.ma_phong.toString(),
      ngay_chieu: showtime.ngay_chieu,
      gio_chieu: formatTime(showtime.thoi_gian_bd),
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa suất chiếu này?")) {
      try {
        await managerAPI.deleteShowtime(id);
        toast.success("Xóa suất chiếu thành công");
        fetchShowtimes();
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Có lỗi xảy ra khi xóa suất chiếu"
        );
      }
    }
  };

  const resetForm = () => {
    setFormData({
      ma_phim: "",
      ma_phong: "",
      ngay_chieu: "",
      gio_chieu: "",
    });
    setEditingId(null);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    // Nếu timeString chứa T hoặc Z (ISO format), chỉ lấy phần giờ:phút
    if (timeString.includes("T") || timeString.includes("Z")) {
      const time = new Date(timeString);
      return time.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }
    // Nếu timeString đã ở dạng HH:mm:ss hoặc HH:mm
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    // Chuyển đổi sang định dạng dd/mm/yyyy
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">Đang tải...</div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">Quản lý suất chiếu</h1>
        <div className="bg-white rounded-lg shadow px-6 py-2 text-lg font-semibold text-blue-600">
          Tổng số suất chiếu: {loading ? "Đang tải..." : showtimes.length}
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Thêm suất chiếu mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên phim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phòng chiếu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày chiếu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giờ chiếu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {showtimes.map((showtime) => (
              <tr key={showtime.ma_suat_chieu}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {showtime.phim?.ten_phim || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {showtime.phong_chieu?.ten_phong || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(showtime.ngay_chieu)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatTime(showtime.thoi_gian_bd)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(showtime)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(showtime.ma_suat_chieu)}
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Sửa suất chiếu" : "Thêm suất chiếu mới"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phim
                  </label>
                  <select
                    name="ma_phim"
                    value={formData.ma_phim}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Chọn phim</option>
                    {movies.map((movie) => (
                      <option key={movie.ma_phim} value={movie.ma_phim}>
                        {movie.ten_phim}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phòng chiếu
                  </label>
                  <select
                    name="ma_phong"
                    value={formData.ma_phong}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Chọn phòng</option>
                    {rooms.map((room) => (
                      <option key={room.ma_phong} value={room.ma_phong}>
                        {room.ten_phong}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày chiếu
                  </label>
                  <input
                    type="date"
                    name="ngay_chieu"
                    value={formData.ngay_chieu}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Giờ chiếu
                  </label>
                  <input
                    type="time"
                    name="gio_chieu"
                    value={formData.gio_chieu}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  {editingId ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageShowtimes;
