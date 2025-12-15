import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../assets/css/create_university.css";

const University = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    email_domain: "",
    logo: null,
  });

  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await api.get("/university/university/");
        setUniversities(response.data);
      } catch {
        setError("Failed to load existing universities");
      }
    };
    fetchUniversities();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title || !formData.email_domain) {
      setError("Please fill all required fields");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("email_domain", formData.email_domain);
    if (formData.logo) data.append("logo", formData.logo);

    setLoading(true);
    try {
      const response = await api.post("/university/university/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(response.data.message || "University added successfully");

      // Update list (optional)
      setUniversities([...universities, response.data]);
      setFormData({ title: "", email_domain: "", logo: null });

      // Navigate to superadmin signup page after successful creation
      navigate("/superadmin_signup");
    } catch (err) {
      if (err.response) setError(err.response.data.message || "Error adding university");
      else setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="university-page">
      <div className="university-card">
        <h2 className="university-title">Add University</h2>
        <form className="university-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">University Name</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter university name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email_domain">Email Domain</label>
            <input
              type="text"
              name="email_domain"
              id="email_domain"
              value={formData.email_domain}
              onChange={handleChange}
              placeholder="@example.edu"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="logo">University Logo</label>
            <input
              type="file"
              name="logo"
              id="logo"
              accept="image/*"
              onChange={handleChange}
              className="choose-file-btn"
            />
          </div>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Saving..." : "Add University"}
          </button>
        </form>
      </div>

      <h3 className="section-title">Universities Already Enrolled with ClubSphere</h3>
      <div className="university-list">
        {universities.length > 0 ? (
          universities.map((uni) => (
            <div className="university-tile" key={uni.id}>
              {uni.title}
            </div>
          ))
        ) : (
          <p>No universities enrolled yet.</p>
        )}
      </div>
    </div>
  );
};

export default University;
