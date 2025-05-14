import React from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ShowDetail from "./pages/Home/show";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Confirmation from "./pages/Confirmation";
import TicketBooking from "./components/TicketBooking";
import Unauthorized from "./pages/Unauthorized";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhimDangChieu from "./pages/Home/PhimDangChieu";
import PhimSapChieu from "./pages/Home/PhimSapChieu";
import MyTickets from "./pages/MyTickets";
import Profile from "./pages/Profile";

// Import Layouts
import AdminLayout from "./layouts/AdminLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import StaffLayout from "./layouts/StaffLayout";

// Import Role Routes
import { AdminRoute, ManagerRoute, StaffRoute } from "./components/RoleRoutes";

// Import Admin Components
import {
  AdminDashboard,
  AccountManagement,
  MovieManagement,
  TheaterManagement,
  Statistics,
} from "./pages/Admin";

// Import Manager Components
import {
  ManagerDashboard,
  ManageTheaters,
  ManageStaff,
  ManageRooms,
  ManageSeats,
  ManageShowtimes,
  ManagerStatistics,
  ManageTickets,
} from "./pages/Manager";

// Import Staff Components
import {
  StaffDashboard,
  TicketManagement,
  FoodManagement,
} from "./pages/Staff";

import { PERMISSIONS } from "./utils/auth";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="/phim-dang-chieu"
            element={
              <>
                <Navbar />
                <PhimDangChieu />
                <Footer />
              </>
            }
          />
          <Route
            path="/phim-sap-chieu"
            element={
              <>
                <Navbar />
                <PhimSapChieu />
                <Footer />
              </>
            }
          />
          <Route
            path="/phim/:ma_phim"
            element={
              <>
                <Navbar />
                <ShowDetail />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <Register />
                <Footer />
              </>
            }
          />
          <Route
            path="/ticket-booking/:id"
            element={
              <>
                <Navbar />
                <TicketBooking />
                <Footer />
              </>
            }
          />
          <Route
            path="/confirmation"
            element={
              <>
                <Navbar />
                <Confirmation />
                <Footer />
              </>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/my-tickets"
            element={
              <>
                <Navbar />
                <MyTickets />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <Profile />
                <Footer />
              </>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute requiredPermissions={[PERMISSIONS.XEM_THONG_KE]}>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route
              path="accounts"
              element={
                <AdminRoute requiredPermissions={[PERMISSIONS.XEM_NGUOI_DUNG]}>
                  <AccountManagement />
                </AdminRoute>
              }
            />
            <Route
              path="movies"
              element={
                <AdminRoute requiredPermissions={[PERMISSIONS.XEM_PHIM]}>
                  <MovieManagement />
                </AdminRoute>
              }
            />
            <Route
              path="theaters"
              element={
                <AdminRoute requiredPermissions={[PERMISSIONS.XEM_RAP]}>
                  <TheaterManagement />
                </AdminRoute>
              }
            />
            <Route
              path="statistics"
              element={
                <AdminRoute requiredPermissions={[PERMISSIONS.XEM_THONG_KE]}>
                  <Statistics />
                </AdminRoute>
              }
            />
          </Route>

          {/* Manager Routes */}
          <Route
            path="/manager"
            element={
              <ManagerRoute requiredPermissions={[PERMISSIONS.XEM_RAP]}>
                <ManagerLayout />
              </ManagerRoute>
            }
          >
            <Route index element={<ManagerDashboard />} />
            <Route
              path="theaters"
              element={
                <ManagerRoute requiredPermissions={[PERMISSIONS.XEM_RAP]}>
                  <ManageTheaters />
                </ManagerRoute>
              }
            />
            <Route
              path="staff"
              element={
                <ManagerRoute
                  requiredPermissions={[PERMISSIONS.XEM_NGUOI_DUNG]}
                >
                  <ManageStaff />
                </ManagerRoute>
              }
            />
            <Route
              path="rooms"
              element={
                <ManagerRoute requiredPermissions={[PERMISSIONS.XEM_RAP]}>
                  <ManageRooms />
                </ManagerRoute>
              }
            />
            <Route
              path="seats"
              element={
                <ManagerRoute requiredPermissions={[PERMISSIONS.XEM_RAP]}>
                  <ManageSeats />
                </ManagerRoute>
              }
            />
            <Route
              path="showtimes"
              element={
                <ManagerRoute
                  requiredPermissions={[PERMISSIONS.XEM_LICH_CHIEU]}
                >
                  <ManageShowtimes />
                </ManagerRoute>
              }
            />
            <Route
              path="statistics"
              element={
                <ManagerRoute requiredPermissions={[PERMISSIONS.XEM_THONG_KE]}>
                  <ManagerStatistics />
                </ManagerRoute>
              }
            />
            <Route
              path="tickets"
              element={
                <ManagerRoute requiredPermissions={[PERMISSIONS.XEM_VE]}>
                  <ManageTickets />
                </ManagerRoute>
              }
            />
          </Route>

          {/* Staff Routes */}
          <Route
            path="/staff"
            element={
              <StaffRoute requiredPermissions={[PERMISSIONS.XEM_LICH_CHIEU]}>
                <StaffLayout />
              </StaffRoute>
            }
          >
            <Route index element={<StaffDashboard />} />
            <Route
              path="tickets"
              element={
                <StaffRoute requiredPermissions={[PERMISSIONS.XEM_VE]}>
                  <TicketManagement />
                </StaffRoute>
              }
            />
            <Route
              path="food"
              element={
                <StaffRoute requiredPermissions={[PERMISSIONS.XEM_LICH_CHIEU]}>
                  <FoodManagement />
                </StaffRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
