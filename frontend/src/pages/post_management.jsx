import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/post_management.css";

const PostManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="post-management-page">
      <Navbar />

      <div className="post-management-container">
        <h1 className="post-management-title">Post Management</h1>
        <p className="post-management-subtitle">
          Manage your posts from here. You can create new posts or edit existing ones.
        </p>

        <div className="post-buttons-container">
          <button
            className="post-btn create-btn"
            onClick={() => navigate("/create_post")}
          >
            Create Post
          </button>
          <button
            className="post-btn edit-btn"
            onClick={() => navigate("/edit_post")}
          >
            Edit Post
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostManagement;
