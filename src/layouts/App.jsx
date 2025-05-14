import React, { useState } from "react";
import "../App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import ShowDetail from "../pages/Home/show";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Confirmation from "../pages/Confirmation";
import TicketBooking from "../components/TicketBooking";
import Unauthorized from "../pages/Unauthorized";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhimDangChieu from "../pages/Home/PhimDangChieu";
import PhimSapChieu from "../pages/Home/PhimSapChieu";

// Import Dashboard và Layout
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ManageMovies from "../pages/Dashboard/ManageMovies";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ManageTickets from "../pages/Dashboard/ManageTickets";
import Statistics from "../pages/Dashboard/Statistics";
import Settings from "../pages/Dashboard/Settings";
import ManageShowtimes from "../pages/Dashboard/ManageShowtimes";
import CreateShowtimes from "../pages/Dashboard/Create/CreateShows";
import CreateTickets from "../pages/Dashboard/Create/CreateTickets";
import CreateUsers from "../pages/Dashboard/Create/CreateUsers";
import CreateMovies from "../pages/Dashboard/Create/CreateMovies";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import AccountManagement from "../pages/Dashboard/AccountManagement";
import MovieManagement from "../pages/Dashboard/MovieManagement";
import TheaterManagement from "../pages/Dashboard/TheaterManagement";

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com" },
    { id: 2, name: "Trần Thị B", email: "b@example.com" },
  ]);

  const addUser = (user) => {
    const newUser = { id: users.length + 1, ...user };
    setUsers([...users, newUser]);
  };

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

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="movies" element={<ManageMovies />} />
            <Route path="users" element={<ManageUsers users={users} />} />
            <Route path="tickets" element={<ManageTickets />} />
            <Route path="showtimes" element={<ManageShowtimes />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="settings" element={<Settings />} />

            {/* Routes Create */}
            <Route path="createMovies" element={<CreateMovies />} />
            <Route path="createShows" element={<CreateShowtimes />} />
            <Route path="createTickets" element={<CreateTickets />} />
            <Route
              path="createUser"
              element={<CreateUsers onAddUser={addUser} />}
            />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="accounts" element={<AccountManagement />} />
            <Route path="movies" element={<MovieManagement />} />
            <Route path="theaters" element={<TheaterManagement />} />
            <Route path="statistics" element={<Statistics />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
