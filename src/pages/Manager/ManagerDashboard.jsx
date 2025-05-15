import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { managerAPI } from "../../services/api";

const ManagerDashboard = () => {
  const { nguoiDung } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    todayRevenue: 0,
    activeShows: 0,
    totalStaff: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch staff count separately
        try {
          const staffResponse = await managerAPI.getStaff();
          console.log("Staff Response:", staffResponse);
          console.log("Staff Data:", staffResponse.data);
          const totalStaff = staffResponse.data?.length || 0;
          console.log("Total Staff:", totalStaff);

          setDashboardData((prev) => ({
            ...prev,
            totalStaff: totalStaff,
          }));
        } catch (staffError) {
          console.error("Error fetching staff:", staffError);
          setDashboardData((prev) => ({
            ...prev,
            totalStaff: 0,
          }));
        }

        // Fetch revenue stats separately
        try {
          const revenueStats = await managerAPI.getRevenueStats();
          setDashboardData((prev) => ({
            ...prev,
            todayRevenue: revenueStats.data.todayRevenue,
            activeShows: revenueStats.data.activeShows || 0,
          }));
        } catch (revenueError) {
          console.error("Error fetching revenue stats:", revenueError);
          setDashboardData((prev) => ({
            ...prev,
            todayRevenue: 0,
            activeShows: 0,
          }));
        }
      } catch (error) {
        console.error("Error in fetchDashboardData:", error);
        setError("Không thể tải dữ liệu dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const managementItems = [
    {
      title: "Quản lý rạp chiếu",
      path: "/manager/theaters",
      description: "Quản lý thông tin các rạp chiếu phim",
      icon: "🏢",
    },
    {
      title: "Quản lý danh sách nhân viên",
      path: "/manager/staff",
      description: "Quản lý thông tin nhân viên",
      icon: "👥",
    },
    {
      title: "Quản lý phòng chiếu và thiết bị",
      path: "/manager/rooms",
      description: "Quản lý phòng chiếu và thiết bị",
      icon: "🎥",
    },
    {
      title: "Quản lý ghế",
      path: "/manager/seats",
      description: "Quản lý sơ đồ và thông tin ghế ngồi",
      icon: "💺",
    },
    {
      title: "Quản lý khuyến mãi",
      path: "/manager/promotions",
      description: "Quản lý các chương trình khuyến mãi",
      icon: "🎫",
    },
    {
      title: "Quản lý suất chiếu",
      path: "/manager/showtimes",
      description: "Quản lý lịch chiếu phim",
      icon: "📅",
    },
    {
      title: "Quản lý thống kê",
      path: "/manager/statistics",
      description: "Xem báo cáo và thống kê",
      icon: "📊",
    },
    {
      title: "Quản lý phim",
      path: "/manager/movies",
      description: "Quản lý danh sách phim trong rạp",
      icon: "🎬",
    },
  ];

  // if (error) {
  //   return (
  //     <div className="p-6">
  //       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
  //         {error}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Quản Lý Rạp Chiếu Phim</h1>
        <p className="text-gray-600">
          Xin chào, {nguoiDung?.ho_ten || "Quản lý"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">{item.icon}</span>
              <h2 className="text-xl font-semibold">{item.title}</h2>
            </div>
            <p className="text-gray-600">{item.description}</p>
          </Link>
        ))}
      </div>

      {/* Quick Stats Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Thống Kê Nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Doanh Thu Hôm Nay</h3>
            <p className="text-2xl font-bold text-green-600">
              {loading
                ? "Đang tải..."
                : `${new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(dashboardData?.todayRevenue || 0)}`}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">
              Suất Chiếu Đang Hoạt Động
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {loading ? "Đang tải..." : dashboardData?.activeShows || 0}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Tổng Số Nhân Viên</h3>
            <p className="text-2xl font-bold text-purple-600">
              {loading ? "Đang tải..." : dashboardData?.totalStaff || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
