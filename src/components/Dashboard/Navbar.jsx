import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Đăng xuất...");
    handleCloseMenu();
  };

  return (
    <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="relative flex items-center space-x-4 cursor-pointer">
        <span className="hidden md:block font-medium">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="Admin Avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-300"
          onClick={handleOpenMenu}
        />

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" /> Đăng xuất
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
