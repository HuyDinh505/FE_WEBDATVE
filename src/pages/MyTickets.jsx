import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axiosInstance from "../api/axios";
import { showToast } from "../components/Toast/Toast";
import { formatCurrency } from "../utils/format";

const MyTickets = () => {
  const { nguoiDung } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        // const res = await axiosInstance.get(
        //   `/user/${nguoiDung.ma_nguoi_dung}/tickets`
        // );
        // setTickets(res.data);
        const res = await axiosInstance.get(
          `/user/${nguoiDung.ma_nguoi_dung}/tickets`
        );
        setTickets(res); // <-- ĐÚNG
      } catch {
        showToast.error("Không thể tải danh sách vé!");
      } finally {
        setLoading(false);
      }
    };
    if (nguoiDung?.ma_nguoi_dung) fetchTickets();
  }, [nguoiDung]);

  const handleCancel = async (ma_ve) => {
    if (!window.confirm("Bạn chắc chắn muốn hủy vé này?")) return;
    try {
      await axiosInstance.put(`/tickets/${ma_ve}/cancel`);
      setTickets((prev) =>
        prev.map((t) =>
          t.ma_ve === ma_ve ? { ...t, trang_thai: "Đã hủy" } : t
        )
      );
      showToast.success("Đã hủy vé thành công!");
    } catch {
      showToast.error("Hủy vé thất bại!");
    }
  };

  return (
    <div className="bg-[#f8f3e8]">
      <div className="max-w-4xl w-full mx-auto bg-white p-8 rounded shadow mt-8">
        <h2 className="text-xl font-bold mb-4">Vé của tôi</h2>
        {loading ? (
          <p>Đang tải vé...</p>
        ) : Array.isArray(tickets) && tickets.length > 0 ? (
          <table className="w-full border border-gray-200 rounded-lg shadow overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-gray-700">
                <th className="p-3 font-semibold">Mã vé</th>
                <th className="p-3 font-semibold">Phim</th>
                <th className="p-3 font-semibold">Ghế</th>
                <th className="p-3 font-semibold">Tổng tiền</th>
                <th className="p-3 font-semibold">Trạng thái</th>
                <th className="p-3 font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr
                  key={ticket.ma_ve}
                  className="text-center border-b hover:bg-yellow-50 transition"
                >
                  <td className="p-3 font-mono text-sm">{ticket.ma_ve}</td>
                  <td className="p-3">
                    {ticket.suat_chieu?.phim?.ten_phim || ""}
                  </td>
                  <td className="p-3">
                    {ticket.ve_dats && ticket.ve_dats.length > 0
                      ? ticket.ve_dats
                          .map((vd) => vd.ghe_ngoi?.so_ghe || vd.ma_ghe)
                          .join(", ")
                      : ""}
                  </td>
                  <td className="p-3 font-semibold text-yellow-700">
                    {formatCurrency(ticket.tong_gia_tien)}
                  </td>
                  <td className="p-3">
                    {ticket.trang_thai === "Đang chờ thanh toán" && (
                      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-medium">
                        {ticket.trang_thai}
                      </span>
                    )}
                    {ticket.trang_thai === "Đã hủy" && (
                      <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-medium">
                        {ticket.trang_thai}
                      </span>
                    )}
                    {ticket.trang_thai === "Đã thanh toán" && (
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-medium">
                        {ticket.trang_thai}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {ticket.trang_thai === "Đang chờ thanh toán" && (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition font-semibold"
                        onClick={() => handleCancel(ticket.ma_ve)}
                      >
                        Hủy vé
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Không có vé nào.</div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
