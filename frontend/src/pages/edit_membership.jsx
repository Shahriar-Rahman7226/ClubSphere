import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/edit_membership.css";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

const STATUS_OPTIONS = [
  { value: "CURRENT", label: "Current" },
  { value: "PENDING", label: "Pending" },
  { value: "FORMER", label: "Former" },
  { value: "REJECTED", label: "Rejected" },
];

const EditMembership = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    club_position: "",
    additional_club_position: "",
    status: "",
  });

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const res = await api.get(`membership/${id}/`);
        setFormData({
          club_position: res.data.club_position || "",
          additional_club_position: res.data.additional_club_position || "",
          status: res.data.status || "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load membership data.");
      }
    };
    fetchMembership();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`membership/${id}/`, formData);
      alert("Membership updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to update membership.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="edit-membership-page">
        <div className="edit-membership-card">
          <h2 className="edit-membership-title">Edit Membership</h2>

          <form className="edit-membership-form" onSubmit={handleSave}>
            {/* Club Position */}
            <div className="form-group">
              <label>Club Position</label>
              <input
                type="text"
                name="club_position"
                value={formData.club_position}
                onChange={handleChange}
                placeholder="e.g. President, Member"
                required
              />
            </div>

            {/* Additional Position */}
            <div className="form-group">
              <label>Additional Club Position</label>
              <input
                type="text"
                name="additional_club_position"
                value={formData.additional_club_position}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>

            {/* Status */}
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="edit-membership-buttons">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={`save-btn ${loading ? "disabled" : ""}`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditMembership;
