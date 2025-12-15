import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/recruitment_management.css";

const RecruitmentManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="recruitment-management-page">
      <Navbar />

      <div className="recruitment-management-container">
        <h1 className="recruitment-management-title">Recruitment Management</h1>
        <p className="recruitment-management-subtitle">
          Manage your recruitment activities. You can create new recruitments or edit existing ones.
        </p>

        <div className="recruitment-buttons-container">
          <button
            className="recruitment-btn create-btn"
            onClick={() => navigate("/create_recruitment")}
          >
            Create Recruitment
          </button>
          <button
            className="recruitment-btn edit-btn"
            onClick={() => navigate("/edit_recruitment")}
          >
            Edit Recruitment
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RecruitmentManagement;
