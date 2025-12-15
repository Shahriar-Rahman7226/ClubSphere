import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/event_management.css";

const EventManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="event-management-page">
      <Navbar />

      <div className="event-management-container">
        <h1 className="event-management-title">Event Management</h1>
        <p className="event-management-subtitle">
          Manage your university events from here.
        </p>

        <div className="event-buttons-container">
          <button
            className="event-btn create-btn"
            onClick={() => navigate("/create_event", { replace: false })}
          >
            Create Event
          </button>
          <button
            className="event-btn edit-btn"
            onClick={() => navigate("/edit_event", { replace: false })}
          >
            Edit Event
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventManagement;
