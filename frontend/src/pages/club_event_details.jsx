// ===============================
// club_event_details.jsx
// ===============================

import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/club_event_details.css";
import post from "../assets/images/posts/post.jpg";

// Example Event Data (dummy)
const eventData = {
  title: "Annual Tech Fest",
  description:
    "Join us for our biggest tech event of the year with workshops, competitions, and seminars! This event will bring together innovators, creators, and tech enthusiasts under one roof.",
  image: post,
  startDate: "2025-11-01",
  endDate: "2025-11-03",
  startTime: "09:00 AM",
  endTime: "05:00 PM",
  participation: "All Students", // Options: "All Students", "Club Members", "University Students"
  hasForm: true,
};

const ClubEventDetails = () => {
  const { 
    title, description, image,
    startDate, endDate, startTime, endTime,
    participation, hasForm 
  } = eventData;

  const getParticipationColor = () => {
    switch (participation) {
      case "All Students":
        return "label-orange";
      case "Club Members":
        return "label-green";
      case "University Students":
        return "label-blue";
      default:
        return "label-navy";
    }
  };

  return (
    <div className="club-event-details-page">
      <Navbar />

      <div className="event-container">
        {/* Title */}
        <h1 className="event-title">{title}</h1>

        {/* Image */}
        {image && (
          <img src={image} alt="Event" className="event-image" />
        )}

        {/* Description */}
        <p className="event-description">{description}</p>

        {/* Event Details */}
        <div className="event-details-column">
          <p><strong>Start Date:</strong> {startDate}</p>
          <p><strong>End Date:</strong> {endDate}</p>
          <p><strong>Start Time:</strong> {startTime}</p>
          <p><strong>End Time:</strong> {endTime}</p>

          <p className="participants-line">
            <strong className="label-black">Participants:</strong>{" "}
            <span className={getParticipationColor()}>{participation}</span>
          </p>
        </div>

        {/* View Form Button */}
        <button
          className={`view-form-btn ${hasForm ? "btn-active" : "btn-disabled"}`}
        >
          {hasForm ? "View Form" : "No Form Available"}
        </button>

        {/* Query Line */}
        <p className="query-line">
          *For more queries regarding the event, visit our club or contact us using the number or email provided under our Club Profile section.
        </p>

      </div>

      <Footer />
    </div>
  );
};

export default ClubEventDetails;
