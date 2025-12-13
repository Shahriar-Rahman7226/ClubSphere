import React, { useState } from "react";
import "../assets/css/clubsphere_setup.css";

const Setup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Username: ${formData.username}\nPassword: ${formData.password}`);
    // Here you can add API logic
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-box">
          <h2 className="welcome-text">Welcome to ClubSphere</h2>
          <p className="signin-title">Please enter your credentials</p>

          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                value={formData.username}
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

            <button type="submit" className="signin-btn">
              Proceed
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setup;
