import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/edit_event.css";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

const AUDIENCE_OPTIONS = [
  { value: "", label: "Select Audience" },
  { value: "PRIVATE", label: "Private" },
  { value: "PUBLIC", label: "Public" },
  { value: "CLUB_MEMBERS", label: "Club Members" },
  { value: "UNIVERSITY", label: "University" },
];

const STATUS_OPTIONS = [
  { value: "ONGOING", label: "Ongoing" },
  { value: "UPCOMING", label: "Upcoming" },
  { value: "COMPLETED", label: "Completed" },
];

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    image: null,
    location: "",
    registration_link: "",
    event_audience: "",
    status: "",
    club: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`event/event/${id}/`);
        setFormData({
          ...response.data,
          image: null,
        });
      } catch (error) {
        console.error("Failed to fetch event:", error.response || error.message);
        alert("Failed to fetch event data.");
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.start_date || !formData.end_date) {
      alert("Please fill all mandatory fields: Title, Start Date, End Date.");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) data.append(key, formData[key]);
    }

    setLoading(true);
    try {
      await api.put(`event/event/${id}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Event updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Failed to update event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`event/event/${id}/`);
      alert("Event deleted successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
      alert("Failed to delete event. Please try again.");
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <>
      <Navbar />
      <div className="edit-event-page">
        <div className="edit-event-card">
          <h2 className="edit-event-title">Edit Event</h2>
          <form className="edit-event-form" onSubmit={handleUpdate}>
            {/* Title */}
            <div className="form-group">
              <label>Title <span className="required">*</span></label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Event description"
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

            {/* Times */}
            <div className="form-group date-row">
              <div>
                <label>Start Time</label>
                <input type="time" name="start_time" value={formData.start_time || ""} onChange={handleChange} />
              </div>
              <div>
                <label>End Time</label>
                <input type="time" name="end_time" value={formData.end_time || ""} onChange={handleChange} />
              </div>
            </div>

            {/* Image */}
            <div className="form-group">
              <label>Event Image</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="image" className="choose-file-btn">Choose File</label>
                {formData.image && <span className="file-labels">{formData.image.name}</span>}
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" value={formData.location || ""} onChange={handleChange} placeholder="Event location" />
            </div>

            {/* Registration Link */}
            <div className="form-group">
              <label>Registration Link</label>
              <input type="url" name="registration_link" value={formData.registration_link || ""} onChange={handleChange} placeholder="https://..." />
            </div>

            {/* Audience */}
            <div className="form-group">
              <label>Event Audience</label>
              <select name="event_audience" value={formData.event_audience || ""} onChange={handleChange}>
                {AUDIENCE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status || ""} onChange={handleChange}>
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="edit-event-buttons">
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

export default EditEvent;
