import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/signin.css";
import logo from "../assets/images/logo/logo.png";
import api from "../api/api";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("users/login/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const user = response.data.user; // assuming backend returns user info
      const token = response.data.token; // assuming JWT or token
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", user.user_role);
      localStorage.setItem("userName", user.first_name);

      // Redirect based on user role
      if (user.user_role === "SUPER_ADMIN") {
        navigate("/superadmin_dashboard");
      } else if (user.user_role === "ADMIN") {
        navigate("/admin_dashboard");
      } else {
        navigate("/dashboard"); // general dashboard
      }
    } catch (err) {
      if (err.response) setError(err.response.data.detail || "Login failed");
      else setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <img src={logo} alt="Logo" className="signin-logo" />
        <h2 className="signin-title">Sign In to ClubSphere</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button
            type="submit"
            className={`signin-button ${loading ? "disabled" : ""}`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
