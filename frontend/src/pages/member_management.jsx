import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/member_management.css";

export default function MemberManagement() {
  return (
    <div className="member-management-page">
      <Navbar />

      <div className="member-management-container">
        <h1 className="member-management-title">Member Management</h1>

        <div className="wip-tile">
          <h2>Work in Progress</h2>
          <p>The Member Management module is currently under development.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
