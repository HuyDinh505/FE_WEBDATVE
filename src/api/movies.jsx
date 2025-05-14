import axiosInstance from "./axios";

const moviesAPI = {
  getAll: () => axiosInstance.get("/movies"),
  getById: (id) => axiosInstance.get(`/movies/${id}`),
  create: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    return axiosInstance.post("/movies", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update: (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    return axiosInstance.post(`/movies/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  delete: (id) => axiosInstance.delete(`/movies/${id}`),
};

export default moviesAPI;
