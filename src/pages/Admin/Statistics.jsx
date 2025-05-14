import React, { useState, useEffect } from "react";
import {
  getStatistics,
  getRevenueByDateRange,
  getMovieStatistics,
} from "../../services/api";
import { toast } from "react-toastify";
import {
  FaChartLine,
  FaUsers,
  FaTicketAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [revenue, setRevenue] = useState([]);
  const [movieStats, setMovieStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1))
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchAllStatistics();
  }, []);

  const fetchAllStatistics = async () => {
    try {
      setLoading(true);
      const [statsResponse, revenueResponse, movieStatsResponse] =
        await Promise.all([
          getStatistics(),
          getRevenueByDateRange(dateRange.startDate, dateRange.endDate),
          getMovieStatistics(),
        ]);

      if (statsResponse.data) setStatistics(statsResponse.data);
      if (revenueResponse.data) setRevenue(revenueResponse.data);
      if (movieStatsResponse.data) setMovieStats(movieStatsResponse.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      toast.error("Không thể tải dữ liệu thống kê");
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = async (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));

    try {
      const response = await getRevenueByDateRange(
        name === "startDate" ? value : dateRange.startDate,
        name === "endDate" ? value : dateRange.endDate
      );
      if (response.data) setRevenue(response.data);
    } catch (error) {
      console.error("Error fetching revenue:", error);
      toast.error("Không thể tải dữ liệu doanh thu");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Thống kê</h1>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Tổng doanh thu</h3>
          <p className="text-2xl font-bold text-gray-900">
            {statistics?.totalRevenue?.toLocaleString("vi-VN")} đ
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Tổng số vé đã bán
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {statistics?.totalTickets?.toLocaleString("vi-VN")}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Số phim đang chiếu
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {statistics?.activeMovies}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Số khách hàng</h3>
          <p className="text-2xl font-bold text-gray-900">
            {statistics?.totalCustomers?.toLocaleString("vi-VN")}
          </p>
        </div>
      </div>

      {/* Revenue by Date Range */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Doanh thu theo thời gian</h2>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Từ ngày
              </label>
              <input
                type="date"
                name="startDate"
                value={dateRange.startDate}
                onChange={handleDateRangeChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Đến ngày
              </label>
              <input
                type="date"
                name="endDate"
                value={dateRange.endDate}
                onChange={handleDateRangeChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doanh thu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số vé bán
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {revenue.map((item) => (
                <tr key={item.date}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(item.date).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.revenue.toLocaleString("vi-VN")} đ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.ticketsSold}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Movie Statistics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Thống kê theo phim</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên phim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doanh thu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số vé bán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tỷ lệ lấp đầy
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movieStats.map((movie) => (
                <tr key={movie.movieId}>
                  <td className="px-6 py-4 whitespace-nowrap">{movie.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {movie.revenue.toLocaleString("vi-VN")} đ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {movie.ticketsSold}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {movie.occupancyRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
