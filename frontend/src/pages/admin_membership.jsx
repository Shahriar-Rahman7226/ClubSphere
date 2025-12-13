import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/admin_membership.css";

const MEMBERSHIP_STATUSES = ["CURRENT", "PENDING", "FORMER", "REJECTED"];

const sampleMembers = [
  {
    id: 1,
    first_name: "Shahriar",
    last_name: "Rafi",
    club_position: "President",
    additional_club_position: "Event Lead",
    recruitment_semester: "Fall 2024",
    status: "CURRENT",
  },
  {
    id: 2,
    first_name: "Ayesha",
    last_name: "Rahman",
    club_position: "Secretary",
    additional_club_position: "",
    recruitment_semester: "Spring 2024",
    status: "PENDING",
  },
  {
    id: 3,
    first_name: "Tanvir",
    last_name: "Hasan",
    club_position: "Member",
    additional_club_position: "",
    recruitment_semester: "Fall 2023",
    status: "FORMER",
  },
  {
    id: 4,
    first_name: "Nabila",
    last_name: "Islam",
    club_position: "Treasurer",
    additional_club_position: "Finance Lead",
    recruitment_semester: "Spring 2025",
    status: "REJECTED",
  },
];

const AdminMembership = () => {
  const [activeFilter, setActiveFilter] = useState("CURRENT");

  const filteredMembers = sampleMembers.filter(
    (member) => member.status === activeFilter
  );

  return (
    <div className="admin-membership-page">
      <Navbar />

      {/* Filters */}
      <div className="membership-filter-bar">
        {MEMBERSHIP_STATUSES.map((status) => (
          <button
            key={status}
            className={`membership-filter-btn ${
              activeFilter === status ? "active" : ""
            }`}
            onClick={() => setActiveFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Members */}
      <section className="membership-section">
        <h2 className="membership-title">
          {activeFilter.toLowerCase()} members
        </h2>

        {filteredMembers.map((member) => (
          <div className="membership-card" key={member.id}>
            <div className="membership-name">
              {member.first_name} {member.last_name}
            </div>

            <div className="membership-info">
              <span>
                <strong>Club Position:</strong> {member.club_position}
              </span>

              <span>
                <strong>Additional Position:</strong>{" "}
                {member.additional_club_position || ""}
              </span>

              <span>
                <strong>Semester:</strong> {member.recruitment_semester}
              </span>
            </div>

            <span className={`membership-status ${member.status.toLowerCase()}`}>
              {member.status}
            </span>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default AdminMembership;
