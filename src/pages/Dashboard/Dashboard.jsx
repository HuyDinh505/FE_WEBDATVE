import React from "react";
import { Link } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Bảng Điều Khiển</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/dashboard/manage-movies"
          className="p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Quản lý phim
        </Link>
        <Link
          to="/dashboard/manage-showtimes"
          className="p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
        >
          Quản lý suất chiếu
        </Link>
        <Link
          to="/dashboard/manage-users"
          className="p-4 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
        >
          Quản lý người dùng
        </Link>
        <Link
          to="/dashboard/manage-tickets"
          className="p-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
        >
          Quản lý đặt vé
        </Link>
        <Link
          to="/dashboard/statistics"
          className="p-4 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
        >
          Thống kê
        </Link>
        <Link
          to="/dashboard/settings"
          className="p-4 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
        >
          Cấu hình hệ thống
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
