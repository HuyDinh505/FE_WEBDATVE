import React, { useState, useEffect, useRef } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import { managerAPI } from "../../services/api"; // Sử dụng managerAPI cho manager
import { toast } from "react-toastify";
import { imagePhim } from "../../Utilities/common";

// Hàm chuyển đổi định dạng ngày sang yyyy-MM-dd
const formatDateToYYYYMMDD = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ManagerMovieManagement = () => {
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
    hinhThucChieu: "",
    daoDien: "",
    dienVien: "",
    trangThai: "",
    doTuoi: "",
    quocGia: "",
    currentImage: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const topScrollRef = useRef(null);
  const tableScrollRef = useRef(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await managerAPI.getMoviesManager();
      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Không thể tải danh sách phim");
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
      const data = new FormData();
      data.append("ten_phim", formData.tenPhim ? String(formData.tenPhim) : "");
      data.append("mo_ta", formData.moTa ? String(formData.moTa) : "");
      data.append(
        "thoi_luong",
        formData.thoiLuong ? parseInt(formData.thoiLuong, 10) : ""
      );
      data.append(
        "ngay_phat_hanh",
        formData.ngayKhoiChieu
          ? formatDateToYYYYMMDD(formData.ngayKhoiChieu)
          : ""
      );
      data.append(
        "hinh_thuc_chieu",
        formData.hinhThucChieu ? String(formData.hinhThucChieu) : ""
      );
      data.append("dao_dien", formData.daoDien ? String(formData.daoDien) : "");
      data.append(
        "dien_vien",
        formData.dienVien ? String(formData.dienVien) : ""
      );
      data.append(
        "trang_thai",
        formData.trangThai ? String(formData.trangThai) : ""
      );
      data.append("do_tuoi", formData.doTuoi ? String(formData.doTuoi) : "");
      data.append("quoc_gia", formData.quocGia ? String(formData.quocGia) : "");
      if (formData.hinhAnh) {
        data.append("hinhAnh", formData.hinhAnh);
      }

      if (selectedMovie) {
        if (!selectedMovie.ma_phim) {
          throw new Error("ID phim không hợp lệ");
        }
        await managerAPI.updateMovieManager(selectedMovie.ma_phim, data);
        toast.success("Cập nhật phim thành công");
      } else {
        await managerAPI.createMovieManager(data);
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
        hinhThucChieu: "",
        daoDien: "",
        dienVien: "",
        trangThai: "",
        doTuoi: "",
        quocGia: "",
        currentImage: null,
      });
      fetchMovies();
    } catch (error) {
      console.error(
        "Error saving movie:",
        error.response ? error.response.data : error.message
      );
      toast.error("Không thể lưu phim");
    }
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      tenPhim: movie.ten_phim,
      moTa: movie.mo_ta,
      thoiLuong: movie.thoi_luong,
      ngayKhoiChieu: formatDateToYYYYMMDD(movie.ngay_phat_hanh),
      hinhAnh: null,
      currentImage: movie.anh,
      hinhThucChieu: movie.hinh_thuc_chieu,
      daoDien: movie.dao_dien,
      dienVien: movie.dien_vien,
      trangThai: movie.trang_thai,
      doTuoi: movie.do_tuoi,
      quocGia: movie.quoc_gia,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này?")) {
      try {
        await managerAPI.deleteMovieManager(id);
        toast.success("Xóa phim thành công");
        fetchMovies();
      } catch (error) {
        console.error("Error deleting movie:", error);
        toast.error("Không thể xóa phim");
      }
    }
  };

  // Lọc phim theo tên và trạng thái
  const filteredMovies = movies.filter((movie) => {
    const matchName = movie.ten_phim
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus ? movie.trang_thai === filterStatus : true;
    return matchName && matchStatus;
  });

  const syncScroll = () => {
    if (tableScrollRef.current && topScrollRef.current) {
      tableScrollRef.current.scrollLeft = topScrollRef.current.scrollLeft;
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">Quản lý phim</h1>
          <button
            onClick={() => {
              setSelectedMovie(null);
              setFormData({
                tenPhim: "",
                moTa: "",
                thoiLuong: "",
                ngayKhoiChieu: "",
                hinhAnh: null,
                hinhThucChieu: "",
                daoDien: "",
                dienVien: "",
                trangThai: "",
                doTuoi: "",
                quocGia: "",
                currentImage: null,
              });
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <FaPlus className="text-lg" /> Thêm phim mới
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Tìm kiếm phim..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="dang_chieu">Đang chiếu</option>
              <option value="sap_chieu">Sắp chiếu</option>
              <option value="ket_thuc">Đã kết thúc</option>
            </select>
          </div>
        </div>

        <div
          className="sticky top-0 z-20 bg-gray-50 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          style={{ border: "none", boxShadow: "none" }}
          ref={topScrollRef}
          onScroll={syncScroll}
        >
          <div style={{ width: "1600px", height: 1 }}></div>
        </div>

        {/* Movies Table Section */}
        <div
          className="bg-white rounded-xl shadow-sm overflow-x-hidden"
          ref={tableScrollRef}
        >
          <table className="min-w-[1400px] w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hình ảnh
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tên phim
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Thời lượng
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ngày phát hành
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hình thức chiếu
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Đạo diễn
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Diễn viên
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Độ tuổi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quốc gia
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMovies.map((movie) => (
                <tr
                  key={movie.ma_phim}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={`${imagePhim}${movie.anh}`}
                      alt={movie.ten_phim}
                      className="h-20 w-20 object-cover rounded-lg shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {movie.ten_phim}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                      {movie.mo_ta}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {movie.thoi_luong} phút
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(movie.ngay_phat_hanh).toLocaleDateString(
                        "vi-VN"
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {movie.hinh_thuc_chieu}
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-xs text-gray-500 max-w-[100px] truncate">
                      {movie.dao_dien}
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-xs text-gray-500 max-w-[100px] truncate">
                      {movie.dien_vien}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        movie.trang_thai === "Đang chiếu"
                          ? "bg-green-100 text-green-800"
                          : movie.trang_thai === "Sắp chiếu"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {movie.trang_thai}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {movie.do_tuoi}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {movie.quoc_gia}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(movie)}
                      className="text-blue-600 hover:text-blue-900 mr-4 transition-colors duration-200"
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button
                      onClick={() => handleDelete(movie.ma_phim)}
                      className="text-red-600 hover:text-red-900 transition-colors duration-200"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedMovie ? "Cập nhật phim" : "Thêm phim mới"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tên phim */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tên phim <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="tenPhim"
                    value={formData.tenPhim}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                    placeholder="Nhập tên phim"
                  />
                </div>

                {/* Thời lượng */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Thời lượng (phút) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="thoiLuong"
                    value={formData.thoiLuong}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                    placeholder="Nhập thời lượng"
                    min="1"
                  />
                </div>

                {/* Ngày phát hành */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày phát hành <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="ngayKhoiChieu"
                    value={formData.ngayKhoiChieu}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                {/* Hình thức chiếu */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Hình thức chiếu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="hinhThucChieu"
                    value={formData.hinhThucChieu}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                    placeholder="Nhập hình thức chiếu"
                  />
                </div>

                {/* Đạo diễn */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Đạo diễn <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="daoDien"
                    value={formData.daoDien}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                    placeholder="Nhập tên đạo diễn"
                  />
                </div>

                {/* Diễn viên */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Diễn viên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="dienVien"
                    value={formData.dienVien}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                    placeholder="Nhập tên diễn viên"
                  />
                </div>

                {/* Trạng thái */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Trạng thái <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="trangThai"
                    value={formData.trangThai}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="dang_chieu">Đang chiếu</option>
                    <option value="sap_chieu">Sắp chiếu</option>
                    <option value="ket_thuc">Đã kết thúc</option>
                  </select>
                </div>

                {/* Độ tuổi */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Độ tuổi <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="doTuoi"
                    value={formData.doTuoi}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Chọn độ tuổi</option>
                    <option value="P">P</option>
                    <option value="13+">13+</option>
                    <option value="16+">16+</option>
                    <option value="18+">18+</option>
                  </select>
                </div>

                {/* Quốc gia */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Quốc gia <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="quocGia"
                    value={formData.quocGia}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                    placeholder="Nhập quốc gia"
                  />
                </div>
              </div>

              {/* Mô tả */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mô tả <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="moTa"
                  value={formData.moTa}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  rows="4"
                  required
                  placeholder="Nhập mô tả phim"
                />
              </div>

              {/* Hình ảnh */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Hình ảnh <span className="text-red-500">*</span>
                </label>

                {/* Hiển thị ảnh hiện tại nếu có */}
                {formData.currentImage && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Ảnh hiện tại:</p>
                    <div className="relative inline-block">
                      <img
                        src={`${imagePhim}${formData.currentImage}`}
                        alt="Ảnh hiện tại"
                        className="h-40 w-40 object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Input file và preview ảnh mới */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {formData.currentImage
                        ? "Chọn ảnh mới để thay thế ảnh hiện tại"
                        : "Chọn ảnh cho phim"}
                    </p>
                  </div>

                  {/* Preview ảnh mới */}
                  {formData.hinhAnh && (
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2">Ảnh mới:</p>
                      <div className="relative inline-block">
                        <img
                          src={URL.createObjectURL(formData.hinhAnh)}
                          alt="Ảnh mới"
                          className="h-40 w-40 object-cover rounded-lg shadow-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                >
                  {selectedMovie ? (
                    <>
                      <FaEdit className="text-lg" />
                      Cập nhật
                    </>
                  ) : (
                    <>
                      <FaPlus className="text-lg" />
                      Thêm mới
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerMovieManagement;
