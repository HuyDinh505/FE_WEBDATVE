import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGePhongUS,
  useGetChiTietPhimUS,
  useGetDVAnUongUS,
  useGetLoaiVeUS,
  useGetRapUS,
  usePostBookingUS,
} from "../api/homepage";
import { showToast } from "../components/Toast/Toast";
import { useAuth } from "../contexts/AuthContext";
import axiosInstance from "../api/axios";

const Confirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { nguoiDung } = useAuth();
  const timeLeftRef = useRef(175);
  const [timeLeft, setTimeLeft] = useState(timeLeftRef.current);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          showToast.warning("Hết thời gian giữ vé! Vui lòng đặt lại.");
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  if (!state) {
    showToast.error("Không có thông tin đặt vé!");
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
        <p className="text-lg font-semibold">Không có thông tin đặt vé!</p>
        <button
          className="mt-4 px-5 py-2.5 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
          onClick={() => navigate("/")}
        >
          Quay về trang chủ
        </button>
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const {
    movieID,
    selectedTheater,
    selectedRoom,
    selectedShowtime,
    ticketCounts,
    selectedSeats,
    grandTotal,
    selectedDate,
    selectedSc,
    selectedFD,
  } = state;

  const { data: phim } = useGetChiTietPhimUS(movieID);
  const { data: rap, isLoading, isError } = useGetRapUS(selectedTheater);
  const { data: phong } = useGePhongUS(selectedRoom);
  const { data: loaives } = useGetLoaiVeUS();
  const { data: dichvus } = useGetDVAnUongUS();

  const { mutateAsync: postBooking } = usePostBookingUS();

  if (isLoading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (isError || !rap) {
    return <p>Lỗi khi tải dữ liệu rạp!</p>;
  }

  const getNameLoaiVe = (maloaive) => {
    const loaive = loaives?.find(
      (lv) => lv.ma_loai_ve.toString() === maloaive.toString()
    );
    return loaive ? loaive.ten_loai_ve : `Loại ve : ${maloaive}`;
  };

  const getNameDv = (madichvu) => {
    const dichvu = dichvus?.find(
      (dv) => dv.ma_dv_an_uong.toString() === madichvu.toString()
    );
    return dichvu ? dichvu.ten_dv_an_uong : `Dich vu :${madichvu}`;
  };

  const handlePayment = async (orderId) => {
    const paymentData = {
      amount: grandTotal,
      orderId: orderId,
    };

    try {
      const response = await axiosInstance.post("/create-payment", paymentData);
      const data = response;
      if (data.error) {
        throw new Error(data.error);
      }
      window.location.href = data.payUrl;
    } catch (error) {
      showToast.error(
        "Lỗi khi tạo thanh toán: " + (error.message || "Có lỗi xảy ra")
      );
    }
  };

  const handelBooking = async () => {
    // Kiểm tra đăng nhập
    if (!nguoiDung) {
      showToast.error("Vui lòng đăng nhập để đặt vé!");
      navigate("/login", { state: { from: "/confirmation" } });
      return;
    }

    const loaive = Object.entries(ticketCounts)
      .map(([key, value]) => `${key}:${value}`)
      .join(",");
    const ghe = selectedSeats.map((seat) => seat.ma_ghe).join(",");
    const formattedDate = new Date(selectedDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", "");

    let bookingData = {
      ma_nguoi_dung: nguoiDung.ma_nguoi_dung,
      ma_sc: selectedSc,
      tong_tien: grandTotal,
      ngay_dat_ve: formattedDate,
      loai_ve: loaive,
      ghe: ghe,
    };
    // Nếu có dịch vụ ăn uống, chuyển object sang chuỗi
    if (selectedFD && Object.keys(selectedFD).length > 0) {
      bookingData.bap_nuoc = Object.entries(selectedFD)
        .filter(([, count]) => count > 0)
        .map(([id, count]) => `${id}:${count}`)
        .join(",");
    }

    try {
      console.log("ticketCounts:", ticketCounts);
      console.log("grandTotal:", grandTotal);
      const response = await postBooking(bookingData);
      if (response?.success) {
        showToast.success("Đặt vé thành công!");
        const orderId = response.ma_ve;
        handlePayment(orderId);
      } else {
        showToast.error(response?.message || "Đặt vé không thành công!");
        console.error("Phản hồi không thành công:", response);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        showToast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        navigate("/login", { state: { from: "/confirmation" } });
      } else if (error.response?.status === 403) {
        showToast.error("Bạn không có quyền thực hiện thao tác này!");
        navigate("/unauthorized");
      } else {
        showToast.error(
          "Đặt vé thất bại: " + (error.message || "Có lỗi xảy ra")
        );
        if (error.response) {
          console.log("Lỗi từ server:", error.response.data);
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {phim ? (
          <>
            <h2 className="text-xl font-bold text-yellow-500 text-center">
              {phim.ten_phim}
            </h2>
            <p className="text-center text-sm text-gray-600">
              Phim dành cho khán giả từ {phim.do_tuoi}
            </p>
          </>
        ) : (
          <p className="text-red-500">Không tìm thấy thông tin phim</p>
        )}

        <div className="flex justify-between items-center mt-2 text-sm font-semibold text-gray-800">
          <span>THỜI GIAN GIỮ VÉ:</span>
          <span className="bg-yellow-500 text-black px-2 py-1 rounded-md">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>

        <div className="mt-4 text-sm">
          {rap ? (
            <>
              <h3 key={rap.ma_rap} className="font-bold text-gray-800">
                {rap.ten_rap}
              </h3>
              <p className="text-xs text-gray-600">{rap.dia_chi}</p>
            </>
          ) : (
            <p className="text-red-500">Không tìm thấy thông tin rạp</p>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-800 flex justify-between">
          <p>
            🕒 Thời gian:<span className="font-bold">{selectedShowtime}</span>
          </p>
          <p>
            Ngày: <span className="font-bold">{selectedDate}</span>
          </p>
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-800">
          {phong ? (
            <>
              <p>
                Phòng chiếu:{" "}
                <span className="font-bold"> {phong.ten_phong}</span>
              </p>
            </>
          ) : (
            <p className="text-red-500">Không tìm thấy thông tin phòng chiếu</p>
          )}

          <p>
            <span className="font-bold">Số vé:</span>{" "}
            {Object.values(ticketCounts).reduce((acc, count) => acc + count, 0)}
          </p>
        </div>

        <div className="mt-4 text-sm text-gray-800 flex justify-between">
          <div>
            <span className="font-bold">Loại vé:</span>{" "}
            {Object.entries(ticketCounts).map(([type, count]) => (
              <p className="block" key={type}>
                <span>
                  {" "}
                  {getNameLoaiVe(type)} : {count}
                </span>
              </p>
            ))}
          </div>
        </div>

        <div className="mt-4 flex text-sm text-gray-800">
          <span className="font-bold mr-6">Số ghế:</span>{" "}
          <span>{selectedSeats.map((item) => item.so_ghe).join(", ")} </span>
        </div>
        {selectedFD && Object.keys(selectedFD).length > 0 && (
          <div className="mt-4 text-sm text-gray-800">
            <span>🍿 Bắp nước:</span>
            {Object.entries(selectedFD).map(([type, count]) => (
              <p key={type}>
                <span className="font-bold">
                  {" "}
                  {getNameDv(type)} : {count}
                </span>
              </p>
            ))}
          </div>
        )}

        <div className="mt-6 border-t pt-3 text-lg font-bold flex justify-between text-gray-900">
          <span>SỐ TIỀN CẦN THANH TOÁN</span>
          <span className="text-yellow-500">{grandTotal} VND</span>
        </div>

        <button
          className="mt-6 w-full px-5 py-3 bg-yellow-500 text-black text-lg font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-all"
          onClick={handelBooking}
        >
          ✅ Hoàn tất
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
