import { useEffect, useState } from "react";
import { useGetDVAnUongUS } from "../api/homepage";
import { imagePhim } from "../Utilities/common";

const FoodAndDrinkSelection = ({ onFoodSelect }) => {
  const [items, setItems] = useState({});
  const { data: DSDichVuAnUong } = useGetDVAnUongUS();
  useEffect(() => {
    onFoodSelect(items);
  }, [items]);
  // Xử lý tăng/giảm số lượng
  const handleQuantityChange = (name, change) => {
    setItems((prev) => {
      const newQuantity = Math.max(0, (prev[name] || 0) + change);
      return { ...prev, [name]: newQuantity };
    });
  };
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg w-full max-w-4xl mx-auto">
      <h2 className="text-lg font-bold text-center mb-4">CHỌN BẮP & NƯỚC</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DSDichVuAnUong?.map((item) => (
          <div
            key={item.ma_dv_an_uong}
            className="flex flex-col items-center p-2 border border-gray-700 rounded-md"
          >
            <img
              src={`${imagePhim}${item.anh_dv}`}
              alt={item.ten_dv_an_uong}
              className="w-32 h-32 object-contain mb-2"
            />
            <h3 className="text-sm font-bold">{item.ten_dv_an_uong}</h3>
            <p className="text-sm font-semibold mt-1">
              {item.gia_tien.toLocaleString("vi-VN")} VNĐ
            </p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => handleQuantityChange(item.ma_dv_an_uong, -1)}
                className="w-8 h-8 bg-gray-700 rounded-full text-lg"
              >
                -
              </button>
              <span className="text-lg">{items[item.ma_dv_an_uong] || 0}</span>
              <button
                onClick={() => handleQuantityChange(item.ma_dv_an_uong, 1)}
                className="w-8 h-8 bg-gray-700 rounded-full text-lg"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodAndDrinkSelection;
