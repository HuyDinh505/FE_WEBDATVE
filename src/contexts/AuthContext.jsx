import { createContext, useContext, useState, useEffect } from "react";
import {
  ROLES,
  PERMISSIONS,
  hasPermission as checkPermission,
} from "../utils/auth"; // Nhập hasPermission
import { useNavigate } from "react-router-dom";

const API_URL = "https://be-web-datve-1.onrender.com/api";
// const API_URL = "http://localhost:8000/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [nguoiDung, setNguoiDung] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("nguoiDung");
    if (token && userStr) {
      setNguoiDung(JSON.parse(userStr));
      setLoading(false);
    } else if (token) {
      fetchNguoiDungData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchNguoiDungData = async () => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 401) {
        await logout();
        navigate("/login");
        return;
      }

      if (response.ok) {
        const nguoiDungData = await response.json();
        setNguoiDung(nguoiDungData);
        localStorage.setItem("nguoiDung", JSON.stringify(nguoiDungData));
      }
    } catch (error) {
      console.error("Error fetching NguoiDung data:", error);
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, matKhau) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, matKhau }),
      });

      if (response.ok) {
        const data = await response.json();
        // Chuyển đổi dữ liệu từ API
        const userData = {
          ...data.nguoiDung,
          ma_vai_tro: parseInt(data.nguoiDung.ma_vai_tro),
        };
        localStorage.setItem("token", data.token);
        setNguoiDung(userData);
        localStorage.setItem("nguoiDung", JSON.stringify(userData));
        // Đảm bảo userData đã được set trước khi chuyển hướng
        await new Promise((resolve) => setTimeout(resolve, 100));
        // Chuyển hướng dựa trên vai trò
        switch (userData.ma_vai_tro) {
          case ROLES.ADMIN:
            navigate("/admin");
            break;
          case ROLES.QUAN_LY:
            navigate("/manager");
            break;
          case ROLES.NHAN_VIEN:
            navigate("/staff");
            break;
          default:
            navigate("/");
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      handleApiError(error);
      return false;
    }
  };

  const register = async (email, matKhau, hoTen, soDienThoai) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hoTen,
          email,
          matKhau,
          matKhau_confirmation: matKhau,
          soDienThoai,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setNguoiDung(data.nguoiDung);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      handleApiError(error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      handleApiError(error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("nguoiDung");
      setNguoiDung(null);
    }
  };

  const hasRole = (role) => {
    if (!nguoiDung || !nguoiDung.ma_vai_tro) return false;
    return nguoiDung.ma_vai_tro === role;
  };

  const hasPermission = (permission) => {
    return checkPermission(nguoiDung, permission); // Sử dụng hasPermission từ auth.js
  };

  const hasAnyPermission = (permissions) => {
    return permissions.some((permission) => hasPermission(permission));
  };

  const hasAllPermissions = (permissions) => {
    return permissions.every((permission) => hasPermission(permission));
  };

  const handleApiError = async (error) => {
    if (error.response?.status === 401) {
      await logout();
      navigate("/login");
    }
    if (error.response?.status === 403) {
      navigate("/unauthorized");
    }
    throw error;
  };

  const value = {
    nguoiDung,
    setNguoiDung,
    loading,
    login,
    register,
    logout,
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const UnauthorizedPage = () => {
  const { nguoiDung } = useAuth();
  const navigate = useNavigate();

  const getCorrectPath = () => {
    switch (nguoiDung?.ma_vai_tro) {
      case ROLES.ADMIN:
        return "/admin";
      case ROLES.QUAN_LY:
        return "/manager";
      case ROLES.NHAN_VIEN:
        return "/staff";
      default:
        return "/";
    }
  };

  return (
    <div>
      <h2>Unauthorized Access</h2>
      <p>You don't have permission to access this page.</p>
      <button onClick={() => navigate(getCorrectPath())}>
        Go to Your Dashboard
      </button>
    </div>
  );
};
