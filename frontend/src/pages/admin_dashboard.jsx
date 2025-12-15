import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/admin_dashboard.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-wrapper">
      <Navbar />

      <div className="dashboard-container">
        {/* Welcome Section */}
        <div className="dashboard-welcome">
          <h1>Welcome, Shahriar!</h1>
          <p>Manage your club activities from the dashboard below.</p>
        </div>

        {/* Management Buttons */}
        <div className="dashboard-buttons">
          <button
            className="dashboard-btn club-management"
            onClick={() => navigate("/edit_club")}
          >
            Club Management
          </button>

          <button
            className="dashboard-btn post-management"
            onClick={() => navigate("/post_management")}
          >
            Post Management
          </button>

          <button
            className="dashboard-btn event-management"
            onClick={() => navigate("/event_management")}
          >
            Event Management
          </button>

          <button
            className="dashboard-btn member-management"
            onClick={() => navigate("/member_management")}
          >
            Member Management
          </button>

          <button
            className="dashboard-btn recruitment-management"
            onClick={() => navigate("/recruitment_management")}
          >
            Recruitment Management
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
