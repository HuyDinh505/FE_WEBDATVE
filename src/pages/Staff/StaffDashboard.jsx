import React from "react";
import { FaTicketAlt, FaUtensils } from "react-icons/fa";

const StaffDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tổng quan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Thống kê vé */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <FaTicketAlt className="text-blue-500 text-2xl mr-2" />
            <h2 className="text-xl font-semibold">Quản lý vé</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Vé đã bán hôm nay:</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Vé chờ xử lý:</span>
              <span className="font-bold">0</span>
            </div>
          </div>
        </div>

        {/* Thống kê thức ăn */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <FaUtensils className="text-green-500 text-2xl mr-2" />
            <h2 className="text-xl font-semibold">Quản lý thức ăn</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Đơn hàng hôm nay:</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Đơn hàng chờ xử lý:</span>
              <span className="font-bold">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
