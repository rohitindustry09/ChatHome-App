import React from "react";
import "./SecondUsersProfile.css";

const SecondUsersProfile = () => {
  return (
    <div className="profile-container">
      {/* Top Navigation */}
      <div className="profile-header">
        <button className="back-btn">
          <i className="bi bi-arrow-left"></i> Back
        </button>
        <h3>Business Info</h3>
        <button className="edit-btn">Edit</button>
      </div>

      {/* Profile Section */}
      <div className="profile-info">
        <img src="avatar.jpg" alt="User Avatar" className="avatar" />
        <h2 className="username">Home Made Food</h2>
        <p className="bio">Homemade Tiffin • Open until 10 PM</p>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="action-btn">
          <i className="bi bi-chat-dots"></i>
          <span>Message</span>
        </button>
        <button className="action-btn">
          <i className="bi bi-telephone"></i>
          <span>Call</span>
        </button>
        <button className="action-btn">
          <i className="bi bi-collection"></i>
          <span>Catalog</span>
        </button>
        <button className="action-btn">
          <i className="bi bi-share"></i>
          <span>Share</span>
        </button>
      </div>

      {/* Description Section */}
      <div className="description">
        <p>
          Indian restaurant • Food service distributor • Supermarket/
          Convenience store.
        </p>
      </div>
    </div>
  );
};

export default SecondUsersProfile;
