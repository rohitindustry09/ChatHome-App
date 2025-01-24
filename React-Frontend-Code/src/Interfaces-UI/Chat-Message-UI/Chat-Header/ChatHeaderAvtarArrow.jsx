import React from 'react';
import messageImage from '../message-user.png';
import { Link } from 'react-router-dom';
import './ChatHeaderAvtarArrow.css';
import { useSelector } from 'react-redux';

export default function ChatHeaderAvtarArrow({ forPage='chat' }) {
  
  const chatUser = useSelector((state)=> state.chatUser.user);
  const linkTo = `/ChatWith/${chatUser._id}`;
  //console.log(chatUser)
 return (
  <>
    <nav className="nav-back-with-logo">
          {
            forPage === 'calls' ? 
           <Link to={linkTo}>
             <i class="bi bi-chat-square-dots"></i>
           </Link>
            : forPage === 'chat' ?
            
           <Link to="/">
             <i className="bi bi-arrow-left-circle-fill"></i>
           </Link>
           : <></>
          }
        <div className="avtar-img">
          <img src={chatUser.avatar} alt="friend-image" />
        </div>
        <h5 style={{
          color: 'black'
        }}>{chatUser.username}</h5>
    </nav>
  </>
 );
}

//uses by 
  //ChatHeaderTab.jsx
  //CallsPageCallerStyle.jsx