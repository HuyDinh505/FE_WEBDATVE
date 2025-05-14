import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { showtimesAPI, moviesAPI, theatersAPI } from "../../services/api";
import { toast } from "react-toastify";

const ShowtimeManagement = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [formData, setFormData] = useState({
    maPhim: "",
    maRap: "",
    ngayChieu: "",
    gioChieu: "",
    giaVe: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [showtimesRes, moviesRes, theatersRes] = await Promise.all([
        showtimesAPI.getAll(),
        moviesAPI.getAll(),
        theatersAPI.getAll(),
      ]);
      setShowtimes(showtimesRes.data);
      setMovies(moviesRes.data);
      setTheaters(theatersRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const showtimeData = {
        ...formData,
        ngayChieu: `${formData.ngayChieu}T${formData.gioChieu}:00`,
      };

      if (selectedShowtime) {
        await showtimesAPI.update(selectedShowtime.id, showtimeData);
        toast.success("Cập nhật suất chiếu thành công");
      } else {
        await showtimesAPI.create(showtimeData);
        toast.success("Thêm suất chiếu thành công");
      }

      setShowModal(false);
      setSelectedShowtime(null);
      setFormData({
        maPhim: "",
        maRap: "",
        ngayChieu: "",
        gioChieu: "",
        giaVe: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error saving showtime:", error);
      toast.error("Không thể lưu suất chiếu");
    }
  };

  const handleEdit = (showtime) => {
    setSelectedShowtime(showtime);
    const [date, time] = showtime.ngayChieu.split("T");
    setFormData({
      maPhim: showtime.maPhim,
      maRap: showtime.maRap,
      ngayChieu: date,
      gioChieu: time.slice(0, 5),
      giaVe: showtime.giaVe,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa suất chiếu này?")) {
      try {
        await showtimesAPI.delete(id);
        toast.success("Xóa suất chiếu thành công");
        fetchData();
      } catch (error) {
        console.error("Error deleting showtime:", error);
        toast.error("Không thể xóa suất chiếu");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý suất chiếu</h1>
        <button
          onClick={() => {
            setSelectedShowtime(null);
            setFormData({
              maPhim: "",
              maRap: "",
              ngayChieu: "",
              gioChieu: "",
              giaVe: "",
            });
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <FaPlus /> Thêm suất chiếu mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rạp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày chiếu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giờ chiếu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giá vé
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {showtimes.map((showtime) => {
              const movie = movies.find((m) => m.id === showtime.maPhim);
              const theater = theaters.find((t) => t.id === showtime.maRap);
              const [date, time] = showtime.ngayChieu.split("T");

              return (
                <tr key={showtime.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {movie?.tenPhim}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {theater?.tenRap}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {time.slice(0, 5)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {showtime.giaVe.toLocaleString("vi-VN")}đ
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(showtime)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(showtime.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {selectedShowtime ? "Cập nhật suất chiếu" : "Thêm suất chiếu mới"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phim
                </label>
                <select
                  name="maPhim"
                  value={formData.maPhim}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Chọn phim</option>
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.tenPhim}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rạp
                </label>
                <select
                  name="maRap"
                  value={formData.maRap}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Chọn rạp</option>
                  {theaters.map((theater) => (
                    <option key={theater.id} value={theater.id}>
                      {theater.tenRap}
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
                  name="ngayChieu"
                  value={formData.ngayChieu}
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
                  name="gioChieu"
                  value={formData.gioChieu}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Giá vé
                </label>
                <input
                  type="number"
                  name="giaVe"
                  value={formData.giaVe}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {selectedShowtime ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowtimeManagement;
