import React from "react";
import "../assets/css/super_admin_dashboard.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

export default function SuperAdminDashboard() {
  return (
    <div className="admin-dashboard-page">
      <Navbar />

      <div className="admin-dashboard-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome, SuperAdmin!</h1>
          <p>Manage the platform from the dashboard below.</p>
        </div>

        {/* Management Buttons */}
        <div className="admin-buttons-container">
          <button className="admin-btn club-btn">University Management</button>
          <button className="admin-btn post-btn">Admin Management</button>
          <button className="admin-btn event-btn">Club Management</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
