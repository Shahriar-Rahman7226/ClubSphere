import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/create_university.css";

const University = () => {
  const [formData, setFormData] = useState({
    name: "",
    email_domain: "",
    logo: null,
  });

  const [universities, setUniversities] = useState([
    { id: 1, name: "BRAC University" },
    { id: 2, name: "North South University" },
    { id: 3, name: "Independent University, Bangladesh" },
  ]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email_domain) {
      alert("Please fill all fields");
      return;
    }
    const newUniversity = {
      id: universities.length + 1,
      name: formData.name,
    };
    setUniversities([...universities, newUniversity]);
    setFormData({ name: "", email_domain: "", logo: null });
  };

  return (
    <>
      <Navbar />
      <div className="university-page">
        <div className="university-card">
          <h2 className="university-title">Add University</h2>
          <form className="university-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">University Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter university name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email_domain">Email Domain</label>
              <input
                type="text"
                name="email_domain"
                id="email_domain"
                value={formData.email_domain}
                onChange={handleChange}
                placeholder="example.edu"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="logo">University Logo</label>
              <input
                type="file"
                name="logo"
                id="logo"
                accept="image/*"
                onChange={handleChange}
                className="choose-file-btn"
              />
            </div>
            <button type="submit" className="save-btn">Add University</button>
          </form>
        </div>

        <h3 className="section-title">Universities Already Enrolled with ClubSphere</h3>
        <div className="university-list">
          {universities.map((uni) => (
            <div className="university-tile" key={uni.id}>
              {uni.name}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default University;
