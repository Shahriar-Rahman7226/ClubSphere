import React from "react";
import { useNavigate } from "react-router-dom";
import banner1 from "../assets/images/banner/banner.jpg";
import "../assets/css/club_hero.css";

const ClubHero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <img src={banner1} alt="Hero Banner" className="hero-banner" />

      <div className="hero-overlay">
        {/* Text */}
        <div className="hero-text">
          <h1>Welcome to Our Club</h1>
          <p>Explore our events, learn about us, and join the community.</p>
        </div>

        {/* Buttons */}
        <div className="hero-buttons">
          <button
            className="hero-btn events-btn"
            onClick={() => navigate("/club_event")}
          >
            Events
          </button>

          <button
            className="hero-btn profile-btn"
            onClick={() => navigate("/club_profile")}
          >
            Club Profile
          </button>

          <button
            className="hero-btn membership-btn"
            onClick={() => navigate("/club_membership")}
          >
            Request Membership
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClubHero;
