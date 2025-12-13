import React, { useState, useEffect } from "react";
import "../assets/css/create_event.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import api from "../api/api";

const AUDIENCE_OPTIONS = [
  { value: "", label: "Select Audience" },
  { value: "PUBLIC", label: "Public" },
  { value: "CLUB_MEMBERS", label: "Club Members" },
  { value: "UNIVERSITY", label: "University" },
];

const STATUS_OPTIONS = [
  { value: "UPCOMING", label: "Upcoming" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "COMPLETED", label: "Completed" },
];

export default function CreateEvent() {
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
    status: "UPCOMING",
    club: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await api.get(
          `users/user-registration/${localStorage.getItem("userId")}/`
        );
        const clubId = response.data.club?.id;
        setFormData((prev) => ({ ...prev, club: clubId }));
      } catch (error) {
        console.error("Failed to fetch club:", error.response || error.message);
      }
    };
    fetchClub();
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
    if (!formData.title || !formData.description || !formData.event_audience || !formData.start_date || !formData.end_date) {
      alert("Title, Description, Audience, Start Date, and End Date are required.");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) data.append(key, formData[key]);
    }

    setLoading(true);
    try {
      const response = await api.post("event/event/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Event created:", response.data);
      alert("Event created successfully!");
      setFormData({
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
        status: "UPCOMING",
        club: formData.club,
      });
    } catch (error) {
      console.error("Failed to create event:", error.response?.data || error.message);
      alert("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-event-page">
        <div className="create-event-card">
          <h2 className="create-event-title">Create New Event</h2>

          <form className="create-event-form" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Title <span className="required">*</span></label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Description <span className="required">*</span></label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            {/* Dates */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="start_date">Start Date <span className="required">*</span></label>
                <input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="end_date">End Date <span className="required">*</span></label>
                <input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Times */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="start_time">Start Time</label>
                <input
                  id="start_time"
                  name="start_time"
                  type="time"
                  value={formData.start_time}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="end_time">End Time</label>
                <input
                  id="end_time"
                  name="end_time"
                  type="time"
                  value={formData.end_time}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Image */}
            <div className="form-group">
              <label htmlFor="image">Event Image</label>
              <div className="file-input-wrapper">
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
                <span className="file-label">{formData.image ? formData.image.name : "Choose File"}</span>
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* Registration Link */}
            <div className="form-group">
              <label htmlFor="registration_link">Registration Link</label>
              <input
                id="registration_link"
                name="registration_link"
                type="url"
                value={formData.registration_link}
                onChange={handleChange}
              />
            </div>

            {/* Event Audience */}
            <div className="form-group">
              <label htmlFor="event_audience">Audience <span className="required">*</span></label>
              <select
                id="event_audience"
                name="event_audience"
                value={formData.event_audience}
                onChange={handleChange}
              >
                {AUDIENCE_OPTIONS.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`create-event-btn ${loading ? "disabled" : ""}`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
