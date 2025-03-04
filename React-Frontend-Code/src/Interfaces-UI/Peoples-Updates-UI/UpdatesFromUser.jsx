import ChatHeaderAvtarArrow from '../Chat-Message-UI/Chat-Header/ChatHeaderAvtarArrow.jsx';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserCommentId } from '../../features/Chat-Message-todo/CommentSlice.js';

//world messages
export default function UpdatesFromUser({ message, users, handleComment }) {
  const styles = {
    background: '#fff',
    boxShadow: '2px 2px 0 black'
  }
  const user = JSON.parse(localStorage.getItem('user'));
  const BackendLink = useSelector((state) => state.backendLink.BackendLink);
  const [like, setLike] = useState(false)
  const [showLikes, seShowtLikes] = useState(0)
 const dispatch = useDispatch();
 
  async function handleLike() {
     
      let response = await axios(`${BackendLink}/api/${user._id}/updateWorldMessage/like/${message._id}`);
    
     if (response) {
      seShowtLikes(response.data.message.likes.length)
     }
     setLike(!like)
  }

  
  useEffect(()=>{
    function handleSetLikes() {
      seShowtLikes(message.likes.length)
      if (message.likes.includes(user._id))
       setLike(true)
      else 
       setLike(false)
    }
    if (message) {
      handleSetLikes()
    } 
  }, [message]);
          
 return (
  <>
    <div className="post-by-user" style={styles}>
     <ChatHeaderAvtarArrow 
       forPage="updates" 
       user={users.find((u) => u._id === message.user)} 
     />

       <div className="posted-message-by-user" >
         <textarea rows="6" cols=""
          value={message.message}
          style={{
           background: '#eeeeee',
           boxShadow: '-2px -2px 0 orange'
          }} disabled></textarea>
       </div>
     </div>
     
     <div className="updates-extra-buttons">
      <button className="heart world-msg-btns" onClick={handleLike}> 
      <div>
        
       {
         like ? 
         <>
          <i class="bi bi-suit-heart-fill"></i>
         </>
        : 
          <i class="bi bi-suit-heart"></i> 
       }
       &nbsp; {showLikes}
      </div>
      </button>
      <button className="comment world-msg-btns" 
      onClick={() => handleComment(message)}> 
       <div>
         <i class="bi bi-chat-right"></i> 
       </div>
      </button>
    </div>

  </>
 );
}