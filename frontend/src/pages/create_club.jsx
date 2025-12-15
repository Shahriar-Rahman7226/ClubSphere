import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import api from "../api/api";
import "../assets/css/create_club.css";

const CreateClub = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    logo: null,
    banner: null,
  });
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch clubs for this user's university
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await api.get("/club/club/");
        setClubs(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch existing clubs");
      }
    };
    fetchClubs();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email) {
      setError("Please fill all required fields");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("email", formData.email);
    if (formData.logo) data.append("logo", formData.logo);
    if (formData.banner) data.append("banner", formData.banner);

    setLoading(true);
    try {
      const response = await api.post("/club/club/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(response.data.message || "Club created successfully");

      // Add new club to the list
      setClubs([...clubs, response.data]);
      setFormData({ name: "", description: "", email: "", logo: null, banner: null });
    } catch (err) {
      console.error(err);
      if (err.response) setError(err.response.data.message || "Error creating club");
      else setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-club-page">
        <div className="create-club-card">
          <h2 className="create-club-title">Create Club</h2>
          <form className="create-club-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Club Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter club name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter club description"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Club Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter club email"
                required
              />
            </div>

            <div className="form-group">
              <label>Club Logo</label>
              <div className="file-input-wrapper">
                <input type="file" name="logo" onChange={handleChange} accept="image/*" />
                <span className="file-label">{formData.logo ? formData.logo.name : "Choose File"}</span>
              </div>
            </div>

            <div className="form-group">
              <label>Club Banner</label>
              <div className="file-input-wrapper">
                <input type="file" name="banner" onChange={handleChange} accept="image/*" />
                <span className="file-label">{formData.banner ? formData.banner.name : "Choose File"}</span>
              </div>
            </div>

            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}

            <button type="submit" className={`create-club-btn ${loading ? "disabled" : ""}`} disabled={loading}>
              {loading ? "Creating..." : "Create Club"}
            </button>
          </form>
        </div>

        <h3 className="section-title">Existing Clubs in Your University</h3>
        <div className="club-list">
          {clubs.length > 0 ? (
            clubs.map((club) => (
              <div
                className="club-tile"
                key={club.id}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span>{club.name}</span>
                <button
                  className="edit-club-btn"
                  onClick={() => navigate(`/edit-club/${club.id}`)}
                >
                  Edit
                </button>
              </div>
            ))
          ) : (
            <p>No clubs created yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateClub;
