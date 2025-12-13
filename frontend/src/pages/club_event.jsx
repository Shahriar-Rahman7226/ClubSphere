// ===============================
// clubevent.jsx — Updated Version
// ===============================

import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/club_event.css";

// Dummy Event Data
const eventList = [
  {
    id: 1,
    title: "Robotics Workshop",
    description: "Hands-on robotics session for beginners.",
    start: "2025-01-10",
    end: "2025-01-12",
  },
  {
    id: 2,
    title: "AI Bootcamp",
    description: "Learn machine learning basics in 3 days.",
    start: "2025-02-15",
    end: "2025-02-17",
  },
  {
    id: 3,
    title: "Annual Tech Fest",
    description: "Competitions, seminars and exhibitions.",
    start: "2024-11-01",
    end: "2024-11-03",
  },
  {
    id: 4,
    title: "Programming Contest",
    description: "3-hour long ICPC style contest.",
    start: "2025-12-20",
    end: "2025-12-20",
  },
];

export default function ClubEvent() {
  const [filter, setFilter] = useState("ongoing");

  const today = new Date().toISOString().split("T")[0];

  const filteredEvents = eventList.filter((ev) => {
    if (filter === "ongoing") return ev.start <= today && ev.end >= today;
    if (filter === "past") return ev.end < today;
    if (filter === "upcoming") return ev.start > today;
    return true;
  });

  return (
    <div className="club-event-page">
      <Navbar />

      <div className="event-header">
        <h1>Club Events</h1>
      </div>

      {/* FILTER BAR */}
      <div className="event-filters">
        <button
          className={`filter-btn ${filter === "past" ? "active" : ""}`}
          onClick={() => setFilter("past")}
        >
          Past Events
        </button>

        <button
          className={`filter-btn ${filter === "ongoing" ? "active" : ""}`}
          onClick={() => setFilter("ongoing")}
        >
          Ongoing Events
        </button>

        <button
          className={`filter-btn ${filter === "upcoming" ? "active" : ""}`}
          onClick={() => setFilter("upcoming")}
        >
          Upcoming Events
        </button>
      </div>

      {/* EVENT LIST (column layout) */}
      <div className="event-column">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((ev) => (
            <div className="event-card" key={ev.id}>
              <h3 className="event-title">{ev.title}</h3>

              <p className="event-description">{ev.description}</p>

              <div className="event-dates">
                <p><strong>Start:</strong> {ev.start}</p>
                <p><strong>End:</strong> {ev.end}</p>
              </div>

              <div className="event-footer">
                <button className="details-btn">View Details</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-events">No events found for this category.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
