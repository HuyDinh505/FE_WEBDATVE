import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { managerAPI } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const ManageStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const { nguoiDung } = useAuth();
  const [formData, setFormData] = useState({
    ho_ten: "",
    email: "",
    mat_khau: "",
    sdt: "",
    ma_vai_tro: 3, // Mã vai trò nhân viên
    ma_quan_ly: nguoiDung.ma_nguoi_dung, // Tự động thêm mã quản lý là người dùng hiện tại
    ma_rap: nguoiDung.ma_rap, // Tự động thêm mã rạp của quản lý
    ngay_sinh: "",
  });

  // Fetch staff
  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await managerAPI.getStaff();
      setStaff(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách nhân viên: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open modal for creating/editing
  const handleOpenModal = (staffMember = null) => {
    if (staffMember) {
      setEditingStaff(staffMember);
      setFormData({
        ho_ten: staffMember.ho_ten,
        email: staffMember.email,
        sdt: staffMember.sdt,
        ma_vai_tro: 3,
        ma_quan_ly: nguoiDung.ma_nguoi_dung,
        ma_rap: nguoiDung.ma_rap, // Luôn sử dụng mã rạp của quản lý
        ngay_sinh: staffMember.ngay_sinh?.split("T")[0] || "",
        mat_khau: "", // Không hiển thị mật khẩu cũ
      });
    } else {
      setEditingStaff(null);
      setFormData({
        ho_ten: "",
        email: "",
        mat_khau: "",
        sdt: "",
        ma_vai_tro: 3,
        ma_quan_ly: nguoiDung.ma_nguoi_dung,
        ma_rap: nguoiDung.ma_rap, // Luôn sử dụng mã rạp của quản lý
        ngay_sinh: "",
      });
    }
    setShowModal(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStaff) {
        // Update existing staff
        const updateData = { ...formData };
        if (!updateData.mat_khau) delete updateData.mat_khau; // Không gửi mật khẩu nếu không đổi
        await managerAPI.updateStaff(editingStaff.ma_nguoi_dung, updateData);
        toast.success("Cập nhật nhân viên thành công!");
      } else {
        // Create new staff
        await managerAPI.createStaff(formData);
        toast.success("Thêm nhân viên mới thành công!");
      }
      setShowModal(false);
      fetchStaff();
    } catch (error) {
      toast.error("Lỗi khi lưu nhân viên: " + error.message);
    }
  };

  // Handle staff deletion
  const handleDelete = async (staffId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      try {
        await managerAPI.deleteStaff(staffId);
        toast.success("Xóa nhân viên thành công!");
        fetchStaff();
      } catch (error) {
        toast.error("Lỗi khi xóa nhân viên: " + error.message);
      }
    }
  };

  // Filter staff based on search term
  const filteredStaff = staff.filter(
    (member) =>
      member.ho_ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý nhân viên</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm nhân viên..."
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
            Thêm nhân viên
          </button>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã NV
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Họ tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số điện thoại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày sinh
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
            ) : filteredStaff.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Không có nhân viên nào
                </td>
              </tr>
            ) : (
              filteredStaff.map((member) => (
                <tr key={member.ma_nguoi_dung}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.ma_nguoi_dung}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.ho_ten}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{member.sdt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(member.ngay_sinh).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenModal(member)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(member.ma_nguoi_dung)}
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
              {editingStaff ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Họ tên
                </label>
                <input
                  type="text"
                  name="ho_ten"
                  value={formData.ho_ten}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {editingStaff
                    ? "Mật khẩu mới (để trống nếu không đổi)"
                    : "Mật khẩu"}
                </label>
                <input
                  type="password"
                  name="mat_khau"
                  value={formData.mat_khau}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...(!editingStaff && { required: true })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="sdt"
                  value={formData.sdt}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  name="ngay_sinh"
                  value={formData.ngay_sinh}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
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
                  {editingStaff ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStaff;
