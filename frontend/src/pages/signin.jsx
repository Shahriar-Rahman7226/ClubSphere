import React, { useState } from "react";
import "../assets/css/signin.css";
import logo from "../assets/images/logo/logo.png"; // update to your correct logo path
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // axios instance like in Signup.jsx

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Login
      const response = await api.post("authentication/login/", formData);
      console.log("Login response:", response.data);

      // Save tokens
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      const userId = response.data.user_id;
      if (!userId) throw new Error("User ID not returned from backend.");

      // Step 2: Fetch user entity to get user_role
      const userResponse = await api.get(`users/user-registration/${userId}/`, {
        headers: {
          Authorization: `Bearer ${response.data.access}`,
        },
      });

      const userRole = userResponse.data.user_role;
      console.log("User role:", userRole);

      // Step 3: Navigate based on role
      if (userRole === "super_admin") {
        navigate("/super_admin_dashboard");
      } else if (userRole === "admin") {
        navigate("/admin_dashboard");
      } else {
        navigate("/student_dashboard");
      }

      alert(response.data.detail || "Login successful!");
    } catch (error) {
      console.error("Login error full:", error);
      alert(
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.message ||
        "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-box">
          <img src={logo} alt="ClubSphere Logo" className="signin-logo" />
          <h1 className="welcome-text">Welcome to ClubSphere</h1>
          <h2 className="signin-title">Sign In to Continue</h2>

          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="signin-footer">
            <p>
              Haven’t registered yet?{" "}
              <button
                className="signup-link"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </p>
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
