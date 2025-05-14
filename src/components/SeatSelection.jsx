import { useState, useEffect } from "react";

const SeatSelection = ({
  onSeatSelect,
  totalTicket,
  seats = [], // Sử dụng seats từ props
  bookedSeats = [], // Danh sách ghế đã đặt trước đó
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Nhóm ghế theo hàng (dựa vào ký tự đầu tiên)
  const groupedSeats = seats.reduce((acc, seat) => {
    const seatNumber = seat.so_ghe || seat; // Lấy số ghế từ đối tượng hoặc seat nếu là chuỗi
    const row = seatNumber.charAt(0); // Lấy ký tự đầu tiên làm hàng (A, B, C,...)
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {});

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat.ma_ghe)) return; // Không cho chọn ghế đã đặt
    const isSelected = selectedSeats.some((s) => s.ma_ghe === seat.ma_ghe);
    if (isSelected) {
      setSelectedSeats((prev) => prev.filter((s) => s.ma_ghe !== seat.ma_ghe));
    } else {
      if (selectedSeats.length >= totalTicket) {
        alert("Bạn đã chọn đủ ghế");
        return;
      }
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  useEffect(() => {
    onSeatSelect(selectedSeats);
  }, [selectedSeats, onSeatSelect]);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-bold text-center mb-4">Màn hình</h2>

      {seats.length === 0 ? (
        <p className="text-center text-gray-500">Vui lòng chọn rạp</p>
      ) : (
        <div className="flex flex-col items-center">
          {Object.entries(groupedSeats).map(([row, seatList]) => (
            <div key={row} className="flex items-center my-1">
              <span className="mr-3 font-bold text-lg">{row}</span>
              <div className="flex gap-1">
                {" "}
                {seatList.map((seat) => {
                  const seatLabel =
                    typeof seat === "string" ? seat : seat.so_ghe;
                  const seatId = typeof seat === "string" ? seat : seat.ma_ghe;

                  return (
                    <button
                      key={seatId}
                      className={`w-10 h-10 text-sm font-bold border rounded-md transition-all ${
                        bookedSeats.includes(seatId)
                          ? "bg-red-500 text-white cursor-not-allowed"
                          : selectedSeats.some((ghe) => ghe.ma_ghe === seatId)
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                      onClick={() => toggleSeat(seat)}
                    >
                      {seatLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
