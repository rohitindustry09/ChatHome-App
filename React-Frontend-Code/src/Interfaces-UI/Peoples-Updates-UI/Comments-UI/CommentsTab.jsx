import ChatHeaderAvtarArrow from '../../Chat-Message-UI/Chat-Header/ChatHeaderAvtarArrow.jsx';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CommentsTab({ comment, userId }) {
  
  const [showFullUser, setShowFullUser] = useState(null);
  const BackendLink = useSelector((state) => state.backendLink.BackendLink);

  useEffect(() => {
    async function userFinderk() {
      if (!userId) return; // Prevent API call if userId is missing

      try {
        const response = await axios.get(`${BackendLink}/api/commentUser/hi/${userId}`);
        if (response.data?.user) {
          setShowFullUser(response.data.user);
        } else {
          setShowFullUser(null); // Reset if user data is missing
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setShowFullUser(null); // Handle error case
      }
    }

    userFinderk();
  }, [userId, BackendLink]); 

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '5px',
        margin: '5px',
        padding: '5px 15px'
      }}>
        <ChatHeaderAvtarArrow forPage="updates" user={showFullUser} />

        <div className="posted-message-by-user" style={{ marginLeft: '40px' }}>
         <textarea rows="2" 
          value={comment} 
          style={{
           background: '#eeeeee',
           boxShadow: '-2px -2px 0 red',
           padding: '5px',
           width: '85%'
          }} 
          disabled
         ></textarea>
       </div>
    </div>
  );
}
