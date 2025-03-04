  import { useState, useEffect } from 'react';
  import axios from 'axios';
  import HomeMainContent from './HomeMainContent.jsx';
  import HomeAddAction from './Home-Actions/HomeAddAction.jsx';
  import { useSelector } from 'react-redux';
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

    // Remove duplicates based on `_id`
    const uniqueFriends = friendsData.filter(
      (friend, index, self) => self.findIndex(f => f._id === friend._id) === index
    );

    setTimeout(function() {
     setShowLoading(false);
     setFriendState(uniqueFriends);
    }, 600);
    }
  }

  if (user.friends) handleIt();
}, []);

    
    
    return (
      <>
        <main>
          {
          showLoading ?
            <h3 class="loading-parent" style={{
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
            <i class="bi bi-arrow-clockwise loading"></i>
            Loading
          </h3>
        
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
