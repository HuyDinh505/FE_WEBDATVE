import { ROLES } from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";

export const AdminRoute = ({ children, requiredPermissions = [] }) => {
  return (
    <ProtectedRoute
      requiredRole={ROLES.ADMIN}
      requiredPermissions={requiredPermissions}
    >
      {children}
    </ProtectedRoute>
  );
};

export const ManagerRoute = ({ children, requiredPermissions = [] }) => {
  return (
    <ProtectedRoute
      requiredRole={ROLES.QUAN_LY}
      requiredPermissions={requiredPermissions}
    >
      {children}
    </ProtectedRoute>
  );
};

export const StaffRoute = ({ children, requiredPermissions = [] }) => {
  return (
    <ProtectedRoute
      requiredRole={ROLES.NHAN_VIEN}
      requiredPermissions={requiredPermissions}
    >
      {children}
    </ProtectedRoute>
  );
};

export const CustomerRoute = ({ children, requiredPermissions = [] }) => {
  return (
    <ProtectedRoute
      requiredRole={ROLES.KHACH_HANG}
      requiredPermissions={requiredPermissions}
    >
      {children}
    </ProtectedRoute>
  );
};
