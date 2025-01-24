import ChatHeader from './ChatHeader.jsx';
import ChatFooter from './ChatFooter.jsx';
import ChatMainContent from './ChatMainContent.jsx';
import './ChatUI.css';
import { addChatUser } from '../../features/Chat-Message-todo/ChatUserSlice.js';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function ChatUI() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const BackendLink = useSelector((state)=> state.backendLink.BackendLink);
  useEffect(()=>{
    
     async function getUserInfo() {
       const response = await axios.get(`${BackendLink}/api/showUser/${id}`);
       if (response)
        dispatch(addChatUser(response.data.friend));
     }
    
    if (id)
      getUserInfo();
      
  }, [])
 return (
  <>
   <ChatHeader />
    <main>
      <div className="main-2nd">
        <ChatMainContent />
      </div>
    </main>
   <ChatFooter />
  </>
 );
}

//uses by
  //App.jsx