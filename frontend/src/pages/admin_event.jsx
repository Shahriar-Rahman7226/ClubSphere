import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/admin_event.css";

// Sample events
const sampleEvents = [
  {
    id: 1,
    title: "Campus Hackathon 2025",
    description: "Join us for an exciting 48-hour hackathon with prizes and mentorship.",
    start_date: "2025-06-10",
    end_date: "2025-06-12",
    status: "ONGOING",
  },
  {
    id: 2,
    title: "Art Club Exhibition",
    description: "Showcasing student artwork from all departments. Don't miss it!",
    start_date: "2025-05-05",
    end_date: "2025-05-07",
    status: "COMPLETED",
  },
  {
    id: 3,
    title: "Charity Run",
    description: "Participate in the 5km charity run to support local communities.",
    start_date: "2025-07-01",
    end_date: "2025-07-01",
    status: "UPCOMING",
  },
];

const STATUS_FILTERS = ["COMPLETED", "ONGOING", "UPCOMING"];

const AdminEvent = () => {
  const [events] = useState(sampleEvents);
  const [activeFilter, setActiveFilter] = useState("ONGOING");

  const handleCreateEvent = () => {
    alert("Create Event button clicked! Implement event creation here.");
  };

  return (
    <div className="admin-event-page">
      <Navbar />

      {/* Create Event Button */}
      <div className="create-event-container">
        <button className="create-event-button" onClick={handleCreateEvent}>
          + Create Event
        </button>
      </div>

      {/* Filters */}
      <div className="event-filters">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            className={`filter-btn ${activeFilter === status ? "active" : ""}`}
            onClick={() => setActiveFilter(status)}
          >
            {status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Events Section */}
      <section className="admin-event-section">
        {events
          .filter((event) => event.status === activeFilter)
          .map((event) => (
            <div className="admin-event-card" key={event.id}>
              <h3 className="admin-event-heading">{event.title}</h3>
              <p className="admin-event-description">{event.description}</p>
              <div className="admin-event-dates">
                <span>Start Date: {event.start_date}</span>
                <span>End Date: {event.end_date}</span>
              </div>
            </div>
          ))}
      </section>

      <Footer />
    </div>
  );
};

export default AdminEvent;
