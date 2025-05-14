import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaFilm,
  FaUser,
  FaChartPie,
  FaTheaterMasks,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const AdminLayout = () => {
  const { logout, nguoiDung } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <div className="text-white text-xl font-bold mb-6 px-2.5">
            Quản trị viên
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/admin"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700"
              >
                <FaChartPie className="mr-2" />
                Tổng quan
              </Link>
            </li>
            <li>
              <Link
                to="/admin/movies"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700"
              >
                <FaFilm className="mr-2" />
                Quản lý phim
              </Link>
            </li>
            <li>
              <Link
                to="/admin/accounts"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700"
              >
                <FaUser className="mr-2" />
                Quản lý tài khoản
              </Link>
            </li>
            <li>
              <Link
                to="/admin/theaters"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700"
              >
                <FaTheaterMasks className="mr-2" />
                Quản lý rạp
              </Link>
            </li>
            <li>
              <Link
                to="/admin/statistics"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700"
              >
                <FaChartPie className="mr-2" />
                Thống kê
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className={`p-4 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Header */}
        <header className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-3 flex justify-between items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-600 hover:text-gray-900"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center">
              <span className="mr-4">{nguoiDung?.ho_ten}</span>
              <button
                onClick={handleLogout}
                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                <FaSignOutAlt className="mr-2" />
                Đăng xuất
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="bg-white shadow rounded-lg">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
