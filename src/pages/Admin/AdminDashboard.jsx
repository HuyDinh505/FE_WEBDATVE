import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { getMovies, getUsers } from "../../services/api";
import { getStatistics } from "../../services/api";
import { FaFilm, FaUsers, FaTicketAlt, FaMoneyBillWave } from "react-icons/fa";

const AdminDashboard = () => {
  const { nguoiDung } = useAuth();
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTickets: 0,
    totalRevenue: 0,
    loading: true,
  });

  useEffect(() => {
    fetchMovies();
    fetchUsers();
    fetchStatistics();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await getMovies();
      setMovies(response.data);
    } catch (error) {
      setMovies([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      setUsers([]);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await getStatistics();
      setStats({
        totalUsers: response.data.tong_nguoi_dung || 0,
        totalTickets: response.data.tong_ve_ban || 0,
        totalRevenue: response.data.tong_doanh_thu || 0,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Chào mừng, {nguoiDung?.ho_ten}!
        </h1>
        <p className="text-gray-600">Trang quản trị hệ thống</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Thống kê */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Tổng số phim</h3>
            <FaFilm className="text-2xl text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{movies.length}</p>
          <p className="text-sm text-gray-500 mt-2">Phim đang quản lý</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Tổng số người dùng</h3>
            <FaUsers className="text-2xl text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">{users.length}</p>
          <p className="text-sm text-gray-500 mt-2">Người dùng đã đăng ký</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Tổng số vé đã bán</h3>
            <FaTicketAlt className="text-2xl text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {new Intl.NumberFormat("vi-VN").format(stats.totalTickets)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Vé đã bán ra</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Doanh thu</h3>
            <FaMoneyBillWave className="text-2xl text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600">
            {formatCurrency(stats.totalRevenue)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Tổng doanh thu</p>
        </div>
      </div>

      {/* Các liên kết nhanh */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/admin/movies"
          className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Quản lý phim</h3>
          <p className="text-gray-600">Thêm, sửa, xóa phim</p>
        </Link>

        <Link
          to="/admin/accounts"
          className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Quản lý tài khoản</h3>
          <p className="text-gray-600">Quản lý người dùng hệ thống</p>
        </Link>

        <Link
          to="/admin/theaters"
          className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Quản lý rạp</h3>
          <p className="text-gray-600">Quản lý rạp và phòng chiếu</p>
        </Link>

        <Link
          to="/admin/statistics"
          className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Thống kê</h3>
          <p className="text-gray-600">Xem báo cáo và thống kê</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
