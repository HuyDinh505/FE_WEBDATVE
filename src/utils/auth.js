export const ROLES = {
  ADMIN: 1,
  QUAN_LY: 2,
  NHAN_VIEN: 3,
  KHACH_HANG: 4,
};

export const ROLE_NAMES = {
  [ROLES.ADMIN]: "admin",
  [ROLES.QUAN_LY]: "quan-ly",
  [ROLES.NHAN_VIEN]: "nhan-vien",
  [ROLES.KHACH_HANG]: "khach-hang",
};

export const PERMISSIONS = {
  // Quản lý tài khoản
  XEM_NGUOI_DUNG: "xem_nguoi_dung",
  THEM_NGUOI_DUNG: "them_nguoi_dung",
  SUA_NGUOI_DUNG: "sua_nguoi_dung",
  XOA_NGUOI_DUNG: "xoa_nguoi_dung",

  // Quản lý phim
  XEM_PHIM: "xem_phim",
  THEM_PHIM: "them_phim",
  SUA_PHIM: "sua_phim",
  XOA_PHIM: "xoa_phim",

  // Quản lý rạp
  XEM_RAP: "xem_rap",
  THEM_RAP: "them_rap",
  SUA_RAP: "sua_rap",
  XOA_RAP: "xoa_rap",

  // Quản lý phòng chiếu
  XEM_PHONG: "xem_phong",
  THEM_PHONG: "them_phong",
  SUA_PHONG: "sua_phong",
  XOA_PHONG: "xoa_phong",

  // Quản lý thiết bị
  XEM_THIET_BI: "xem_thiet_bi",
  THEM_THIET_BI: "them_thiet_bi",
  SUA_THIET_BI: "sua_thiet_bi",
  XOA_THIET_BI: "xoa_thiet_bi",

  // Quản lý ghế
  XEM_GHE: "xem_ghe",
  THEM_GHE: "them_ghe",
  SUA_GHE: "sua_ghe",
  XOA_GHE: "xoa_ghe",

  // Quản lý suất chiếu
  XEM_LICH_CHIEU: "xem_lich_chieu",
  THEM_LICH_CHIEU: "them_lich_chieu",
  SUA_LICH_CHIEU: "sua_lich_chieu",
  XOA_LICH_CHIEU: "xoa_lich_chieu",

  // Quản lý khuyến mãi
  XEM_KHUYEN_MAI: "xem_khuyen_mai",
  THEM_KHUYEN_MAI: "them_khuyen_mai",
  SUA_KHUYEN_MAI: "sua_khuyen_mai",
  XOA_KHUYEN_MAI: "xoa_khuyen_mai",

  // Quản lý vé
  XEM_VE: "xem_ve",
  THEM_VE: "them_ve",
  SUA_VE: "sua_ve",
  XOA_VE: "xoa_ve",
  XU_LY_VE: "xu_ly_ve",

  // Quản lý thức ăn
  XEM_THUC_AN: "xem_thuc_an",
  THEM_THUC_AN: "them_thuc_an",
  SUA_THUC_AN: "sua_thuc_an",
  XOA_THUC_AN: "xoa_thuc_an",
  XU_LY_DON_THUC_AN: "xu_ly_don_thuc_an",

  // Thống kê
  XEM_THONG_KE: "xem_thong_ke",
};

// Ánh xạ quyền cho từng vai trò
const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    // ADMIN có tất cả quyền quản lý tài khoản
    PERMISSIONS.XEM_NGUOI_DUNG,
    PERMISSIONS.THEM_NGUOI_DUNG,
    PERMISSIONS.SUA_NGUOI_DUNG,
    PERMISSIONS.XOA_NGUOI_DUNG,

    // Quyền quản lý phim
    PERMISSIONS.XEM_PHIM,
    PERMISSIONS.THEM_PHIM,
    PERMISSIONS.SUA_PHIM,
    PERMISSIONS.XOA_PHIM,

    // Quyền quản lý rạp
    PERMISSIONS.XEM_RAP,
    PERMISSIONS.THEM_RAP,
    PERMISSIONS.SUA_RAP,
    PERMISSIONS.XOA_RAP,

    // Quyền thống kê
    PERMISSIONS.XEM_THONG_KE,
  ],

  [ROLES.QUAN_LY]: [
    // Quyền quản lý nhân viên
    PERMISSIONS.XEM_NGUOI_DUNG,
    PERMISSIONS.THEM_NGUOI_DUNG,
    PERMISSIONS.SUA_NGUOI_DUNG,
    PERMISSIONS.XOA_NGUOI_DUNG,

    // Quyền quản lý rạp
    PERMISSIONS.XEM_RAP,
    PERMISSIONS.THEM_RAP,
    PERMISSIONS.SUA_RAP,
    PERMISSIONS.XOA_RAP,

    // Quyền quản lý phòng chiếu và thiết bị
    PERMISSIONS.XEM_PHONG,
    PERMISSIONS.THEM_PHONG,
    PERMISSIONS.SUA_PHONG,
    PERMISSIONS.XOA_PHONG,
    PERMISSIONS.XEM_THIET_BI,
    PERMISSIONS.THEM_THIET_BI,
    PERMISSIONS.SUA_THIET_BI,
    PERMISSIONS.XOA_THIET_BI,

    // Quyền quản lý ghế
    PERMISSIONS.XEM_GHE,
    PERMISSIONS.THEM_GHE,
    PERMISSIONS.SUA_GHE,
    PERMISSIONS.XOA_GHE,

    // Quyền quản lý khuyến mãi
    PERMISSIONS.XEM_KHUYEN_MAI,
    PERMISSIONS.THEM_KHUYEN_MAI,
    PERMISSIONS.SUA_KHUYEN_MAI,
    PERMISSIONS.XOA_KHUYEN_MAI,

    // Quyền quản lý suất chiếu
    PERMISSIONS.XEM_LICH_CHIEU,
    PERMISSIONS.THEM_LICH_CHIEU,
    PERMISSIONS.SUA_LICH_CHIEU,
    PERMISSIONS.XOA_LICH_CHIEU,

    // Quyền thống kê
    PERMISSIONS.XEM_THONG_KE,

    PERMISSIONS.XEM_VE,
    PERMISSIONS.XU_LY_VE,
  ],

  [ROLES.NHAN_VIEN]: [
    // Quyền quản lý vé
    PERMISSIONS.XEM_VE,
    PERMISSIONS.XU_LY_VE,

    // Quyền quản lý thức ăn
    PERMISSIONS.XEM_THUC_AN,
    PERMISSIONS.XU_LY_DON_THUC_AN,

    // Quyền xem cơ bản
    PERMISSIONS.XEM_PHIM,
    PERMISSIONS.XEM_LICH_CHIEU,
  ],

  [ROLES.KHACH_HANG]: [
    // Khách hàng chỉ có quyền xem
    PERMISSIONS.XEM_PHIM,
    PERMISSIONS.XEM_LICH_CHIEU,
    PERMISSIONS.XEM_GHE,
  ],
};

export const hasRole = (user, role) => {
  console.log("Checking role:", {
    userRole: user.ma_vai_tro,
    requiredRole: role,
  });
  if (!user) return false;
  return user.ma_vai_tro === role;
};

export const hasPermission = (user, permission) => {
  console.log("Checking permission for user:", {
    userRole: user.ma_vai_tro,
    permission,
  });
  if (!user || !user.ma_vai_tro) return false;

  // Lấy danh sách quyền của vai trò
  const permissions = ROLE_PERMISSIONS[user.ma_vai_tro] || [];
  return permissions.includes(permission);
};

export const canAccess = (user, requiredRole, requiredPermissions = []) => {
  if (!user) return false;

  // Kiểm tra vai trò nếu được yêu cầu
  if (requiredRole && !hasRole(user, requiredRole)) {
    return false;
  }

  // Kiểm tra tất cả quyền được yêu cầu
  if (requiredPermissions.length > 0) {
    return requiredPermissions.every((permission) =>
      hasPermission(user, permission)
    );
  }

  return true;
};
