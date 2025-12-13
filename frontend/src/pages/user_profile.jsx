import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import "../assets/css/user_profile.css";
import dummy from "../assets/images/profiles/dummy.webp";

const UserProfile = () => {
  const user = {
    first_name: "Shafil",
    last_name: "Ahmed",
    institution_id: "CSE-2021-045",
    email: "rafi@student.edu",
    additional_email: "rafi.personal@gmail.com",
    department: "Computer Science & Engineering",
    dob: "2002-05-14",
    gender: "Male",
    blood_group: "O+",
    phone: "+880 1712345678",
    profile_image: dummy, // if null → dummy used
  };

  const clubs = [
    {
      id: 1,
      club_name: "Programming Club",
      position: "General Secretary",
      additional_position: "Backend Lead",
      status: "Current",
    },
    {
      id: 2,
      club_name: "Robotics Club",
      position: "Member",
      additional_position: "",
      status: "Former",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="user-profile-page">
        <div className="user-profile-card">

          {/* Name */}
          <h2 className="profile-name">
            {user.first_name} {user.last_name}
          </h2>

          {/* Image + Info */}
          <div className="profile-main">
            {/* Profile Image */}
            <div className="profile-image-wrapper">
              <img
                src={user.profile_image || dummy}
                alt="Profile"
                className="profile-image"
              />
            </div>

            {/* User Info */}
            <div className="profile-info">
              <p><strong>Institution ID:</strong> {user.institution_id}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Additional Email:</strong> {user.additional_email || "—"}</p>
              <p><strong>Department:</strong> {user.department}</p>
              <p><strong>Date of Birth:</strong> {user.dob}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Blood Group:</strong> {user.blood_group}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </div>
          </div>

          {/* Edit Profile */}
          <div className="profile-action">
            <button className="edit-profile-btn">Edit Profile</button>
          </div>

          {/* Club Overview */}
          <h3 className="section-title">Club Overview</h3>

          <div className="club-overview">
            {clubs.map((club) => (
              <div className="club-tile" key={club.id}>
                <h4>{club.club_name}</h4>
                <p><strong>Position:</strong> {club.position}</p>
                <p>
                  <strong>Additional Position:</strong>{" "}
                  {club.additional_position || "—"}
                </p>
                <span
                  className={`club-status ${
                    club.status === "Current" ? "current" : "former"
                  }`}
                >
                  {club.status}
                </span>
              </div>
            ))}
          </div>

          {/* Account Actions */}
          <div className="account-actions">
            <button className="reset-btn">Reset Password</button>
            <button className="signout-btn">Sign Out</button>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
