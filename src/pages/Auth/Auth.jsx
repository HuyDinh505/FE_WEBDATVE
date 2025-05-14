import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-[#fdf1df] rounded-lg shadow-lg">
      {/* Form để xử lý chuyển đổi giữa Đăng Nhập & Đăng Ký */}
      <form
        onSubmit={(e) => e.preventDefault()} // Ngăn chặn reload trang
        className="flex"
      >
        <input
          type="submit"
          value="ĐĂNG NHẬP"
          className={`flex-1 py-2 font-bold cursor-pointer ${
            isLogin ? "bg-gray-300 text-black" : "bg-red-600 text-white"
          }`}
          onClick={() => setIsLogin(true)}
        />
        <input
          type="submit"
          value="ĐĂNG KÝ"
          className={`flex-1 py-2 font-bold cursor-pointer ${
            !isLogin ? "bg-gray-300 text-black" : "bg-red-600 text-white"
          }`}
          onClick={() => setIsLogin(false)}
        />
      </form>

      {/* Hiển thị Form tương ứng */}
      <div className="mt-4">{isLogin ? <Login /> : <Register />}</div>
    </div>
  );
}

export default Auth;
