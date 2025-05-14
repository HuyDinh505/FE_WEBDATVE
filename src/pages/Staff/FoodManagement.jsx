import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { managerAPI } from "../../services/api";
import { formatDate, formatCurrency } from "../../utils/format";
import LoadingSpinner from "../../components/LoadingSpinner";

const initialForm = {
  ten_dv_an_uong: "",
  gia_tien: "",
  loai: "",
  anh_dv: null,
};

const FoodManagement = () => {
  const [foodServices, setFoodServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const fetchFoodServices = async () => {
    try {
      setLoading(true);
      const response = await managerAPI.getFoodServices();
      console.log("Food services data:", response.data);
      setFoodServices(response.data);
      setFilteredServices(response.data);
    } catch (error) {
      console.error("Error fetching food services:", error);
      toast.error("Không thể tải danh sách dịch vụ ăn uống");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [searchTerm, foodServices]);

  const filterServices = () => {
    const filtered = foodServices.filter(
      (service) =>
        service.ten_dv_an_uong
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        service.loai?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, anh_dv: e.target.files[0] }));
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingId(service.ma_dv_an_uong);
      setFormData({
        ten_dv_an_uong: service.ten_dv_an_uong,
        gia_tien: service.gia_tien,
        loai: service.loai || "",
        anh_dv: null,
      });
    } else {
      setEditingId(null);
      setFormData(initialForm);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("ten_dv_an_uong", formData.ten_dv_an_uong);
      data.append("gia_tien", formData.gia_tien);
      data.append("loai", formData.loai || "");
      if (formData.anh_dv) {
        data.append("anh_dv", formData.anh_dv);
      }

      if (editingId) {
        await managerAPI.updateFoodService(editingId, data);
        toast.success("Cập nhật dịch vụ thành công");
      } else {
        await managerAPI.createFoodService(data);
        toast.success("Thêm dịch vụ mới thành công");
      }
      setShowModal(false);
      fetchFoodServices();
    } catch (error) {
      toast.error("Không thể lưu dịch vụ ăn uống");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      try {
        await managerAPI.deleteFoodService(id);
        toast.success("Xóa dịch vụ thành công");
        fetchFoodServices();
      } catch (error) {
        toast.error("Không thể xóa dịch vụ ăn uống");
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Quản lý dịch vụ ăn uống</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, loại..."
          className="w-1/2 p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleOpenModal()}
        >
          Thêm dịch vụ
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Mã DV</th>
              <th className="px-4 py-2">Hình ảnh</th>
              <th className="px-4 py-2">Tên dịch vụ</th>
              <th className="px-4 py-2">Giá tiền</th>
              <th className="px-4 py-2">Loại</th>
              <th className="px-4 py-2">Ngày tạo</th>
              <th className="px-4 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service) => (
              <tr
                key={service.ma_dv_an_uong}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-2 text-center">
                  {service.ma_dv_an_uong}
                </td>
                <td className="px-4 py-2">
                  {service.anh_dv ? (
                    <img
                      src={`http://localhost:8000${service.anh_dv}`}
                      alt="Ảnh dịch vụ"
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        console.error("Image load error:", e.target.src);
                        e.target.src = "/images/default.jpg";
                      }}
                    />
                  ) : (
                    <span className="text-gray-400">Không có</span>
                  )}
                </td>
                <td className="px-4 py-2">{service.ten_dv_an_uong}</td>
                <td className="px-4 py-2 text-right">
                  {formatCurrency(service.gia_tien)}
                </td>
                <td className="px-4 py-2">{service.loai}</td>
                <td className="px-4 py-2 text-center">
                  {service.ngay_tao_dv ? formatDate(service.ngay_tao_dv) : ""}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleOpenModal(service)}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(service.ma_dv_an_uong)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Sửa dịch vụ ăn uống" : "Thêm dịch vụ ăn uống"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tên dịch vụ
                </label>
                <input
                  type="text"
                  name="ten_dv_an_uong"
                  value={formData.ten_dv_an_uong}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Giá tiền
                </label>
                <input
                  type="number"
                  name="gia_tien"
                  value={formData.gia_tien}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                  min="0"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Loại
                </label>
                <input
                  type="text"
                  name="loai"
                  value={formData.loai}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
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

export default FoodManagement;
