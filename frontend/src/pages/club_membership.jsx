// ===============================
// clubrecruitment.jsx
// ===============================

import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/club_membership.css";

export default function ClubRecruitment() {
  // Flag for ongoing recruitment
  const ongoingRecruitment = true;

  // Recruitment data
  const recruitment = {
    name: "Summer 2025 Recruitment",
    startDate: "2025-06-10",
    endDate: "2025-07-05",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
  };

  return (
    <div className="club-recruitment-page">
      <Navbar />

      <div className="recruitment-container">
        {ongoingRecruitment ? (
          <div className="recruitment-card">
            <h2 className="recruitment-title">
              🎉 {recruitment.name} is ongoing. <br /> Register now!
            </h2>

            <div className="recruitment-dates">
              <p><strong>Start Date:</strong> {recruitment.startDate}</p>
              <p><strong>End Date:</strong> {recruitment.endDate}</p>
              {/* <p><strong>Start Time:</strong> {recruitment.startTime}</p> */}
              {/* <p><strong>End Time:</strong> {recruitment.endTime}</p> */}
            </div>

            <button className="view-form-btn">View Recruitment Form</button>

            <p className="recruitment-note">
              * For any queries regarding this recruitment, please visit our club.
            </p>
          </div>
        ) : (
          <p className="no-recruitment">No ongoing recruitments at the moment.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
