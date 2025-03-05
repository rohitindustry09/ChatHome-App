import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ChatHeaderAvtarArrow from "../Chat-Message-UI/Chat-Header/ChatHeaderAvtarArrow.jsx";
import DotsLoader from "../Loaders-UI/DotsLoader.jsx";
import "./Profile.css";

const Profile = () => {
  const { id } = useParams();
  const BackendLink = useSelector((state) => state.backendLink.BackendLink);
  const [profileUser, setProfileUser] = useState(null);
  const [checkUserInState, setCheckUserInState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false); // For fade-in effect

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BackendLink}/api/showUser/${id}`);
        if (response.data) {
          setTimeout(() => {
            setProfileUser(response.data.friend);
            setCheckUserInState(response.data.friend?.friends?.includes(user._id));
            setLoading(false);
            setTimeout(() => setFade(true), 100); // Slight delay for smooth transition
          }, 200); // Ensures at least 2 seconds delay
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, BackendLink, user._id]);

  function handleUserLocal() {
    if (user) {
      localStorage.removeItem("user");
      navigate("/");
    }
  }

  async function handleToBeFriend() {
    try {
      const url = checkUserInState
        ? `${BackendLink}/api/deleteFriend/${user._id}/from/${profileUser._id}`
        : `${BackendLink}/api/addFriend/${user._id}/to/${profileUser._id}`;

      const response = await axios.get(url);
      if (response.data) {
        setProfileUser(response.data.user);
        setCheckUserInState(response.data.user.friends.includes(user._id));
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return (
    <>
      {loading ? (
        <DotsLoader />
      ) : (
        <div className={`profile-container ${fade ? "fadeIn" : ""}`}>
          {/* Profile Section */}
          <div className="profile-info">
            <div className="profile-img">
              <img src={profileUser?.avatar} alt="user image" />
            </div>
            <div>
              <h2 className="username">{profileUser?.username}</h2>
              <p className="bio">Bio# &nbsp; {profileUser?.bio}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <Link to={`/ChatWith/${profileUser._id}`} className="action-btn-link">
              <button className="action-btn">
                <i className="bi bi-chat-dots"></i>
                <span>Message</span>
              </button>
            </Link>

            <Link to={`/Call/${profileUser._id}`} className="action-btn-link">
              <button className="action-btn">
                <i className="bi bi-telephone"></i>
                <span>Call</span>
              </button>
            </Link>

            <Link to={`/ShareProfile/${profileUser._id}`} className="action-btn-link">
              <button className="action-btn">
                <i className="bi bi-share"></i>
                <span>Share</span>
              </button>
            </Link>
          </div>

          {/* Description Section */}
          <div className="description">
            <p>
              {profileUser?.phone} • {profileUser?.email}
            </p>
            <h3>Friends " {profileUser?.friends?.length} "</h3>
            <h4>World Chats " {profileUser?.worldMessageId?.length} "</h4>
          </div>

          {profileUser?._id === user._id ? (
            <div className="action-buttons">
              <button className="action-btn" onClick={handleUserLocal}>
                <i className="bi bi-box-arrow-in-right"></i>
                <span>Logout</span>
              </button>
              <button className="action-btn">
                <i className="bi bi-pen"></i>
                <span>Edit</span>
              </button>
            </div>
          ) : (
            <>
              <h5 style={{ textAlign: "center" }}>
                {checkUserInState
                  ? `You are connected with ${profileUser?.username}`
                  : `You are not connected with ${profileUser?.username}`}
              </h5>

              <div className="action-buttons">
                <button className="action-btn" onClick={handleToBeFriend}>
                  <div
                    style={{
                      transition: "all 0.5s",
                      transform: checkUserInState ? "rotate(135deg)" : "rotate(0deg)",
                      display: "inline-block",
                      borderTop: checkUserInState ? "2px solid red" : "2px solid black",
                      borderBottom: !checkUserInState ? "2px solid red" : "2px solid black",
                      padding: checkUserInState ? "0 0px" : "0 5px",
                      borderRadius: "20%",
                    }}
                  >
                    <i className="bi bi-plus-lg"></i>
                  </div>
                  <span>{checkUserInState ? "Dis-Connect" : "Get Connect"}</span>
                </button>
                <button className="action-btn">
                  <i className="bi bi-pen"></i>
                  <span>Edit</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
