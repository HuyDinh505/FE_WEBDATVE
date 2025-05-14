import axiosInstance from "./axios";

export const getPhimDangChieu = () => {
  return axiosInstance.get("/phim-dang-chieu");
};

export const getPhimSapChieu = () => {
  return axiosInstance.get("/phim-sap-chieu");
};

export const getPhimById = (ma_phim) => {
  return axiosInstance.get(`/phim/${ma_phim}`);
};
