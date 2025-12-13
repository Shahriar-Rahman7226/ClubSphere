import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/edit_post.css";
import api from "../api/api"; // axios instance

const AUDIENCE_OPTIONS = [
  { value: "", label: "Select Audience" },
  { value: "PRIVATE", label: "Private" },
  { value: "PUBLIC", label: "Public" },
  { value: "CLUB_MEMBERS", label: "Club Members" },
  { value: "UNIVERSITY", label: "University" },
];

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    audience: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`post/post/${postId}/`);
        const post = response.data;
        setFormData({
          title: post.title || "",
          description: post.description || "",
          image: null,
          audience: post.post_audience || "",
        });
      } catch (error) {
        console.error("Failed to retrieve post:", error.response || error.message);
        alert("Failed to fetch post data.");
      }
    };
    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.audience) {
      alert("Please fill all mandatory fields: Title, Description, Audience.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);
    data.append("post_audience", formData.audience);

    setLoading(true);
    try {
      const response = await api.put(`post/post/${postId}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message || "Post updated successfully!");
      navigate("/admin/posts");
    } catch (error) {
      console.error("Post update error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update post.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setLoading(true);
    try {
      await api.delete(`post/post/${postId}/`);
      alert("Post deleted successfully!");
      navigate("/admin/posts");
    } catch (error) {
      console.error("Post delete error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to delete post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-post-page">
        <div className="edit-post-card">
          <h2 className="edit-post-title">Edit Post</h2>

          <form className="edit-post-form" onSubmit={handleSave}>
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
                <span className="file-label">
                  {formData.image ? formData.image.name : "Choose File"}
                </span>
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

            {/* Buttons */}
            <div className="edit-post-buttons">
                <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
              <button type="button" className="cancel-btn" onClick={() => navigate("/admin/posts")}>Cancel</button>
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

export default EditPost;
