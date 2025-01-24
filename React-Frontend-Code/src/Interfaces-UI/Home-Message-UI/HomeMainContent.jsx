import messageImage from './message-user.png';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomeMainContent({ friend }) {
  //console.log(friendData.friend)
  let linkTo = `/ChatWith/${friend._id}`;
  //console.log(friend)
 return (
  <>
  <Link to={linkTo} class="links">
    <div class="Home-main">
      <div class="message-to-people">
        <div class="message-to-people-ui-image">
          <img src={friend.avatar} alt="image-message-ui" />
        </div>
        <div class="message-people-ui-banner">
          <h4>{friend.username}</h4>
          <span>✓✓ last meessage</span>
        </div>
        <div class="yesterday">
          Yesterday
        </div>
      </div>
    </div>
  </Link>
  </>
 );
}

//uses by files
  //HomeUI.jsx