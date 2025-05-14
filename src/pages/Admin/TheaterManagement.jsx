import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaTheaterMasks,
  FaChair,
} from "react-icons/fa";
import {
  getTheaters,
  createTheater,
  updateTheater,
  deleteTheater,
} from "../../services/api";
import { toast } from "react-toastify";

const TheaterManagement = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [formData, setFormData] = useState({
    tenRap: "",
    diaChi: "",
    diaChiMap: "",
  });

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    try {
      const response = await getTheaters();
      // Ensure we're getting an array and it has the correct structure
      const theatersData = Array.isArray(response.data) ? response.data : [];
      setTheaters(theatersData);
    } catch (error) {
      console.error("Error fetching theaters:", error);
      toast.error("Không thể tải danh sách rạp");
      setTheaters([]); // Set empty array on error
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
      const formDataToSend = new FormData();
      formDataToSend.append("ten_rap", formData.tenRap);
      formDataToSend.append("dia_chi", formData.diaChi);
      if (formData.diaChiMap)
        formDataToSend.append("dia_chi_map", formData.diaChiMap);
      if (selectedTheater) {
        formDataToSend.append("_method", "PUT");
        await updateTheater(
          selectedTheater.ma_rap || selectedTheater.id,
          formDataToSend
        );
        toast.success("Cập nhật rạp thành công");
      } else {
        await createTheater(formDataToSend);
        toast.success("Thêm rạp thành công");
      }

      setShowModal(false);
      setSelectedTheater(null);
      setFormData({
        tenRap: "",
        diaChi: "",
        diaChiMap: "",
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
      tenRap: theater.ten_rap,
      diaChi: theater.dia_chi,
      diaChiMap: theater.dia_chi_map,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa rạp này?")) {
      try {
        await deleteTheater(id);
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
              diaChiMap: "",
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
        {theaters && theaters.length > 0 ? (
          theaters.map((theater) => (
            <div
              key={theater.ma_rap || theater.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              {/* Theater Header */}
              <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <FaTheaterMasks className="text-2xl text-blue-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {theater.ten_rap}
                    </h3>
                    <p className="text-sm text-gray-600">{theater.dia_chi}</p>
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
                    onClick={() => handleDelete(theater.ma_rap || theater.id)}
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
                  {theater.phong_chieus && theater.phong_chieus.length > 0 ? (
                    theater.phong_chieus.map((screen) => (
                      <div
                        key={screen.ma_phong || screen.id}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-semibold">
                              {screen.ten_phong}
                            </h5>
                            <div className="mt-1 space-y-1">
                              <p className="text-sm text-gray-600 flex items-center">
                                <FaChair className="mr-2" />
                                Sức chứa: {screen.suc_chua || 0} ghế
                              </p>
                              <p className="text-sm text-gray-600">
                                Loại: {screen.loai_phong || "Thường"}
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
                    ))
                  ) : (
                    <div className="col-span-2 text-center text-gray-500 py-4">
                      Chưa có phòng chiếu nào
                    </div>
                  )}
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
          ))
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-500">Không có rạp nào</p>
          </div>
        )}
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
                  Địa chỉ map (Google Maps)
                </label>
                <input
                  type="text"
                  name="diaChiMap"
                  value={formData.diaChiMap}
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
