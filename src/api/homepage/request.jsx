import axios from "../axios";

const END_POINT = {
  PHIM: "phim",
  CHITIETPHIM: "suatchieu/phim",
  LOAIVE: "loaive",
  DSGHE: "phong/dsghe",
  RAP: "rap",
  PHONG: "phong",
  BOOKING: "ve",
  DVANUONG: "dichvuanuong",
};

export const getPhimAPI = async () => {
  try {
    const response = await axios({
      url: END_POINT.PHIM,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phim:", error);
    throw error;
  }
};

export const getChiTietPhimAPI = async (ma_phim) => {
  try {
    const response = await axios({
      url: `${END_POINT.PHIM}/${ma_phim}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết phim:", error);
    throw error;
  }
};

export const getLoaiVeAPI = async () => {
  try {
    const response = await axios({
      url: END_POINT.LOAIVE,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách loại vé:", error);
    throw error;
  }
};

export const getRapSCAPI = async (ma_phim) => {
  try {
    const response = await axios({
      url: `${END_POINT.CHITIETPHIM}/${ma_phim}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin suất chiếu rạp:", error);
    throw error;
  }
};

export const getDSGHEAPI = async (ma_phong) => {
  return await axios({
    url: `${END_POINT.DSGHE}/${ma_phong}`,
    method: "GET",
  });
};

export const getRapAPI = async (ma_rap) => {
  return await axios({
    url: `${END_POINT.RAP}/${ma_rap}`,
    method: "GET",
  });
};

export const getPhongAPI = async (ma_phong) => {
  try {
    const response = await axios({
      url: `${END_POINT.PHONG}/${ma_phong}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin phòng:", error);
    throw error;
  }
};

export const postBooKingAPI = async (bookingData) => {
  try {
    const response = await axios({
      url: END_POINT.BOOKING,
      method: "POST",
      data: bookingData,
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi đặt vé:", error);
    throw error;
  }
};

export const getDVAnUongAPI = async () => {
  try {
    const response = await axios({
      url: END_POINT.DVANUONG,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dịch vụ ăn uống:", error);
    throw error;
  }
};
