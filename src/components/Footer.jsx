import React from "react";

const Footer = () => {
  return (
    <footer className="relative bottom-0 left-0 w-full bg-[#FDF7E5] text-black text-sm py-6 border-t border-black">
      <div className="w-4/5 mx-auto px-4">
        {/* Logo và danh sách dịch vụ */}
        <div className="text-center text-gray-700 space-x-4 mb-4 text-xs">
          <span className="font-bold text-blue-500">IMAX</span> •{" "}
          <span className="font-bold text-orange-500">STARIUM</span> •{" "}
          <span className="font-bold text-yellow-600">GOLD CLASS</span> •{" "}
          <span className="font-bold italic text-gray-700">L’AMOUR</span> •{" "}
          <span className="font-bold text-pink-500">SWEETBOX</span> •{" "}
          <span className="font-bold text-red-500">PREMIUM CINEMA</span> •{" "}
          <span className="text-gray-500">SCREENX</span> •{" "}
          <span className="text-gray-700">CINE & FORÊT</span> •{" "}
          <span className="text-gray-700">CINE & LIVING ROOM</span> •{" "}
          <span className="text-gray-700">CINE SUITE</span>
        </div>

        {/* Thông tin chính */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
          {/* Cột 1 */}
          <div>
            <h3 className="font-bold">CGV Việt Nam</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Giới Thiệu</li>
              <li>Tiện Ích Online</li>
              <li>Thẻ Quà Tặng</li>
              <li>Tuyển Dụng</li>
              <li>Liên Hệ Quảng Cáo CGV</li>
              <li>Dành cho Đối Tác</li>
            </ul>
          </div>

          {/* Cột 2 */}
          <div>
            <h3 className="font-bold">Điều khoản sử dụng</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Điều Khoản Chung</li>
              <li>Điều Khoản Giao Dịch</li>
              <li>Chính Sách Thanh Toán</li>
              <li>Chính Sách Bảo Mật</li>
              <li>Câu Hỏi Thường Gặp</li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div>
            <h3 className="font-bold">Kết nối với chúng tôi</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-red-500 text-xl">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-blue-600 text-xl">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-pink-500 text-xl">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-blue-400 text-xl">
                <i className="fab fa-zalo"></i>
              </a>
            </div>
            <img
              src="https://cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bocongthuong.png"
              alt="Bộ Công Thương"
              className="mt-4 w-40"
            />
          </div>

          {/* Cột 4 */}
          <div>
            <h3 className="font-bold">Chăm sóc khách hàng</h3>
            <p className="text-gray-700">Hotline: 1900 6017</p>
            <p className="text-gray-700">
              Giờ làm việc: 8:00 - 22:00 (Tất cả các ngày bao gồm cả Lễ Tết)
            </p>
            <p className="text-gray-700">
              Email hỗ trợ:{" "}
              <a href="mailto:hoidap@cgv.vn" className="text-blue-500">
                hoidap@cgv.vn
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
