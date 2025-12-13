import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/edit_club.css";

const ClubManagement = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    email: "",
    logo: null,
    banner: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Save club changes (API integration pending)");
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="club-management-page">
      <Navbar />

      <div className="club-management-card">
        <h2 className="club-management-title">Club Management</h2>

        <form className="club-management-form" onSubmit={handleSave}>
          {/* Club Title */}
          <div className="form-group">
            <label>Club Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter club title"
            />
          </div>

          {/* Club Description */}
          <div className="form-group">
            <label>Club Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter club description"
            />
          </div>

          {/* Club Email */}
          <div className="form-group">
            <label>Club Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="club@email.com"
            />
          </div>

          {/* Club Logo */}
          <div className="form-group">
            <label>Club Logo</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="clubLogo"
                name="logo"
                accept="image/*"
                onChange={handleChange}
              />
              <label htmlFor="clubLogo" className="file-upload-btn">
                Upload Logo
              </label>
              {formData.logo && (
                <span className="file-name">{formData.logo.name}</span>
              )}
            </div>
          </div>

          {/* Club Banner */}
          <div className="form-group">
            <label>Club Banner</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="clubBanner"
                name="banner"
                accept="image/*"
                onChange={handleChange}
              />
              <label htmlFor="clubBanner" className="file-upload-btn">
                Upload Banner
              </label>
              {formData.banner && (
                <span className="file-name">{formData.banner.name}</span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="club-management-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default ClubManagement;
