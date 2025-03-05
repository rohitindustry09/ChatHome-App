<<<<<<< HEAD
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import HomeMainContent from "./HomeMainContent.jsx";
import HomeAddAction from "./Home-Actions/HomeAddAction.jsx";
import { useSelector } from "react-redux";
import "./HomeUI.css";
=======
  import { useState, useEffect } from 'react';
  import axios from 'axios';
  import HomeMainContent from './HomeMainContent.jsx';
  import HomeAddAction from './Home-Actions/HomeAddAction.jsx';
  import { useSelector } from 'react-redux';
  import DotsLoader from '../Loaders-UI/DotsLoader.jsx';
  
  import './HomeUI.css';
  
  export default function HomeUI() {
    const BackendLink = useSelector((state) => state.backendLink.BackendLink);
    const [friendState, setFriendState] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    
useEffect(() => {
  async function handleIt() {
    if (user) {
     const friendsData = await Promise.all(
      user.friends.map(async (friendId) => {
        const response = await axios.get(`${BackendLink}/api/showUser/${friendId}`);
        return response.data.friend;
      })
     );
>>>>>>> f34a5d0 (Updated files and folder)

export default function HomeUI() {
  const BackendLink = useSelector((state) => state.backendLink.BackendLink);
  const [friendState, setFriendState] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

<<<<<<< HEAD
  useEffect(() => {
    async function handleIt() {
      if (!user?.friends || user.friends.length === 0) {
        setShowLoading(false);
        return;
      }

      const friendsData = await Promise.all(
        user.friends.map(async (friendId) => {
          const response = await axios.get(
            `${BackendLink}/api/showUser/${friendId}`
          );
          return response.data.friend;
        })
      );

      // Remove duplicates based on `_id`
      const uniqueFriends = friendsData.filter(
        (friend, index, self) =>
          self.findIndex((f) => f._id === friend._id) === index
      );

      setShowLoading(false);
      setFriendState(uniqueFriends);
=======
    setTimeout(function() {
     setShowLoading(false);
     setFriendState(uniqueFriends);
    }, 200);
>>>>>>> f34a5d0 (Updated files and folder)
    }

    handleIt();
  }, [user, BackendLink]); // Ensure effect runs only when user data changes

<<<<<<< HEAD
  return (
    <>
      <main>
        {showLoading ? (
          <h3 className="loading-parent">
            <i className="bi bi-arrow-clockwise loading"></i> Loading
          </h3>
        ) : friendState.length === 0 ? (
          <h3 className="no-friends">No friends</h3>
        ) : (
          friendState.map((friend) => (
            <HomeMainContent key={friend._id} friend={friend} />
          ))
        )}
      </main>
      <HomeAddAction
        fillIcon="bi bi-person-fill-add icon-msg-foreground"
        forPage="Home"
      />
    </>
  );
}
=======
    
    
    return (
      <>
        <main>
          {
          showLoading ?
           <DotsLoader />
        
          :
            
          friendState.length === 0 ?
              <h3 style={{
            position: 'absolute',
            top: '50%',
            left: '37%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#fff',
            padding: '10px',
            borderRadius: '10px'
          }}> No friends </h3>
          :
            friendState.map((friend) => (
              <HomeMainContent key={friend._id} friend={friend} />
            ))
          
          }
        </main>
        <HomeAddAction
          fillIcon="bi bi-person-fill-add icon-msg-foreground" forPage="Home"
        />
      </>
    );
  }
>>>>>>> f34a5d0 (Updated files and folder)
