import React, { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    systemName: "CGV Cinema",
    adminEmail: "admin@cgv.vn",
    language: "vi",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSaveSettings = () => {
    console.log("Lưu cài đặt:", settings);
    alert("Cài đặt đã được lưu!");
  };

  const handleChangePassword = () => {
    if (settings.newPassword !== settings.confirmPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }
    console.log("Đổi mật khẩu:", settings.oldPassword, settings.newPassword);
    alert("Mật khẩu đã được thay đổi!");
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Cài đặt hệ thống</h2>

      {/* Cài đặt chung */}
      <div className="mb-4">
        <label className="block font-semibold">Tên hệ thống:</label>
        <input
          type="text"
          name="systemName"
          value={settings.systemName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Email quản trị:</label>
        <input
          type="email"
          name="adminEmail"
          value={settings.adminEmail}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Ngôn ngữ giao diện:</label>
        <select
          name="language"
          value={settings.language}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
      </div>

      <button
        onClick={handleSaveSettings}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        Lưu cài đặt
      </button>

      <hr className="my-6" />

      {/* Đổi mật khẩu */}
      <h3 className="text-lg font-semibold mb-3">Đổi mật khẩu</h3>

      <div className="mb-4">
        <label className="block font-semibold">Mật khẩu cũ:</label>
        <input
          type="password"
          name="oldPassword"
          value={settings.oldPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Mật khẩu mới:</label>
        <input
          type="password"
          name="newPassword"
          value={settings.newPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Xác nhận mật khẩu:</label>
        <input
          type="password"
          name="confirmPassword"
          value={settings.confirmPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        onClick={handleChangePassword}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
      >
        Đổi mật khẩu
      </button>
    </div>
  );
};

export default Settings;
