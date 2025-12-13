// =========================
// club_homepage.jsx — UPDATED
// ClubSphere
// =========================

import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import Club_Hero from "../components/club_hero.jsx";

import postImg from "../assets/images/posts/post.jpg";
import { FaRegCommentDots } from "react-icons/fa";
import "../assets/css/club_homepage.css";

// Dummy posts for now
const dummyPosts = [
  {
    id: 1,
    title: "Welcome to the Club!",
    user: "Dummy University — Robotics Club",
    caption: "We are excited to start our new season 🤖🔥",
    img: postImg,
  },
  {
    id: 2,
    title: "Meeting Update",
    user: "Dummy University — Robotics Club",
    caption: "Weekly meeting held successfully. Amazing participation!",
  },
];

export default function Club_Homepage() {
  const [likedPosts, setLikedPosts] = useState([]);

  const toggleLike = (postId) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const reachOut = (user) => {
    alert(`Reach out to: ${user}`);
  };

  return (
    <div className="club-homepage">
      <Navbar />

      {/* HERO */}
      <Club_Hero />

      {/* POSTS SECTION */}
      <section className="club-post-section">
        <h2 className="club-post-title">Recent Posts</h2>

        {dummyPosts.map((post) => (
          <div className="club-post-card" key={post.id}>
            <h3 className="club-post-heading">{post.title}</h3>
            <p className="club-post-user">Posted by: {post.user}</p>

            {post.img && (
              <img
                src={post.img}
                alt="Post"
                className="club-post-image"
              />
            )}

            <p className="club-post-caption">{post.caption}</p>

            {/* Like + Reach Out */}
            <div className="club-post-actions">
              <button
                className={`like-btn ${likedPosts.includes(post.id) ? "liked" : ""}`}
                onClick={() => toggleLike(post.id)}
              >
                ❤
              </button>

              <button
                className="reach-btn"
                onClick={() => reachOut(post.user)}
              >
                <FaRegCommentDots size={20} />
              </button>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
