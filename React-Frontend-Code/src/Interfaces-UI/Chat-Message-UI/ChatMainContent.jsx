import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ChatMainContent() {
  const [msgFromUser, setMsgFromUser] = useState([]);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const BackendLink = useSelector((state) => state.backendLink.BackendLink);

  useEffect(() => {
    async function getMessageBtw_users() {
      try {
        const response = await axios.get(`${BackendLink}/api/${user._id}/${id}`);
        if (response?.data?.messages) {
          setMsgFromUser(response.data.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    if (user && id) {
      getMessageBtw_users();
    }
  }, [BackendLink, id, user]);

  return (
    <div className="Chat-main">
      {msgFromUser.map((message) => (
        <div
          className={`message-box-${message.Content[0].user === user._id ? 'send' : 'receive'}`}
          key={message._id}
        >
          <div className="message">{message.Content[0].Message}</div>
        </div>
      ))}
    </div>
  );
}
