import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import "../assets/css/clubsphere_setup.css";
import api from "../api/api"; 

const Setup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await api.post("/authentication/superadmin-login/", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        setSuccess(response.data.detail || "Super admin login successful");
        navigate("/create_university");
      } else {
        setError("Unexpected response from server");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid credentials");
      } else if (err.request) {
        setError("No response from server");
      } else {
        setError("Error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-box">
          <h2 className="welcome-text">Welcome to ClubSphere</h2>
          <p className="signin-title">Please enter your credentials</p>

          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter username"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}

            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? "Processing..." : "Proceed"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setup;
