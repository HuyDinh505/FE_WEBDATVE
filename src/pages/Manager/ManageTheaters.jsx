import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { managerAPI } from "../../services/api";

const ManageTheaters = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    ten_rap: "",
    dia_chi: "",
    dia_chi_map: "",
  });

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    try {
      setLoading(true);
      const response = await managerAPI.getTheaters();
      setTheaters(response.data);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách rạp. Vui lòng thử lại sau.");
      toast.error("Không thể tải danh sách rạp");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await managerAPI.updateTheater(editingId, formData);
        toast.success("Cập nhật rạp thành công");
      } else {
        await managerAPI.createTheater(formData);
        toast.success("Thêm rạp mới thành công");
      }
      setShowModal(false);
      fetchTheaters();
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const handleEdit = (theater) => {
    setEditingId(theater.ma_rap);
    setFormData({
      ten_rap: theater.ten_rap,
      dia_chi: theater.dia_chi,
      dia_chi_map: theater.dia_chi_map,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa rạp này?")) {
      try {
        await managerAPI.deleteTheater(id);
        toast.success("Xóa rạp thành công");
        fetchTheaters();
      } catch (err) {
        toast.error(err.response?.data?.message || "Có lỗi xảy ra khi xóa rạp");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      ten_rap: "",
      dia_chi: "",
      dia_chi_map: "",
    });
    setEditingId(null);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">Đang tải...</div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý rạp chiếu</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Thêm rạp mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên rạp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Địa chỉ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Địa chỉ map
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
            {theaters.map((theater) => (
              <tr key={theater.ma_rap}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {theater.ten_rap}
                </td>
                <td className="px-6 py-4">{theater.dia_chi}</td>
                <td className="px-6 py-4">{theater.dia_chi_map}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(theater.ngay_tao_rap).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(theater)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(theater.ma_rap)}
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingId ? "Cập nhật rạp" : "Thêm rạp mới"}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tên rạp
                  </label>
                  <input
                    type="text"
                    name="ten_rap"
                    value={formData.ten_rap}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="dia_chi"
                    value={formData.dia_chi}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Địa chỉ map
                  </label>
                  <input
                    type="text"
                    name="dia_chi_map"
                    value={formData.dia_chi_map}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        </div>
      )}
    </div>
  );
};

export default ManageTheaters;
