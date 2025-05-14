import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaTheaterMasks,
  FaChair,
} from "react-icons/fa";
import { theatersAPI } from "../../services/api";
import { toast } from "react-toastify";

const TheaterManagement = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [formData, setFormData] = useState({
    tenRap: "",
    diaChi: "",
    soPhong: "",
    hinhAnh: null,
  });

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    try {
      setLoading(true);
      const response = await theatersAPI.getAll();
      setTheaters(response.data);
    } catch (error) {
      console.error("Error fetching theaters:", error);
      toast.error("Không thể tải danh sách rạp");
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
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (selectedTheater) {
        await theatersAPI.update(selectedTheater.id, formDataToSend);
        toast.success("Cập nhật rạp thành công");
      } else {
        await theatersAPI.create(formDataToSend);
        toast.success("Thêm rạp thành công");
      }

      setShowModal(false);
      setSelectedTheater(null);
      setFormData({
        tenRap: "",
        diaChi: "",
        soPhong: "",
        hinhAnh: null,
      });
      fetchTheaters();
    } catch (error) {
      console.error("Error saving theater:", error);
      toast.error("Không thể lưu rạp");
    }
  };

  const handleEdit = (theater) => {
    setSelectedTheater(theater);
    setFormData({
      tenRap: theater.tenRap,
      diaChi: theater.diaChi,
      soPhong: theater.soPhong,
      hinhAnh: null,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa rạp này?")) {
      try {
        await theatersAPI.delete(id);
        toast.success("Xóa rạp thành công");
        fetchTheaters();
      } catch (error) {
        console.error("Error deleting theater:", error);
        toast.error("Không thể xóa rạp");
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
        <h1 className="text-2xl font-bold text-gray-800">
          Quản lý hệ thống rạp
        </h1>
        <button
          onClick={() => {
            setSelectedTheater(null);
            setFormData({
              tenRap: "",
              diaChi: "",
              soPhong: "",
              hinhAnh: null,
            });
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
        >
          <FaPlus />
          <span>Thêm rạp mới</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm rạp..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Theaters List */}
      <div className="space-y-6">
        {theaters.map((theater) => (
          <div
            key={theater.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            {/* Theater Header */}
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <FaTheaterMasks className="text-2xl text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {theater.tenRap}
                  </h3>
                  <p className="text-sm text-gray-600">{theater.diaChi}</p>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(theater)}
                  className="p-2 text-blue-500 hover:text-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(theater.id)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            {/* Screens */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-700">
                  Danh sách phòng chiếu
                </h4>
                <button className="text-sm text-blue-500 flex items-center space-x-1 hover:text-blue-600">
                  <FaPlus className="text-xs" />
                  <span>Thêm phòng chiếu</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {theater.screens.map((screen) => (
                  <div key={screen.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold">{screen.name}</h5>
                        <div className="mt-1 space-y-1">
                          <p className="text-sm text-gray-600 flex items-center">
                            <FaChair className="mr-2" />
                            Sức chứa: {screen.capacity} ghế
                          </p>
                          <p className="text-sm text-gray-600">
                            Loại: {screen.type}
                          </p>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <button className="text-blue-500 hover:text-blue-600">
                          <FaEdit />
                        </button>
                        <button className="text-red-500 hover:text-red-600">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-3 bg-gray-50 border-t">
              <div className="flex space-x-4">
                <button className="text-sm text-blue-500 hover:text-blue-600">
                  Xem lịch chiếu
                </button>
                <button className="text-sm text-blue-500 hover:text-blue-600">
                  Quản lý ghế
                </button>
                <button className="text-sm text-blue-500 hover:text-blue-600">
                  Báo cáo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {selectedTheater ? "Cập nhật rạp" : "Thêm rạp mới"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên rạp
                </label>
                <input
                  type="text"
                  name="tenRap"
                  value={formData.tenRap}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="diaChi"
                  value={formData.diaChi}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Số phòng
                </label>
                <input
                  type="number"
                  name="soPhong"
                  value={formData.soPhong}
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
                  {selectedTheater ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheaterManagement;
