import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { canAccess, ROLES } from "../utils/auth";

const ProtectedRoute = ({
  children,
  requiredRole = null,
  requiredPermissions = [],
}) => {
  const { nguoiDung, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!nguoiDung) {
    return <Navigate to="/login" />;
  }

  // Kiểm tra URL có phù hợp với vai trò không
  const isCorrectPath = () => {
    // Khách hàng có thể truy cập tất cả các route công khai
    if (nguoiDung.ma_vai_tro === ROLES.KHACH_HANG) {
      return (
        !location.pathname.startsWith("/admin") &&
        !location.pathname.startsWith("/manager") &&
        !location.pathname.startsWith("/staff")
      );
    }

    if (
      nguoiDung.ma_vai_tro === ROLES.ADMIN &&
      !location.pathname.startsWith("/admin")
    ) {
      return false;
    }
    if (
      nguoiDung.ma_vai_tro === ROLES.QUAN_LY &&
      !location.pathname.startsWith("/manager")
    ) {
      return false;
    }
    if (
      nguoiDung.ma_vai_tro === ROLES.NHAN_VIEN &&
      !location.pathname.startsWith("/staff")
    ) {
      return false;
    }
    return true;
  };

  // Nếu URL không phù hợp với vai trò, chuyển hướng về trang chính của vai trò đó
  if (!isCorrectPath()) {
    switch (nguoiDung.ma_vai_tro) {
      case ROLES.ADMIN:
        return <Navigate to="/admin" />;
      case ROLES.QUAN_LY:
        return <Navigate to="/manager" />;
      case ROLES.NHAN_VIEN:
        return <Navigate to="/staff" />;
      case ROLES.KHACH_HANG:
        return <Navigate to="/" />;
      default:
        return <Navigate to="/" />;
    }
  }

  // Nếu là khách hàng và không có yêu cầu vai trò cụ thể, cho phép truy cập
  if (nguoiDung.ma_vai_tro === ROLES.KHACH_HANG && !requiredRole) {
    return children;
  }

  // Kiểm tra quyền truy cập cho các vai trò khác
  if (!canAccess(nguoiDung, requiredRole, requiredPermissions)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
