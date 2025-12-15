import React from "react";
import "../assets/css/about.css";
import shahriar from "../assets/images/faculty/faculty.webp";
import shafil from "../assets/images/faculty/faculty.webp";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

export default function About() {
  return (
    <div className="about-wrapper">
      <Navbar />
      <div className="about-page">
        <div className="about-container">

          <section className="about-section main-info">
            <h2>What is Clubsphere?</h2>
            <p>
              Clubsphere is a platform where university clubs, inter-university or intra-university, 
              can share achievements, events, and updates. Students can interact with clubs, join 
              them, and stay updated with all club activities—all in one unified campus sphere.
            </p>

            <h2>Why Universities Need Clubsphere?</h2>
            <p>
              Clubsphere centralizes communication, promotes student engagement, and streamlines 
              club management. It helps universities showcase their clubs, achievements, and events, 
              while enabling students to explore and participate in campus activities easily.
            </p>

            <h2>How Does It Work?</h2>
            <p>
              Clubs create profiles, post updates, and manage events. Students can follow clubs, 
              like and comment on posts, and join recruitment drives. Everything is organized 
              in an easy-to-navigate dashboard for seamless campus engagement.
            </p>
          </section>

          <section className="about-section founders-section">
            <h2>Our Respected Founders</h2>
            <div className="founders-list">
              <div className="founder-card">
                <img src={shahriar} alt="Shahriar Rahman Rafi" />
                <p className="founder-name">Shahriar Rahman Rafi</p>
              </div>
              <div className="founder-card">
                <img src={shafil} alt="Shafil Ahmed" />
                <p className="founder-name">Shafil Ahmed</p>
              </div>
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
}
