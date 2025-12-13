import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/reset_password.css";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call here
    alert("Password reset submitted");
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <>
      <Navbar />

      <div className="reset-password-page">
        <div className="reset-password-card">
          <h2 className="reset-password-title">Reset Password</h2>

          <form className="reset-password-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Old Password</label>
              <input
                type="password"
                name="old_password"
                value={formData.old_password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="reset-password-buttons">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button type="submit" className="save-btn">
                Save Password
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ResetPassword;
