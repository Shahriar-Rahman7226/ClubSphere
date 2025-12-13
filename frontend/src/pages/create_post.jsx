import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/create_post.css";
import api from "../api/api"; // axios instance

const AUDIENCE_OPTIONS = [
  { value: "", label: "Select Audience" },
  { value: "PRIVATE", label: "Private" },
  { value: "PUBLIC", label: "Public" },
  { value: "CLUB_MEMBERS", label: "Club Members" },
  { value: "UNIVERSITY", label: "University" },
];

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    audience: "",
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
        alert("Failed to fetch your club. You cannot create a post.");
      }
    };
    fetchClub();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.club) {
      alert("No club found for your account.");
      return;
    }

    if (!formData.title || !formData.description || !formData.audience) {
      alert("Please fill all mandatory fields: Title, Description, Audience.");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) data.append(key, formData[key]);
    }

    setLoading(true);
    try {
      const response = await api.post("post/post/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Post created:", response.data);
      alert("Post created successfully!");
      setFormData({ title: "", description: "", image: null, audience: "", club: formData.club });
    } catch (error) {
      console.error("Post creation error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-post-page">
        <div className="create-post-card">
          <h2 className="create-post-title">Create New Post</h2>

          <form className="create-post-form" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Title <span className="required">*</span></label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
                required
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
                placeholder="Write your post description"
                rows={6}
                required
              />
            </div>

            {/* Image */}
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
                <span className="file-label">{formData.image ? formData.image.name : "Choose File"}</span>
              </div>
            </div>

            {/* Audience */}
            <div className="form-group">
              <label htmlFor="audience">Audience <span className="required">*</span></label>
              <select
                id="audience"
                name="audience"
                value={formData.audience}
                onChange={handleChange}
                required
              >
                {AUDIENCE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button type="submit" className={`create-post-btn ${loading ? "disabled" : ""}`} disabled={loading}>
              {loading ? "Creating..." : "Create Post"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
