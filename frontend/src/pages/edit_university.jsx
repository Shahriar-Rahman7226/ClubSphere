import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/edit_university.css";

const EditUniversity = () => {
  const [university, setUniversity] = useState({
    name: "Brac University",
    email_domain: "bracu.ac.bd",
    logo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUniversity({ ...university, [name]: value });
  };

  const handleFileChange = (e) => {
    setUniversity({ ...university, logo: e.target.files[0] });
  };

  const handleSave = () => {
    alert("University updated successfully!");
  };

  const handleCancel = () => {
    alert("Edit canceled!");
  };

  return (
    <>
      <Navbar />

      <div className="edit-university-page">
        <div className="edit-university-card">
          <h2 className="edit-university-title">Edit University</h2>

          <div className="edit-university-form">
            {/* University Name */}
            <div className="form-group">
              <label>University Name</label>
              <input
                type="text"
                name="name"
                value={university.name}
                onChange={handleInputChange}
                placeholder="Enter University Name"
              />
            </div>

            {/* Email Domain */}
            <div className="form-group">
              <label>Email Domain</label>
              <input
                type="text"
                name="email_domain"
                value={university.email_domain}
                onChange={handleInputChange}
                placeholder="Enter Email Domain"
              />
            </div>

            {/* University Logo */}
            <div className="form-group">
              <label>University Logo</label>
              <input
                type="file"
                name="logo"
                onChange={handleFileChange}
              />
            </div>

            {/* Buttons */}
            <div className="form-buttons">
           
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
                 <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditUniversity;
