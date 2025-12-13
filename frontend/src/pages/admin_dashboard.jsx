import React from "react";
import "../assets/css/admin_dashboard.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard-page">
      <Navbar />

      <div className="admin-dashboard-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome, Shahriar!</h1>
          <p>Manage your club activities from the dashboard below.</p>
        </div>

        {/* Management Buttons */}
        <div className="admin-buttons-container">
          <button className="admin-btn club-btn">Club Management</button>
          <button className="admin-btn post-btn">Post Management</button>
          <button className="admin-btn event-btn">Event Management</button>
          <button className="admin-btn member-btn">Member Management</button>
          <button className="admin-btn recruitment-btn">Recruitment Management</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
