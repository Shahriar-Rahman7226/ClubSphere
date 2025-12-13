// ===============================
// club_profile.jsx — Updated
// ===============================

import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/club_profile.css";
import advisorImg from "../assets/images/faculty/faculty.png"; // replace with real image

const ClubProfile = () => {
  return (
    <div className="club-profile-page">
      <Navbar />

      <div className="profile-container">

        {/* MERGED SECTION (ABOUT, WHAT WE DO, WHY JOIN, CONTACT) */}
        <section className="profile-section merged-section">
          <h2>About Us</h2>
          <p>
            We are a dynamic university club dedicated to fostering creativity,
            collaboration, and skill-building among students. Our club provides
            opportunities to grow, learn, and showcase your abilities through
            events, workshops, and collaborative projects.
          </p>

          <h2>What We Do</h2>
          <p>
            We organize interactive events, competitions, seminars, and
            hands-on training sessions to help members strengthen their technical
            and leadership skills. Our activities ensure continuous learning and
            real-world exposure.
          </p>

          <h2>Why You Should Join Us</h2>
          <p>
            By joining our club, you gain access to a supportive community,
            exciting opportunities, and professional growth. We encourage students
            to explore new ideas, build their network, and develop practical 
            experience that will help in future careers.
          </p>

          <h2>Contact & Email</h2>
          <p><strong>Email:</strong> clubofficial@gmail.com</p>
          <p><strong>Contact Number:</strong> +880 1234-567890</p>
        </section>

        {/* FACULTY ADVISOR */}
        <section className="advisor-section">
          <h2>Our Honorable Faculty Advisor</h2>

          <div className="advisor-card">
            <img src={advisorImg} alt="Advisor" className="advisor-img" />

            <div className="advisor-details">
              <h3 className="advisor-name">Dr. Md. Rafiqul Hasan</h3>

              <p className="advisor-department">
                Department of Computer Science & Engineering
              </p>

              <p className="advisor-bio">
                An experienced academic researcher guiding students with passion
                and dedication in technology and innovation.
                </p>
                <p className="advisor-tenure">
                    Tenure: 2025 - Present
              </p>

              <button className="details-btn">
                More Details →
              </button>
            </div>
          </div>
        </section>

        {/* MEMBERS + FORMER FACULTY BUTTONS */}
        <div className="members-buttons">
          <button className="member-btn former-faculty">Former Faculty Advisor</button>
          <button className="member-btn former-members">Former Members</button>
          <button className="member-btn current-members">Current Members</button>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default ClubProfile;
