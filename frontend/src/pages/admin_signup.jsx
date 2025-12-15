import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import api from "../api/api";
import "../assets/css/admin_signup.css"; // using your existing signup CSS for background

const GENDER_OPTIONS = [
  { value: "", label: "Select Gender" },
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    institution_id: "",
    email: "",
    additional_email: "",
    phone_number: "",
    department: "",
    description: "",
    DOB: "",
    profile_image: null,
    gender: "",
    blood_group: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [universityId, setUniversityId] = useState(null);

  useEffect(() => {
    const fetchUserUniversity = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await api.get("users/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUniversityId(response.data.university);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        alert("Failed to get your university. Please login again.");
      }
    };
    fetchUserUniversity();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    if (!universityId) {
      alert("University not determined. Cannot create admin.");
      return;
    }

    const data = new FormData();
    data.append("university", universityId);
    for (let key in formData) {
      if (formData[key] !== null && formData[key] !== "") data.append(key, formData[key]);
    }

    setLoading(true);
    try {
      const response = await api.post("users/create-admin/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Admin account created successfully!");
      setFormData({
        first_name: "",
        last_name: "",
        institution_id: "",
        email: "",
        additional_email: "",
        phone_number: "",
        department: "",
        description: "",
        DOB: "",
        profile_image: null,
        gender: "",
        blood_group: "",
        password: "",
        confirm_password: "",
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to create admin. " + (error.response?.data?.detail || "Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-page">
        <div className="signup-card">
          <h2 className="signup-title">Create Admin Account</h2>
          <p className="signup-subtitle">Create an admin account for your university.</p>

          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Row: First & Last Name */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name">First Name <span className="required">*</span></label>
                <input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name <span className="required">*</span></label>
                <input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            {/* Institution ID */}
            <div className="form-group">
              <label htmlFor="institution_id">Institution ID <span className="required">*</span></label>
              <input
                id="institution_id"
                name="institution_id"
                value={formData.institution_id}
                onChange={handleChange}
                placeholder="Institution ID"
                required
              />
            </div>

            {/* Row: Email & Additional Email */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Primary email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="additional_email">Additional Email</label>
                <input
                  id="additional_email"
                  name="additional_email"
                  type="email"
                  value={formData.additional_email}
                  onChange={handleChange}
                  placeholder="Additional email"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="+8801XXXXXXXXX"
              />
            </div>

            {/* Department */}
            <div className="form-group">
              <label htmlFor="department">Department <span className="required">*</span></label>
              <input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                rows={3}
              />
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label htmlFor="DOB">Date of Birth</label>
              <input
                id="DOB"
                name="DOB"
                type="date"
                value={formData.DOB}
                onChange={handleChange}
              />
            </div>

            {/* Profile Image */}
            <div className="form-group">
              <label htmlFor="profile_image">Profile Image</label>
              <div className="profile-image-box">
                <input
                  id="profile_image"
                  name="profile_image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
                <span className="file-label">
                  {formData.profile_image ? formData.profile_image.name : "Choose File"}
                </span>
              </div>
            </div>

            {/* Gender */}
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                {GENDER_OPTIONS.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Blood Group (Optional) */}
            <div className="form-group">
              <label htmlFor="blood_group">Blood Group</label>
              <input
                id="blood_group"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>

            {/* Password */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password <span className="required">*</span></label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password <span className="required">*</span></label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`signup-button ${loading ? "disabled" : ""}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Create Admin"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
