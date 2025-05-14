import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUsers = ({ onAddUser }) => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    onAddUser(newUser);
    navigate("/dashboard/users"); // Quay lại trang quản lý người dùng
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Thêm người dùng</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Họ và Tên"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Thêm
        </button>
      </form>
    </div>
  );
};

export default CreateUsers;
