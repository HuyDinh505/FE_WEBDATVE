import React, { useState, useEffect } from "react";
import { FaSearch, FaTicketAlt, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { managerAPI } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const { nguoiDung } = useAuth();

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    filterTickets();
  }, [searchTerm, tickets]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      let response;
      if (nguoiDung?.ma_vai_tro === 3) {
        response = await managerAPI.getStaffTickets();
      } else {
        response = await managerAPI.getTickets();
      }
      setTickets(response.data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách vé:", err);
      toast.error(err.response?.data?.message || "Không thể tải danh sách vé");
    } finally {
      setLoading(false);
    }
  };

  const filterTickets = () => {
    const filtered = tickets.filter((ticket) => {
      const searchString = searchTerm.toLowerCase();
      return (
        String(ticket.ma_ve || "")
          .toLowerCase()
          .includes(searchString) ||
        (ticket.nguoi_dung?.ho_ten || "")
          .toLowerCase()
          .includes(searchString) ||
        (ticket.suat_chieu?.phim?.ten_phim || "")
          .toLowerCase()
          .includes(searchString)
      );
    });
    setFilteredTickets(filtered);
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await managerAPI.updateTicketStatus(ticketId, { trang_thai: newStatus });
      toast.success("Cập nhật trạng thái vé thành công");
      fetchTickets();
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái vé:", err);
      toast.error(
        err.response?.data?.message || "Không thể cập nhật trạng thái vé"
      );
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "N/A";
    return new Date(dateTime).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return "0 ₫";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã thanh toán":
        return "bg-green-100 text-green-800";
      case "Đang chờ thanh toán":
        return "bg-yellow-100 text-yellow-800";
      case "Đã hủy":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý vé</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm vé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã vé
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Suất chiếu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ghế
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tổng tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <tr key={ticket.ma_ve}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaTicketAlt className="text-blue-500 mr-2" />
                      {ticket.ma_ve}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.suat_chieu?.phim?.ten_phim || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDateTime(ticket.thoi_gian_chieu)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.ve_dats
                      ?.map((ve) => ve.ghe_ngoi?.so_ghe)
                      .join(", ") || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {ticket.khach_hang?.ten || "N/A"}
                      </span>
                      {ticket.khach_hang?.email && (
                        <span className="text-sm text-gray-500">
                          {ticket.khach_hang.email}
                        </span>
                      )}
                      {ticket.khach_hang?.sdt && (
                        <span className="text-sm text-gray-500">
                          {ticket.khach_hang.sdt}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatCurrency(ticket.tong_gia_tien)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        ticket.trang_thai
                      )}`}
                    >
                      {ticket.trang_thai}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {ticket.trang_thai === "Đang chờ thanh toán" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(ticket.ma_ve, "Đã thanh toán")
                            }
                            className="text-green-600 hover:text-green-900"
                            title="Xác nhận thanh toán"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(ticket.ma_ve, "Đã hủy")
                            }
                            className="text-red-600 hover:text-red-900"
                            title="Hủy vé"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  Không tìm thấy vé nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketManagement;
