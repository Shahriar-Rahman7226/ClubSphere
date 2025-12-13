import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/create_recruitment.css";
import api from "../api/api"; // axios instance

const Recruitment = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    semester: "",
    start_date: "",
    end_date: "",
    form_link: "",
    club: null,
  });

  const [loading, setLoading] = useState(false);

  // Fetch club ID for the current admin
  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await api.get("club/?user=current"); // backend returns club(s) for request.user
        const club = response.data[0]; // assuming admin has one club
        if (club) setFormData((prev) => ({ ...prev, club: club.id }));
      } catch (error) {
        console.error("Failed to fetch club:", error.response || error.message);
        alert("Failed to fetch your club. You cannot create recruitment.");
      }
    };
    fetchClub();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.club) {
      alert("No club found for your account.");
      return;
    }

    if (!formData.title || !formData.semester || !formData.start_date || !formData.end_date) {
      alert("Please fill all mandatory fields: Title, Semester, Start Date, End Date.");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) data.append(key, formData[key]);
    }

    setLoading(true);
    try {
      const response = await api.post("recruitment/post/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Recruitment created:", response.data);
      alert("Recruitment created successfully!");
      setFormData({
        title: "",
        description: "",
        semester: "",
        start_date: "",
        end_date: "",
        form_link: "",
        club: formData.club,
      });
    } catch (error) {
      console.error("Recruitment creation error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to create recruitment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-recruitment-page">
        <div className="create-recruitment-card">
          <h2 className="create-recruitment-title">Create Recruitment</h2>

          <form className="create-recruitment-form" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Title <span className="required">*</span></label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter recruitment title"
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
                placeholder="Write recruitment description"
                rows={6}
              />
            </div>

            {/* Semester */}
            <div className="form-group">
              <label htmlFor="semester">Semester <span className="required">*</span></label>
              <input
                type="text"
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                placeholder="Enter semester (e.g., Fall 2026)"
                required
              />
            </div>

            {/* Start Date */}
            <div className="form-group">
              <label htmlFor="start_date">Start Date <span className="required">*</span></label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* End Date */}
            <div className="form-group">
              <label htmlFor="end_date">End Date <span className="required">*</span></label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Form Link */}
            <div className="form-group">
              <label htmlFor="form_link">Form Link</label>
              <input
                type="url"
                id="form_link"
                name="form_link"
                value={formData.form_link}
                onChange={handleChange}
                placeholder="Enter registration form link (optional)"
              />
            </div>

            {/* Submit */}
            <button type="submit" className={`create-recruitment-btn ${loading ? "disabled" : ""}`} disabled={loading}>
              {loading ? "Creating..." : "Create Recruitment"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Recruitment;
