import React, { useState } from "react";
import "../assets/css/navbar.css";
import logo from "../assets/images/logo/logo.png";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  // Dynamically decide home link based on current role path
  let homeLink = "/"; // default fallback
  if (location.pathname.startsWith("/admin")) homeLink = "/super_admin";
  else if (location.pathname.startsWith("/tutor")) homeLink = "/admin";
  else if (location.pathname.startsWith("/student")) homeLink = "/student";

  // Dummy clubs
  const clubs = [
    { id: 1, name: "Coding Club", link: "/clubs/1" },
    { id: 2, name: "Art Club", link: "/clubs/2" },
    { id: 3, name: "Music Club", link: "/clubs/3" },
    { id: 4, name: "Debate Club", link: "/clubs/4" },
    { id: 5, name: "Drama Club", link: "/clubs/5" },
    { id: 6, name: "Robotics Club", link: "/clubs/6" },
  ];

  return (
    <>
      <nav className="admin_navbar">
        <div className="admin_navbar_left">
          <Link to={homeLink}>
            <img src={logo} alt="Logo" className="admin_navbar_logo" />
          </Link>
        </div>

        <div className="admin_navbar_center">
          <Link to={homeLink} className="nav_link">
            Home
          </Link>

          <div
            className="nav_link clubs-dropdown-container"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            Clubs
            {showDropdown && (
              <div className="clubs-dropdown">
                {clubs.map((club) => (
                  <Link
                    key={club.id}
                    to={club.link}
                    className="clubs-dropdown-item"
                  >
                    {club.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/about" className="nav_link">
            About
          </Link>
        </div>

        <div className="admin_navbar_right">
          <FaBell className="admin_navbar_icon" title="Notifications" />
          <FaUserCircle
            className="admin_profile_icon"
            title="Profile"
            size={36}
          />
        </div>
      </nav>
      <div className="admin_navbar_spacer"></div>
    </>
  );
};

export default AdminNavbar;
