import React from "react";
import "../assets/css/super_admin_dashboard.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { useNavigate } from "react-router-dom";

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="super-admin-wrapper">
      <Navbar />

      <div className="super-admin-container">
        {/* Welcome Section */}
        <div className="super-admin-welcome">
          <h1>Welcome, SuperAdmin!</h1>
          <p>Manage the platform from the dashboard below.</p>
        </div>

        {/* Management Buttons */}
        <div className="super-admin-buttons">
          <button
            className="super-admin-btn university-btn"
            onClick={() => navigate("/edit_university")}
          >
            University Management
          </button>

          <button
            className="super-admin-btn admin-btn"
            onClick={() => navigate("/admin_signup")}
          >
            Admin Management
          </button>

          <button
            className="super-admin-btn club-btn"
            onClick={() => navigate("/create_club")}
          >
            Club Management
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
