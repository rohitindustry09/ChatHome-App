import { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomeMainContent.css';

export default function HomeMainContent({ friend }) {
  const [zoomedImage, setZoomedImage] = useState(null);

  function handleClickImage(e) {
    e.stopPropagation(); // Prevents triggering Link navigation
    setZoomedImage(friend.avatar); // Sets the clicked image
  }

  function closeZoomedImage() {
    setZoomedImage(null); // Resets zoom state, closing all open images
  } 

  return (
    <div className="Home-main">
      <div className="message-to-people">
        {/* Profile Image (Does not trigger navigation) */}
        <div className="message-to-people-ui-image" onClick={handleClickImage}>
          <img src={friend.avatar} alt="Profile" />
        </div>

        {/* Entire User Info is Clickable */}
        <Link to={`/ChatWith/${friend._id}`} className="user-info">
          <div className="message-people-ui-banner">
            <h4>{friend.username}</h4>
            <span>✓✓ last message</span>
          </div>
          <div className="yesterday">Yesterday</div>
        </Link>
      </div>

      {/* Zoom Modal - Clicking anywhere closes all zoomed images */}
      {zoomedImage && (
        <div className="image-modal" onClick={closeZoomedImage}>
          <img src={zoomedImage} alt="Zoomed In" className="zoomed-image" />
        </div>
      )}
    </div>
  );
}
