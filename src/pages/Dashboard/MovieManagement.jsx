import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import moviesAPI from "../../api/movies";
import { toast } from "react-toastify";

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formData, setFormData] = useState({
    tenPhim: "",
    moTa: "",
    thoiLuong: "",
    ngayKhoiChieu: "",
    hinhAnh: null,
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await moviesAPI.getAll();
      if (response && response.data) {
        setMovies(response.data);
      } else {
        toast.error("Không có dữ liệu phim");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      if (error.response) {
        toast.error(
          `Lỗi: ${
            error.response.data.message || "Không thể tải danh sách phim"
          }`
        );
      } else if (error.request) {
        toast.error("Không thể kết nối đến máy chủ");
      } else {
        toast.error("Lỗi: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, hinhAnh: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedMovie) {
        await moviesAPI.update(selectedMovie.id, formData);
        toast.success("Cập nhật phim thành công");
      } else {
        await moviesAPI.create(formData);
        toast.success("Thêm phim thành công");
      }

      setShowModal(false);
      setSelectedMovie(null);
      setFormData({
        tenPhim: "",
        moTa: "",
        thoiLuong: "",
        ngayKhoiChieu: "",
        hinhAnh: null,
      });
      fetchMovies();
    } catch (error) {
      console.error("Error saving movie:", error);
      if (error.response) {
        toast.error(
          `Lỗi: ${error.response.data.message || "Không thể lưu phim"}`
        );
      } else if (error.request) {
        toast.error("Không thể kết nối đến máy chủ");
      } else {
        toast.error("Lỗi: " + error.message);
      }
    }
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      tenPhim: movie.tenPhim,
      moTa: movie.moTa,
      thoiLuong: movie.thoiLuong,
      ngayKhoiChieu: movie.ngayKhoiChieu,
      hinhAnh: null,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này?")) {
      try {
        await moviesAPI.delete(id);
        toast.success("Xóa phim thành công");
        fetchMovies();
      } catch (error) {
        console.error("Error deleting movie:", error);
        if (error.response) {
          toast.error(
            `Lỗi: ${error.response.data.message || "Không thể xóa phim"}`
          );
        } else if (error.request) {
          toast.error("Không thể kết nối đến máy chủ");
        } else {
          toast.error("Lỗi: " + error.message);
        }
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
        <h1 className="text-2xl font-bold text-gray-800">Quản lý phim</h1>
        <button
          onClick={() => {
            setSelectedMovie(null);
            setFormData({
              tenPhim: "",
              moTa: "",
              thoiLuong: "",
              ngayKhoiChieu: "",
              hinhAnh: null,
            });
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <FaPlus /> Thêm phim mới
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Tìm kiếm phim..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
            <option value="">Tất cả trạng thái</option>
            <option value="showing">Đang chiếu</option>
            <option value="upcoming">Sắp chiếu</option>
            <option value="ended">Đã kết thúc</option>
          </select>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hình ảnh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên phim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mô tả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời lượng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày khởi chiếu
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={movie.hinhAnh}
                    alt={movie.tenPhim}
                    className="h-16 w-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {movie.tenPhim}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 line-clamp-2">
                    {movie.moTa}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {movie.thoiLuong} phút
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(movie.ngayKhoiChieu).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {selectedMovie ? "Cập nhật phim" : "Thêm phim mới"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên phim
                </label>
                <input
                  type="text"
                  name="tenPhim"
                  value={formData.tenPhim}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mô tả
                </label>
                <textarea
                  name="moTa"
                  value={formData.moTa}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Thời lượng (phút)
                </label>
                <input
                  type="number"
                  name="thoiLuong"
                  value={formData.thoiLuong}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ngày khởi chiếu
                </label>
                <input
                  type="date"
                  name="ngayKhoiChieu"
                  value={formData.ngayKhoiChieu}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full"
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
                  {selectedMovie ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieManagement;
