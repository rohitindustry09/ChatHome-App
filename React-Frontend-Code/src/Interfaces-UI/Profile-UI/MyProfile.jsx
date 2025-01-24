import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyProfile.css';

function MyProfile() {
   
   const navigate = useNavigate();
   const user = JSON.parse(localStorage.getItem('user'));
   function handleLogout() {
     if (localStorage.getItem('user')) {
       localStorage.removeItem('user');
       setTimeout(function() {
         navigate('/');
       }, 500);
     } else {
      alert('No user is logged in');
     }
   }

  return (
  <div className="modern-profile-container">
    <div className="modern-profile">
      <header className="profile-banner">
        <div className="banner-overlay">
          <img src={user.avatar} alt="Profile" className="profile-pic" />
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-bio">{user.bio}</p>
        </div>
      </header>

      <div className="profile-content">
        <div className="profile-section">
          <h2>{user.username}</h2>
          <div className="profile-info">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="action-btn edit-btn">Edit Profile</button>
          <button 
           className="action-btn logout-btn"
           onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default MyProfile;
