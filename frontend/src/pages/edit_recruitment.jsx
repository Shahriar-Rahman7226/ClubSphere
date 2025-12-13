import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/edit_recruitment.css";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

const EditRecruitment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    club: null,
    title: "",
    description: "",
    semester: "",
    start_date: "",
    end_date: "",
    form_link: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch existing recruitment data
  useEffect(() => {
    const fetchRecruitment = async () => {
      try {
        const response = await api.get(`recruitment/post/${id}/`);
        setFormData({
          ...response.data,
        });
      } catch (error) {
        console.error("Failed to fetch recruitment:", error.response || error.message);
        alert("Failed to fetch recruitment data.");
      }
    };
    fetchRecruitment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.club || !formData.title || !formData.semester || !formData.start_date || !formData.end_date) {
      alert("Please fill all mandatory fields.");
      return;
    }

    setLoading(true);
    try {
      await api.put(`recruitment/post/${id}/`, formData);
      alert("Recruitment updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Failed to update recruitment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recruitment?")) return;
    try {
      await api.delete(`recruitment/post/${id}/`);
      alert("Recruitment deleted successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
      alert("Failed to delete recruitment. Please try again.");
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <>
      <Navbar />
      <div className="edit-recruitment-page">
        <div className="edit-recruitment-card">
          <h2 className="edit-recruitment-title">Edit Recruitment</h2>
          <form className="edit-recruitment-form" onSubmit={handleUpdate}>
            {/* Title */}
            <div className="form-group">
              <label>Title <span className="required">*</span></label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter recruitment title"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                rows={4}
                placeholder="Recruitment description"
              />
            </div>

            {/* Semester */}
            <div className="form-group">
              <label>Semester <span className="required">*</span></label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                placeholder="Enter semester"
                required
              />
            </div>

            {/* Dates */}
            <div className="form-group date-row">
              <div>
                <label>Start Date <span className="required">*</span></label>
                <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
              </div>
              <div>
                <label>End Date <span className="required">*</span></label>
                <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
              </div>
            </div>

            {/* Form Link */}
            <div className="form-group">
              <label>Form Link</label>
              <input
                type="url"
                name="form_link"
                value={formData.form_link || ""}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            {/* Buttons */}
            <div className="edit-recruitment-buttons">
              <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
              <button type="submit" className={`save-btn ${loading ? "disabled" : ""}`} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditRecruitment;
