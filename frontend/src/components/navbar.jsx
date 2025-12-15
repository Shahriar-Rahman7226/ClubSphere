import React, { useState } from "react";
import "../assets/css/navbar.css";
import logo from "../assets/images/logo/logo.png";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Dynamically decide home link based on current role path
  let homeLink = "/"; // default fallback
  if (location.pathname.startsWith("/admin")) homeLink = "/super_admin_dashboard";
  else if (location.pathname.startsWith("/tutor")) homeLink = "/admin_dashboard";
  else if (location.pathname.startsWith("/student")) homeLink = "/student_dashboard";

  // Dummy clubs
  const clubs = [
    { id: 1, name: "Coding Club", link: "/club_homepage" },
    { id: 2, name: "Art Club", link: "/club_homepage" },
    { id: 3, name: "Music Club", link: "/club_homepage" },
    { id: 4, name: "Debate Club", link: "/club_homepage" },
    { id: 5, name: "Drama Club", link: "/club_homepage" },
    { id: 6, name: "Robotics Club", link: "/club_homepage" },
  ];

  return (
    <>
      <nav className="admin_navbar">
        <div className="admin_navbar_left">
          <img
            src={logo}
            alt="Logo"
            className="admin_navbar_logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
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
          <FaBell className="admin_navbar_icon" 
          title="Notifications" />
          <FaUserCircle
            className="admin_profile_icon"
             onClick={() => navigate("/edit_profile")}
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
