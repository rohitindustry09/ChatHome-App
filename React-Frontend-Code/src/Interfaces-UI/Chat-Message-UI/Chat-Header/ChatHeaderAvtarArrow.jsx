import React from 'react';
import messageImage from '../message-user.png';
import { Link } from 'react-router-dom';
import './ChatHeaderAvtarArrow.css';
import { useSelector } from 'react-redux';

export default function ChatHeaderAvtarArrow({ forPage = 'chat', user }) {
  
  const chatUser = useSelector((state) => state.chatUser.user);
  //const displayUser = chatUser && forPage !== 'updates' ? chatUser : user;
  const displayUser = chatUser && forPage !== 'updates' ? chatUser : user;

  const linkTo = displayUser ? `/ChatWith/${displayUser._id}` : '#';

  return (
    <nav className="nav-back-with-logo">
      {forPage === 'calls' ? (
        <Link to={linkTo}>
          <i className="bi bi-chat-square-dots"></i>
        </Link>
      ) : forPage === 'chat' ? (
        <Link to="/">
          <i className="bi bi-arrow-left-circle-fill"></i>
        </Link>
      ) : null}

      <div
        className="avtar-img"
        style={{
          border: '1px solid black',
          boxShadow: '0px 0px 5px #ff67ce',
        }}
      >
        <img src={displayUser?.avatar || messageImage} alt="friend-image" />
      </div>

      <h5 className="username-text">{displayUser?.username || 'Unknown'}</h5>
    </nav>
  );
}


//uses by 
  //ChatHeaderTab.jsx
  //CallsPageCallerStyle.jsx