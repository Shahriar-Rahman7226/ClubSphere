import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/edit_profile.css";
import dummy from "../assets/images/profiles/dummy.webp";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "Shafil",
    last_name: "Ahmed",
    institution_id: "CSE-2021-045",
    email: "rafi@student.edu",
    additional_email: "rafi.personal@gmail.com",
    department: "Computer Science & Engineering",
    dob: "2002-05-14",
    gender: "Male",
    blood_group: "O+",
    phone: "+8801712345678",
    profile_image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully");
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleResetPassword = () => {
    alert("Redirect to reset password page");
  };

  const handleSignOut = () => {
    alert("Sign out action triggered");
  };

  return (
    <>
      <Navbar />

      <div className="edit-profile-page">
        <div className="edit-profile-card">
          <h2 className="edit-profile-title">Edit Profile</h2>

          <form className="edit-profile-form" onSubmit={handleSubmit}>

            {/* Profile Image */}
            <div className="profile-image-section">
              <img
                src={
                  formData.profile_image
                    ? URL.createObjectURL(formData.profile_image)
                    : dummy
                }
                alt="Profile"
                className="profile-preview"
              />
              <input
                type="file"
                name="profile_image"
                id="profileImage"
                accept="image/*"
                onChange={handleChange}
                hidden
              />
              <label htmlFor="profileImage" className="upload-btn">
                Change Photo
              </label>
            </div>

            {/* Form Inputs */}
            <div className="form-grid">

              <div className="form-group">
                <label>First Name</label>
                <input name="first_name" value={formData.first_name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input name="last_name" value={formData.last_name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Institution ID</label>
                <input name="institution_id" value={formData.institution_id} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Additional Email</label>
                <input type="email" name="additional_email" value={formData.additional_email} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Department</label>
                <input name="department" value={formData.department} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Blood Group</label>
                <select name="blood_group" value={formData.blood_group} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} />
              </div>

            </div>

            {/* Save / Cancel Buttons */}
            <div className="edit-profile-buttons">
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </div>

            {/* Reset Password / Sign Out Buttons */}
            <div className="edit-profile-extra-buttons">
              <button type="button" className="reset-btn" onClick={() => navigate("/reset_password")}>
                Reset Password
              </button>
              <button type="button" className="signout-btn" onClick={() => navigate("/signin")}>
                Sign Out
              </button>
            </div>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditProfile;
