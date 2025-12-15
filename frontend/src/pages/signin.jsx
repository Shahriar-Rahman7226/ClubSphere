import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/signin.css";
import logo from "../assets/images/logo/logo.png"; // update path if needed
import api from "../api/api";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Optional: Prevent back button navigation after sign in
  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const handleBackButton = (e) => {
    window.history.pushState(null, document.title, window.location.href);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Step 1: Login
      const response = await api.post("authentication/login/", formData);
      const { access, refresh, user_id } = response.data;

      if (!user_id) throw new Error("User ID not returned from backend.");

      // Save tokens
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Step 2: Fetch user to get role
      const userResponse = await api.get(`users/user-registration/${user_id}/`, {
        headers: { Authorization: `Bearer ${access}` },
      });

      const userRole = userResponse.data.user_role.toLowerCase();

      // Save user info locally if needed
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("userName", userResponse.data.first_name);

      // Step 3: Navigate based on role and prevent back navigation
      if (userRole === "super_admin") navigate("/super_admin_dashboard", { replace: true });
      else if (userRole === "admin") navigate("/admin_dashboard", { replace: true });
      else navigate("/student_dashboard", { replace: true });

    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
        err.response?.data?.detail ||
        err.message ||
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

          {error && <p className="error-text">{error}</p>}

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

            <button
              type="submit"
              className="signin-btn"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="signin-footer">
            <p>
              Haven’t registered yet?{" "}
              <button
                type="button"
                className="signup-link"
                onClick={() => navigate("/signup", { replace: true })}
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
