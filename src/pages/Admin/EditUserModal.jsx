import React, { useState, useEffect } from "react";
import { createUser, updateUser, getRoles } from "../../services/api";
import { toast } from "react-toastify";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    ho_ten: "",
    email: "",
    mat_khau: "",
    sdt: "",
    ma_vai_tro: "",
    ma_quan_ly: "",
    ma_rap: "",
    ngay_sinh: "",
    anh_nguoi_dung: "default-avatar.jpg",
    trang_thai: "hoat_dong",
  });
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Fetch roles from backend
    const fetchRoles = async () => {
      try {
        const res = await getRoles();
        setRoles(res.data);
      } catch {
        setRoles([]);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        ho_ten: user.ho_ten || "",
        email: user.email || "",
        mat_khau: "",
        sdt: user.sdt || "",
        ma_vai_tro: user.ma_vai_tro || "",
        ma_quan_ly: user.ma_quan_ly || "",
        ma_rap: user.ma_rap || "",
        ngay_sinh: user.ngay_sinh
          ? new Date(user.ngay_sinh).toISOString().split("T")[0]
          : "",
        anh_nguoi_dung: user.anh_nguoi_dung || "default-avatar.jpg",
        trang_thai: user.trang_thai || "hoat_dong",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await updateUser(user.ma_nguoi_dung, formData);
        toast.success("Cập nhật người dùng thành công");
      } else {
        await createUser(formData);
        toast.success("Thêm người dùng thành công");
      }
      onSave();
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error(
        user ? "Không thể cập nhật người dùng" : "Không thể thêm người dùng"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {user ? "Cập nhật người dùng" : "Thêm người dùng mới"}
          </h3>
          <button
            onClick={onClose}
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
            {/* Họ tên */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Họ tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ho_ten"
                value={formData.ho_ten}
                onChange={handleChange}
                required
                placeholder="Nhập họ tên"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Nhập email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Mật khẩu */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {user ? "Mật khẩu mới" : "Mật khẩu"}
                {!user && <span className="text-red-500">*</span>}
              </label>
              <input
                type="password"
                name="mat_khau"
                value={formData.mat_khau}
                onChange={handleChange}
                required={!user}
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="sdt"
                value={formData.sdt}
                onChange={handleChange}
                required
                placeholder="Nhập số điện thoại"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Vai trò */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Vai trò <span className="text-red-500">*</span>
              </label>
              <select
                name="ma_vai_tro"
                value={formData.ma_vai_tro}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Chọn vai trò</option>
                {roles.map((role) => (
                  <option key={role.ma_vai_tro} value={role.ma_vai_tro}>
                    {role.ten_vai_tro}
                  </option>
                ))}
              </select>
            </div>

            {/* Trạng thái */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Trạng thái <span className="text-red-500">*</span>
              </label>
              <select
                name="trang_thai"
                value={formData.trang_thai}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="hoat_dong">Hoạt động</option>
                <option value="khoa">Khóa</option>
              </select>
            </div>

            {/* Ngày sinh */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Ngày sinh <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="ngay_sinh"
                value={formData.ngay_sinh}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              {user ? (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Cập nhật
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Thêm mới
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
