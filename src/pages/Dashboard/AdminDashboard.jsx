import React from "react";
import { FaUsers, FaFilm, FaTheaterMasks, FaChartBar } from "react-icons/fa";

const StatCard = ({ icon: Icon, title, value, bgColor }) => (
  <div className={`${bgColor} p-6 rounded-lg shadow-lg text-white`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-75">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <Icon className="text-4xl opacity-75" />
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Tổng quan quản trị</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FaUsers}
          title="Tổng số người dùng"
          value="1,234"
          bgColor="bg-blue-500"
        />
        <StatCard
          icon={FaFilm}
          title="Phim đang chiếu"
          value="15"
          bgColor="bg-green-500"
        />
        <StatCard
          icon={FaTheaterMasks}
          title="Rạp chiếu phim"
          value="8"
          bgColor="bg-purple-500"
        />
        <StatCard
          icon={FaChartBar}
          title="Doanh thu tháng"
          value="123.4M"
          bgColor="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Hoạt động gần đây</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 border-b pb-4"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-600">2 giờ trước</p>
                  <p className="text-gray-800">
                    Người dùng mới đăng ký tài khoản
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Thao tác nhanh</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
              <FaUsers className="mx-auto text-xl mb-2" />
              <span className="text-sm">Thêm người dùng</span>
            </button>
            <button className="p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
              <FaFilm className="mx-auto text-xl mb-2" />
              <span className="text-sm">Thêm phim mới</span>
            </button>
            <button className="p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
              <FaTheaterMasks className="mx-auto text-xl mb-2" />
              <span className="text-sm">Quản lý rạp</span>
            </button>
            <button className="p-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
              <FaChartBar className="mx-auto text-xl mb-2" />
              <span className="text-sm">Xem báo cáo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
