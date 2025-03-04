import UpdatesFromUser from './UpdatesFromUser.jsx';
import './UpdatesPage.css';
import HomeAddAction from '../Home-Message-UI/Home-Actions/HomeAddAction.jsx';
import CommentsTab from './Comments-UI/CommentsTab.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserCommentId } from '../../features/Chat-Message-todo/CommentSlice.js';

export default function UpdatesPage() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [commentTab, setCommentTab] = useState(false);
  const [commentSend, setCommentSend] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const BackendLink = useSelector((state) => state.backendLink.BackendLink);
  const userComments = useSelector((state) => state.CommentIds.userComments);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getWorldMessages() {
      try {
        const response = await axios.get(`${BackendLink}/api/getWorldChat`);
        if (response.data) {
          const fetchedMessages = Array.isArray(response.data.messages) ? response.data.messages : [];
          const fetchedUsers = Array.isArray(response.data.users) ? response.data.users : [];
          setMessages(fetchedMessages);
          setUsers(fetchedUsers);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      } finally {
        setTimeout(() => setShowLoading(false), 500);
      }
    }

    if (user) getWorldMessages();
  }, []);

  // Update userComments whenever messages change
  useEffect(() => {
    if (messages.length > 0 && userComments?._id) {
      const updatedCommentData = messages.find((msg) => msg._id === userComments._id);
      if (updatedCommentData) {
        dispatch(updateUserCommentId(updatedCommentData));
      }
    }
  }, [messages, userComments?._id, dispatch]);

  async function handleCommentSend(e) {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${BackendLink}/api/commentFrom/${user._id}/to/${userComments._id}/${commentSend}`
      );

      if (response.data) {
        setMessages(Array.isArray(response.data.messages) ? response.data.messages : []);
        setCommentSend(''); // Clear input after successful submission
      } else {
        setMessages([...messages]);
      }
    } catch (error) {
      console.error("Error sending comment:", error);
      setMessages([...messages]);
    }
  }

  function handleComment(seeCommentUser = null) {
    if (seeCommentUser) {
      dispatch(updateUserCommentId(seeCommentUser));
    }
    setCommentTab(true);
  }

  function handleCommentSendChange(e) {
    setCommentSend(e.target.value);
  }

  return (
    <>
      <main style={{
        padding: '60px 10px 20px 10px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
        background: '#eaeaea',
        margin: '0 0 70px 0',
        overflow: 'hidden'
      }}>
        <h1>Best wishes!</h1>

        {showLoading ? (
          <h3 className="loading-parent" style={{
            position: 'absolute',
            top: '50%',
            left: '40%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#fff',
            padding: '10px',
            borderRadius: '10px'
          }}>
            <i className="bi bi-arrow-clockwise loading"></i>
            Loading
          </h3>
        ) : messages.length === 0 ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh'
          }}>
            <h3 style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#fff',
              padding: '10px',
              borderRadius: '10px'
            }}>No World Messages Yet</h3>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} style={{ padding: '10px 0' }}>
              <UpdatesFromUser
                message={message}
                users={users}
                handleComment={handleComment}
              />
            </div>
          ))
        )}
<div style={{
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
  background: '#fff',
  height: '55vh',
  borderRadius: '20px',
  boxShadow: '5px -5px 0 black',
  transform: `translateY(${commentTab ? '-30%' : '100%'})`, // Smooth sliding
  transition: 'transform 0.5s ease-in-out',
  overflow: 'hidden',
}}>

          <div style={{
            height: '90%',
            overflowY: 'scroll',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'sticky',
              top: '0',
              background: '#fff',
              padding: '10px 10px'
            }}>
              <i className="bi">&nbsp;</i>
              <h4>Comments</h4>
              <button style={{
                padding: '2px 5px',
                boxShadow: '2px -2px 0 #00f32a',
                borderRadius: '5px',
                border: 'none',
                fontSize: '30px',
              }} onClick={()=> setCommentTab(false)}>
                <i className="bi bi-arrow-down-short"></i>
              </button>
            </div>
<span style={{
  opacity: commentTab ? 1 : 0,
  visibility: commentTab ? 'visible' : 'hidden', // Prevent interaction when hidden
  transition: 'opacity 1s ease-in-out, visibility 1s'
}}>
  {userComments?.comments?.length > 0 ? (
    userComments.comments.map((comment) => (
      <div key={comment._id}>
        <CommentsTab
          comment={comment.comment}
          userId={comment.user}
        />
      </div>
    ))
  ) : (
    <center>
      <p>No comments yet</p>
    </center>
  )}
</span>

          </div>

          <form onSubmit={handleCommentSend} style={{
            background: '#fff',
            position: 'fixed',
            bottom: '5px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: '10px'
          }}>
            <input
              placeholder='Type comment...'
              value={commentSend}
              style={{
                flex: 0.7,
                padding: '5px',
                background: 'none',
                border: 'none',
                outline: 'none'
              }}
              onChange={handleCommentSendChange}
            />
            <button style={{
              background: '#e2e2e2',
              border: 'none',
              borderRadius: '10px',
              padding: '10px',
              position: 'relative',
              bottom: '50px',
              left: '3%'
            }}>
              <i className="bi bi-rocket-takeoff"></i>
            </button>
          </form>
        </div>
      </main>
      <HomeAddAction
        fillIcon="bi bi-chat-quote-fill icon-msg-foreground"
        forPage="updates"
      />
    </>
  );
}
