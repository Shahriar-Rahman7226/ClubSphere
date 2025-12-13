import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/admin_recruitment.css";

/* Sample Recruitment Data */
const sampleRecruitments = [
  {
    id: 1,
    title: "Summer 2025 Recruitment",
    description: "Join our club and grow your leadership and technical skills.",
    semester: "Fall 2025",
    start_date: "2025-01-10",
    end_date: "2025-01-25",
    status: "ongoing",
  },
  {
    id: 2,
    title: "Fall 2024 Recruitment",
    description: "Previous semester recruitment drive.",
    semester: "Summer 2024",
    start_date: "2024-08-05",
    end_date: "2024-08-20",
    status: "completed",
  },
];

const AdminRecruitment = () => {
  const [filter, setFilter] = useState("ongoing");

  const filteredRecruitments = sampleRecruitments.filter(
    (rec) => rec.status === filter
  );

  return (
    <div className="admin-recruitment-page">
      <Navbar />

      {/* Create Recruitment */}
      <div className="create-recruitment-container">
        <button className="create-recruitment-button">
          + Create Recruitment
        </button>
      </div>

      {/* Filters */}
      <div className="recruitment-filters">
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

        <button
          className={`filter-btn ${filter === "ongoing" ? "active" : ""}`}
          onClick={() => setFilter("ongoing")}
        >
          Ongoing
        </button>
      </div>

      {/* Recruitment Section */}
      <section className="admin-recruitment-section">
        {filteredRecruitments.map((rec) => (
          <div className="admin-recruitment-card" key={rec.id}>
            <h3 className="admin-recruitment-heading">{rec.title}</h3>

            <p className="admin-recruitment-description">
              {rec.description}
            </p>

            <div className="admin-recruitment-meta">
              <span className="meta-item">
                <strong>Semester:</strong> {rec.semester}
              </span>
              <span className="meta-item">
                <strong>Start Date:</strong> {rec.start_date}
              </span>
              <span className="meta-item">
                <strong>End Date:</strong> {rec.end_date}
              </span>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default AdminRecruitment;
