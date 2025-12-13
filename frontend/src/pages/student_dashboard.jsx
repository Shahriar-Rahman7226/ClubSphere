// ================= UPDATED student-dashboard.jsx =================
import React, { useRef, useState, useEffect } from "react";
import banner from "../assets/images/banner/banner.png";
import club from "../assets/images/clubs/club.png";
import post from "../assets/images/posts/post.jpg";
import "../assets/css/student_dashboard.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { FaRegCommentDots } from "react-icons/fa";

const clubs = [
  { id: 1, img: club, name: "YES Club" },
  { id: 2, img: club, name: "YES Club" },
  { id: 3, img: club, name: "YES Club" },
  { id: 4, img: club, name: "YES Club" },
  { id: 5, img: club, name: "YES Club" },
  { id: 6, img: club, name: "YES Club" },
  { id: 7, img: club, name: "YES Club" },
  { id: 8, img: club, name: "YES Club" },
  { id: 9, img: club, name: "YES Club" },
  { id: 10, img: club, name: "YES Club" },
  { id: 11, img: club, name: "YES Club" },
  { id: 12, img: club, name: "YES Club" },
  { id: 13, img: club, name: "YES Club" },
  { id: 14, img: club, name: "YES Club" },
  { id: 15, img: club, name: "YES Club" },
];

const dummyPosts = [
  {
    id: 1,
    title: "Programming Contest Week!",
    user: "Dummy University - Coding Club",
    caption: "Excited for the upcoming programming contest! 🚀",
    img: post,
  },
  {
    id: 2,
    title: "Great Tutoring Session!",
    user: "Dummy University - Tutoring Hub",
    caption: "Had a great session with my tutor today!📚",
  },
];

const StudentDashboard = () => {
  const sliderRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const updateArrows = () => {
      setShowArrows(slider.scrollWidth > slider.clientWidth);
    };

    updateArrows();
    window.addEventListener("resize", updateArrows);

    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  const scrollSlider = (dir) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: dir === "right" ? 300 : -300,
      behavior: "smooth",
    });
  };

  const toggleLike = (id) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const reachOut = (postUser) => {
    alert(`Reach out to: ${postUser}`);
  };

  return (
    <div className="student-dashboard">
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-section-student">
        <img src={banner} alt="Hero Banner" className="hero-banner-student" />
        <div className="hero-overlay-student">
          <img src={club} alt="Hero Logo" />
          <h1>Welcome Shahriar!</h1>
          {/* <p className="hero-tagline">
            Stay updated with clubs, events & campus news ✨
          </p> */}
        </div>
      </section>

      {/* CLUB SECTION */}
      <section className="club-section">
        <h2 className="section-title center">Clubs</h2>

        <div className="club-controls">
          {showArrows && (
            <button
              className="club-arrow left"
              onClick={() => scrollSlider("left")}
            >
              ‹
            </button>
          )}

          <div className="club-slider" ref={sliderRef}>
            {clubs.map((c) => (
              <div className="club-card" key={c.id}>
                <img src={c.img} alt={c.name} />
                <p className="club-name">{c.name}</p>
              </div>
            ))}
          </div>

          {showArrows && (
            <button
              className="club-arrow right"
              onClick={() => scrollSlider("right")}
            >
              ›
            </button>
          )}
        </div>
      </section>

      {/* POSTS SECTION */}
      <section className="post-section">
        <h2 className="section-title center">Your Newsfeed</h2>

        {dummyPosts.map((post) => (
          <div className="post-card" key={post.id}>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-user">Posted by: {post.user}</p>

            {post.img && (
              <img src={post.img} alt="Post" className="post-image" />
            )}

            <p className="post-caption">{post.caption}</p>

            {/* Like + Reach Out Buttons */}
            <div className="post-actions">
              <button
                className={`like-btn ${
                  likedPosts.includes(post.id) ? "liked" : ""
                }`}
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
};

export default StudentDashboard;
