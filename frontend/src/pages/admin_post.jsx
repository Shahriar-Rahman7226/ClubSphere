import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/admin_post.css";

// Sample posts
const samplePosts = [
  {
    id: 1,
    title: "Campus Hackathon 2025",
    description: "Join us for an exciting 48-hour hackathon with prizes and mentorship.",
    audience: "Public",
  },
  {
    id: 2,
    title: "Art Club Exhibition",
    description: "Showcasing student artwork from all departments. Don't miss it!",
    audience: "Club Members",
  },
  {
    id: 3,
    title: "Charity Run",
    description: "Participate in the 5km charity run to support local communities.",
    audience: "University",
  },
];

const AdminPost = () => {
  const [posts] = useState(samplePosts);

  const handleCreatePost = () => {
    alert("Create Post button clicked! Implement post creation here.");
  };

  return (
    <div className="admin-post-page">
      <Navbar />

      {/* Create Post Button */}
      <div className="create-post-container">
        <button className="create-post-button" onClick={handleCreatePost}>
          + Create Post
        </button>
      </div>

      {/* Posts Section */}
      <section className="admin-post-section">
        <h2 className="admin-post-title">Previous Posts</h2>

        {posts.map((post) => (
          <div className="admin-post-card" key={post.id}>
            <h3 className="admin-post-heading">{post.title}</h3>
            <p className="admin-post-description">{post.description}</p>
            <span className="admin-post-audience">{post.audience}</span>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default AdminPost;
