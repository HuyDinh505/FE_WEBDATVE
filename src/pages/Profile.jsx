import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { showToast } from "../components/Toast/Toast";
import axiosInstance from "../api/axios";

const Profile = () => {
  const { nguoiDung, setNguoiDung } = useAuth();
  const [form, setForm] = useState({
    ho_ten: nguoiDung?.ho_ten || nguoiDung?.hoTen || "",
    email: nguoiDung?.email || "",
    sdt: nguoiDung?.sdt || "",
    anh_nguoi_dung: nguoiDung?.anh_nguoi_dung || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.put(
        `/user/${nguoiDung.ma_nguoi_dung}`,
        form
      );
      setNguoiDung(res.data || res);
      showToast.success("Cập nhật tài khoản thành công!");
    } catch (err) {
      console.log("Update error:", err?.response || err);
      showToast.error("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Thông tin tài khoản</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Họ tên</label>
          <input
            type="text"
            name="ho_ten"
            value={form.ho_ten}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
            disabled
          />
        </div>
        <div>
          <label className="block font-medium">Số điện thoại</label>
          <input
            type="text"
            name="sdt"
            value={form.sdt}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Ảnh đại diện (URL)</label>
          <input
            type="text"
            name="anh_nguoi_dung"
            value={form.anh_nguoi_dung}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white font-bold py-2 rounded hover:bg-yellow-600"
          disabled={loading}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
