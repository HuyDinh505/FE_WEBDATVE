import React from "react";
import {
  FaChartLine,
  FaUsers,
  FaTicketAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

const StatCard = ({ icon: Icon, title, value, change, changeType }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p
          className={`text-sm mt-1 ${
            changeType === "increase" ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </p>
      </div>
      <Icon className="text-4xl text-blue-500 opacity-75" />
    </div>
  </div>
);

const Statistics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Thống kê</h1>
        <div className="flex items-center space-x-4">
          <select className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
            <option value="7">7 ngày qua</option>
            <option value="30">30 ngày qua</option>
            <option value="90">90 ngày qua</option>
          </select>
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            <FaCalendarAlt />
            <span>Tùy chỉnh</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FaMoneyBillWave}
          title="Doanh thu"
          value="123.4M VND"
          change="+15.3% so với tuần trước"
          changeType="increase"
        />
        <StatCard
          icon={FaTicketAlt}
          title="Vé đã bán"
          value="1,234"
          change="+10.2% so với tuần trước"
          changeType="increase"
        />
        <StatCard
          icon={FaUsers}
          title="Khách hàng mới"
          value="256"
          change="-5.8% so với tuần trước"
          changeType="decrease"
        />
        <StatCard
          icon={FaChartLine}
          title="Tỷ lệ lấp đầy"
          value="85%"
          change="+8.4% so với tuần trước"
          changeType="increase"
        />
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Movies */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Phim ăn khách nhất</h2>
          <div className="space-y-4">
            {[
              { name: "Avengers: Endgame", tickets: 450, revenue: "45M VND" },
              {
                name: "Spider-Man: No Way Home",
                tickets: 380,
                revenue: "38M VND",
              },
              { name: "Black Panther", tickets: 320, revenue: "32M VND" },
            ].map((movie, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-medium">{movie.name}</p>
                  <p className="text-sm text-gray-500">{movie.tickets} vé</p>
                </div>
                <p className="text-blue-500 font-medium">{movie.revenue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Theater */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Doanh thu theo rạp</h2>
          <div className="space-y-4">
            {[
              { name: "CGV Vincom Center", revenue: "58M VND", percentage: 85 },
              { name: "CGV Aeon Mall", revenue: "45M VND", percentage: 65 },
              { name: "CGV Pearl Plaza", revenue: "32M VND", percentage: 45 },
            ].map((theater, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{theater.name}</span>
                  <span className="text-sm text-gray-500">
                    {theater.revenue}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${theater.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Giao dịch gần đây</h2>
          <div className="space-y-4">
            {[
              {
                id: "#123",
                time: "10:30 AM",
                amount: "200K VND",
                status: "Thành công",
              },
              {
                id: "#124",
                time: "11:00 AM",
                amount: "150K VND",
                status: "Thành công",
              },
              {
                id: "#125",
                time: "11:30 AM",
                amount: "300K VND",
                status: "Đang xử lý",
              },
            ].map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-medium">Đơn hàng {transaction.id}</p>
                  <p className="text-sm text-gray-500">{transaction.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{transaction.amount}</p>
                  <p
                    className={`text-sm ${
                      transaction.status === "Thành công"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Demographics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Thống kê khách hàng</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Độ tuổi</p>
              <div className="space-y-2">
                {[
                  { range: "18-24", percentage: 35 },
                  { range: "25-34", percentage: 45 },
                  { range: "35-44", percentage: 15 },
                  { range: "45+", percentage: 5 },
                ].map((age, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{age.range}</span>
                      <span>{age.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${age.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
