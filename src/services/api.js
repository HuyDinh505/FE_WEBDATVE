import axios from "axios";

// const API_URL = "http://localhost:8000/api";
const API_URL = "https://be-web-datve-1.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email, matKhau) => api.post("/login", { email, matKhau }),
  register: (data) => api.post("/register", data),
  logout: () => api.post("/logout"),
  getCurrentUser: () => api.get("/user"),
};

// Users API
export const getUsers = () => api.get("/users");
export const createUser = (data) => api.post("/users", data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Movies API
export const getMovies = () => api.get("/movies");
export const createMovie = (data) => api.post("/movies", data);
export const updateMovie = (id, data) => api.put(`/movies/${id}`, data);
export const deleteMovie = (id) => api.delete(`/movies/${id}`);

// Theaters API
export const getTheaters = () => api.get("/rap");
export const createTheater = (data) => api.post("/rap", data);
export const updateTheater = (id, data) => {
  return api.post(`/rap/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const deleteTheater = (id) => api.delete(`/rap/${id}`);

// Showtimes API
export const showtimesAPI = {
  getAll: () => api.get("/showtimes"),
  getById: (id) => api.get(`/showtimes/${id}`),
  create: (data) => api.post("/showtimes", data),
  update: (id, data) => api.put(`/showtimes/${id}`, data),
  delete: (id) => api.delete(`/showtimes/${id}`),
};

// Statistics API
export const getStatistics = () => api.get("/dashboard/statistics");
export const getRevenueByDateRange = (startDate, endDate) =>
  api.get("/dashboard/revenue", { params: { startDate, endDate } });
export const getMovieStatistics = () => api.get("/dashboard/movies");
export const getTheaterStatistics = () => api.get("/statistics/theaters");

// Manager APIs
export const managerAPI = {
  // Dashboard
  getDashboardData: () => api.get("/manager/dashboard"),

  // Movies
  getMovies: () => api.get("/phim"),
  createMovie: (data) =>
    api.post("/phim", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  updateMovie: (id, data) => {
    data.append("_method", "PUT");
    return api.post(`/phim/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteMovie: (id) => api.delete(`/phim/${id}`),

  // Theaters
  getTheaters: () => api.get("/rap"),
  createTheater: (data) => api.post("/rap", data),
  updateTheater: (id, data) => {
    return api.post(`/rap/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  deleteTheater: (id) => api.delete(`/rap/${id}`),

  // Staff
  getStaff: () => api.get("/nhan-vien"),
  createStaff: (data) => api.post("/nhan-vien", data),
  updateStaff: (id, data) => api.put(`/nhan-vien/${id}`, data),
  deleteStaff: (id) => api.delete(`/nhan-vien/${id}`),

  // Rooms
  getRooms: () => api.get("/phong"),
  createRoom: (data) => api.post("/phong", data),
  updateRoom: (id, data) => api.put(`/phong/${id}`, data),
  deleteRoom: (id) => api.delete(`/phong/${id}`),

  // Seats
  getSeats: () => api.get("/ghe"),
  getSeatsByRoom: (roomId) => api.get(`/phong/dsghe/${roomId}`),
  createSeat: (data) => api.post("/ghe", data),
  updateSeat: (id, data) => api.put(`/ghe/${id}`, data),
  deleteSeat: (id) => api.delete(`/ghe/${id}`),

  // Promotions
  getPromotions: () => api.get("/khuyen-mai"),
  createPromotion: (data) => api.post("/khuyen-mai", data),
  updatePromotion: (id, data) => api.put(`/khuyen-mai/${id}`, data),
  deletePromotion: (id) => api.delete(`/khuyen-mai/${id}`),

  // Showtimes
  getShowtimes: () => api.get("/suatchieu"),
  createShowtime: (data) => api.post("/suatchieu", data),
  updateShowtime: (id, data) => api.put(`/suatchieu/${id}`, data),
  deleteShowtime: (id) => api.delete(`/suatchieu/${id}`),

  // Ticket Types
  getTicketTypes: () => api.get("/loaive"),
  createTicketType: (data) => api.post("/loaive", data),
  updateTicketType: (id, data) => api.put(`/loaive/${id}`, data),
  deleteTicketType: (id) => api.delete(`/loaive/${id}`),

  // Tickets
  getTickets: () => api.get("/ve"),
  getStaffTickets: () => api.get("/staff/ve"),
  getManagerTickets: () => api.get("/manager/ve"),
  getTicketById: (id) => api.get(`/ve/${id}`),
  createTicket: (data) => api.post("/ve", data),
  updateTicketStatus: (id, status, role) => {
    if (role === 2) {
      // Quản lý
      return api.put(`/manager/ve/${id}`, status);
    } else if (role === 3) {
      // Nhân viên
      return api.put(`/staff/ve/${id}`, status);
    }
    return api.put(`/ve/${id}`, status);
  },

  // Food Service
  getFoodOrders: () => api.get("/dichvuanuong"),
  getFoodServices: () => api.get("/dichvuanuong"),
  createFoodService: (data) =>
    api.post("/dichvuanuong", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  updateFoodService: (id, data) => {
    data.append("_method", "PUT");
    return api.post(`/dichvuanuong/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteFoodService: (id) => api.delete(`/dichvuanuong/${id}`),

  // Statistics
  getRevenueStats: () => api.get("/thong-ke/doanh-thu"),
  getMovieStats: () => api.get("/thong-ke/phim"),
  getOverallStats: () => api.get("/thong-ke/tong-quan"),
};

// Error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      // Handle 403 Forbidden
      if (error.response.status === 403) {
        window.location.href = "/unauthorized";
      }
    }
    return Promise.reject(error);
  }
);

export const getRoles = () => api.get("/vai-tro");

export default api;
