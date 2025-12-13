import React from "react";
import banner1 from "../assets/images/banner/banner.jpg";
import "../assets/css/club_hero.css";

const ClubHero = () => {
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
          <button className="hero-btn events-btn">Events</button>
          <button className="hero-btn profile-btn">Club Profile</button>
          <button className="hero-btn membership-btn">Request Membership</button>
        </div>
      </div>
    </section>
  );
};

export default ClubHero;
