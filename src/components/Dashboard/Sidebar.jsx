import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFilm,
  FaClock,
  FaUser,
  FaTicketAlt,
  FaChartLine,
  FaCog,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-gradient-to-b from-blue-500 to-purple-500 p-4 text-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <button
        className="text-white absolute top-4 right-[-10px] bg-gray-800 p-1 rounded-full"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "➤" : "◄"}
      </button>

      <ul className="mt-8 space-y-4">
        <li className="flex items-center space-x-2">
          <FaChartPie />
          {!isCollapsed && <Link to="/dashboard">Tổng quan</Link>}
        </li>

        <li className="flex items-center space-x-2">
          <FaFilm />
          {!isCollapsed && <Link to="/dashboard/movies">Quản lý phim</Link>}
        </li>

        <li className="flex items-center space-x-2">
          <FaClock />
          {!isCollapsed && <Link to="/dashboard/showtimes">Suất chiếu</Link>}
        </li>

        <li className="flex items-center space-x-2">
          <FaUser />
          {!isCollapsed && <Link to="/dashboard/users">Người dùng</Link>}
        </li>

        <li className="flex items-center space-x-2">
          <FaTicketAlt />
          {!isCollapsed && <Link to="/dashboard/tickets">Đặt vé</Link>}
        </li>

        <li className="flex items-center space-x-2">
          <FaChartLine />
          {!isCollapsed && <Link to="/dashboard/statistics">Thống kê</Link>}
        </li>

        <li className="flex items-center space-x-2">
          <FaCog />
          {!isCollapsed && <Link to="/dashboard/settings">Cấu hình</Link>}
        </li>
      </ul>

      {/* Avatar Admin */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-3">
        <img
          src="https://i.pravatar.cc/40" // Avatar giả lập
          alt="Admin"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        {!isCollapsed && (
          <button className="flex items-center space-x-2 bg-red-500 px-3 py-1 rounded-lg">
            <FaSignOutAlt />
            <span>Đăng xuất</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
