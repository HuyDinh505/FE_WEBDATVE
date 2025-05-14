import { useState } from "react";
import SeatSelection from "./SeatSelection";
import {
  useGetDSGheUS,
  useGetDVAnUongUS,
  useGetLoaiVeUS,
  useGetRapSCUS,
} from "../api/homepage";
import { useParams, useNavigate } from "react-router-dom";
import FoodAndDrinkSelection from "./FoodAndDrinkSelection";

const TicketBooking = () => {
  const { ma_phim } = useParams();
  const [selectedDate, setSelectedDate] = useState("19");
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedSc, setSelectedSc] = useState(null);
  const [ticketCounts, setTicketCounts] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedFD, setSelectedFD] = useState([]); // food minh

  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const { data: loaives } = useGetLoaiVeUS();
  const { data: rapsc } = useGetRapSCUS(ma_phim);
  const { data: DSghe } = useGetDSGheUS(selectedRoom);
  const { data: dsDv } = useGetDVAnUongUS();
  const totalTicket = Object.values(ticketCounts).reduce(
    (acc, val) => acc + val,
    0
  );
  const totalPrice = Object.entries(ticketCounts).reduce((acc, [id, count]) => {
    const price =
      loaives.find((lv) => lv.ma_loai_ve === parseInt(id))?.gia_ve || 0;
    return acc + price * count;
  }, 0);

  const totalFoodDrinkPrice = Object.entries(selectedFD).reduce(
    (acc, [id, quantity]) => {
      const item = dsDv?.find(
        (dv) => dv.ma_dv_an_uong.toString() === id.toString()
      );
      if (!item) {
        return acc;
      }
      return acc + item.gia_tien * quantity;
    },
    0
  );
  console.log(" totalFoodDrinkPrice", totalFoodDrinkPrice);
  const grandTotal = totalPrice + totalFoodDrinkPrice;

  const generateDates = () => {
    const today = new Date();
    return Array.from({ length: 5 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return {
        id: i,
        day: date.toLocaleDateString("vi-VN", { weekday: "short" }),
        fulldate: date.toISOString().split("T")[0],
        displaydate: date.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
        }),
      };
    });
  };

  const dates = generateDates();

  const handleTicketChange = (id, change) => {
    setTicketCounts((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change),
    }));
  };

  const handleShowtimeSelect = (theater, showtime) => {
    setSelectedTheater(theater.ma_rap);
    setSelectedShowtime(showtime.thoi_gian_bd);
    setSelectedRoom(showtime.ma_phong);
    setSelectedSc(showtime.ma_suat_chieu);
  };

  const handleConfirmBooking = () => {
    const bookingInfo = {
      movieID: ma_phim, // Tên phim
      selectedTheater, // Tên rạp
      selectedRoom, // Phòng chiếu
      selectedShowtime, // Giờ chiếu
      ticketCounts, // Số lượng vé
      selectedSeats, // Ghế đã chọn
      grandTotal, // Tổng tiền
      selectedDate, //Ngày đặt vé
      selectedSc, // Mã suất chiếu
      selectedFD, // Danh sách dịch vụ ăn uống
    };

    navigate("/confirmation", { state: bookingInfo });
  };
  console.log("food", selectedFD);
  ///
  const handleNextStep = () => {
    const totalTickets = Object.values(ticketCounts).reduce((a, b) => a + b, 0);
    if (totalTickets === 0) {
      alert("Vui lòng chọn ít nhất một vé!");
      return;
    }
    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất một ghế!");
      return;
    }
    if (selectedSeats.length < totalTicket) {
      alert("Bạn chưa chọn đủ số lượng ghế");
      return;
    }
    setStep(2);
  };

  const handleFoodSelect = (items) => {
    setSelectedFD(items);
  };
  ///
  return (
    <div className="p-6 bg-gray-100 max-w-4xl mx-auto rounded-md shadow-lg">
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${
            step === 1 ? "bg-green-500 text-white" : "bg-gray-600 text-gray-300"
          }`}
        >
          1. Chọn vé & ghế
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            step === 2 ? "bg-green-500 text-white" : "bg-gray-600 text-gray-300"
          }`}
        >
          2. Chọn bắp & nước
        </button>
      </div>

      {step === 1 && (
        <>
          <h2 className="text-center text-2xl font-bold my-4">CHỌN LOẠI VÉ</h2>
          <div className="flex justify-center gap-6 flex-wrap">
            {loaives?.map((loaive) => (
              <div
                key={loaive.ma_loai_ve}
                className="bg-white p-4 rounded-lg text-center w-64 shadow-lg border"
              >
                <h3 className="text-lg font-semibold">{loaive.ten_loai_ve}</h3>
                <p className="text-xl font-bold">{loaive.gia_ve} VNĐ</p>
                <div className="flex items-center justify-center mt-2 bg-gray-200 rounded-md p-1">
                  <button
                    className="px-3 py-1 text-lg font-bold text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
                    onClick={() => handleTicketChange(loaive.ma_loai_ve, -1)}
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg font-semibold">
                    {ticketCounts[loaive.ma_loai_ve] || 0}
                  </span>
                  <button
                    className="px-3 py-1 text-lg font-bold text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
                    onClick={() => handleTicketChange(loaive.ma_loai_ve, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex overflow-x-auto space-x-2 p-2 bg-white rounded-md mt-4">
            {dates.map((d, index) => (
              <button
                key={index}
                className={`p-4 rounded-md text-sm ${
                  selectedDate === d.fulldate
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-green-500"
                }`}
                onClick={() => setSelectedDate(d.fulldate)}
              >
                <div className="font-bold " style={{ fontSize: "18px" }}>
                  {d.displaydate}
                </div>
                <div className="" style={{ fontSize: "16px" }}>
                  {d.day}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 bg-white p-4 rounded-md">
            {rapsc?.map((theater) => (
              <div key={theater.ma_rap} className="mb-4">
                <h3 className="text-lg font-semibold">{theater.ten_rap}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {theater.suat_chieu?.map((sc) => (
                    <button
                      key={`${theater.ten_rap}-${sc.ma_phong}-${sc.thoi_gian_bd}`}
                      className={`px-4 py-2  rounded-md text-sm transition-all duration-300 ease-in-out ${
                        selectedShowtime === sc.thoi_gian_bd &&
                        selectedTheater === theater.ma_rap
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-green-500"
                      }`}
                      onClick={() => handleShowtimeSelect(theater, sc)}
                    >
                      {sc.thoi_gian_bd}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedRoom && DSghe && Array.isArray(DSghe) && (
            <SeatSelection
              selectedTheater={selectedTheater}
              onSeatSelect={setSelectedSeats}
              totalTicket={totalTicket}
              seats={DSghe}
            />
          )}

          <button
            className="mt-6 w-full px-4 py-3 bg-green-500 text-white text-lg font-bold rounded-lg hover:bg-green-600 transition-all"
            onClick={handleNextStep}
          >
            Tiếp tục
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <FoodAndDrinkSelection onFoodSelect={handleFoodSelect} />
          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-3 bg-gray-500 text-white text-lg font-bold rounded-lg hover:bg-gray-600 transition-all"
              onClick={() => setStep(1)} // Quay lại bước chọn ghế
            >
              Quay lại
            </button>
            <button
              className="px-4 py-3 bg-green-500 text-white text-lg font-bold rounded-lg hover:bg-green-600 transition-all"
              onClick={handleConfirmBooking}
            >
              Xác nhận đặt vé
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketBooking;
