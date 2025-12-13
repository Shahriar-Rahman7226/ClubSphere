import React from "react";
import "../assets/css/footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const AdminFooter = () => {
  return (
    <footer className="admin_footer">
      {/* ===== MAIN SECTION ===== */}
      <div className="admin_footer_container">
        {/* Left Column */}
        <div className="admin_footer_left">

          <div className="admin_footer_info">
            <div className="admin_footer_contact">
              <h4>Contact Support</h4>
              <p>
                Email:{" "}
                <a href="mailto:adminsupport@yourcompany.com">
                  clubsphere.help@gmail.com
                </a>
              </p>
              <p>Phone: +880 123 456 789</p>
            </div>

            <div className="admin_footer_links">
              <h4>Admin Resources</h4>
              <ul>
                <li>
                  <a href="/admin/help">Help Center</a>
                </li>
                <li>
                  <a href="/admin/settings">Settings</a>
                </li>
                <li>
                  <a href="/admin/terms">Terms of Use</a>
                </li>
                <li>
                  <a href="/admin/privacy">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Social Links */}
        <div className="admin_footer_right">
          <h4 className="admin_footer_social_heading">Connect With Us</h4>
          <div className="admin_footer_socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              <FaXTwitter />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* ===== COPYRIGHT ===== */}
      <div className="admin_footer_bottom">
        <p>
          &copy; {new Date().getFullYear()} 2025 ClubSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default AdminFooter;
