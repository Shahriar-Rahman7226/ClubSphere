import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/super_admin_signup.css";
import logo from "../assets/images/logo/logo.png"; 
import api from "../api/api"; 

const GENDER_OPTIONS = [
  { value: "", label: "Select Gender" },
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

const BLOOD_GROUP_OPTIONS = [
  { value: "", label: "Select Blood Group" },
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    university: "",
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

  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await api.get("university/university/");
        setUniversities(response.data);
      } catch (error) {
        console.error("Failed to fetch universities:", error.response || error.message);
      }
    };
    fetchUniversities();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) data.append(key, formData[key]);
    }

    setLoading(true);
    try {
      const response = await api.post("users/create-super-admin/", data, {
        headers: { "Content-Type": "multipart/form-data" }, 
      });
      alert("Account created successfully!");
      setFormData({
        university: "",
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

      navigate("/signin"); // Redirect to Sign In page after successful signup
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(
        "Failed to create account. " +
          (error.response?.data?.detail || "Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <img src={logo} alt="Logo" className="signup-logo" />
        <h2 className="signup-title">Create Your Account</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="university">University <span className="required">*</span></label>
            <select
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
              style={{ color: "#002861" }}
            >
              <option value="">Select University</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.title}
                </option>
              ))}
            </select>
          </div>

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

          <div className="form-group">
            <label htmlFor="blood_group">Blood Group</label>
            <select
              id="blood_group"
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
            >
              {BLOOD_GROUP_OPTIONS.map((bg) => (
                <option key={bg.value} value={bg.value}>
                  {bg.label}
                </option>
              ))}
            </select>
          </div>

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
            {loading ? "Submitting..." : "Sign Up"}
          </button>

          <p className="signin-link">
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
