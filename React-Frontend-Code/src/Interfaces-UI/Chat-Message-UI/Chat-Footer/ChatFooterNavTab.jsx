import GetIconAlongText from '../../UI-Components/GetIconAlongText.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { addMessage } from '../../../features/Chat-Message-todo/MessageTodoSlice.js';
import { setInput } from '../../../features/Chat-Message-todo/ChatInputSlice.js';
import axios from 'axios';

export default function ChatFooterNavTab({ refs }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const audioRef = useRef(null);
  const BackendLink = useSelector((state) => state.backendLink.BackendLink);

  const chatIconSendStyles = { display: 'inline-block', cursor: 'pointer' };
  const inputValue = useSelector((state) => state.chatInput.input);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    try {
      dispatch(addMessage(inputValue));
      const response = await axios.get(`${BackendLink}/api/${user._id}/${id}`, {
        params: { content: inputValue },
      });

      if (response) {
        console.log(response);
        dispatch(setInput(''));
        playAudio();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error('Audio playback failed. Please check the file URL or format:', err);
      });
    }
  };

  return (
    <div className="send-with-gallery" id="send-with-gallery" ref={refs?.parent}>
      <GetIconAlongText
        setText=""
        setAncestorIdName="tab-to-do-image"
        setStyle={chatIconSendStyles}
        setIconClassName="bi bi-image"
        refs={refs?.image}
      />
      <GetIconAlongText
        setText=""
        setAncestorIdName="tab-to-do-send"
        setStyle={chatIconSendStyles}
        setIconClassName="fa-solid fa-paper-plane"
        refs={refs?.send}
        methodCall={handleSend}
      />
      <audio
        ref={audioRef}
        src="https://YOUR-AUDIO-LINK-HERE.mp3"
        type="audio/mpeg"
      />
    </div>
  );
}



//uses by
  //ChatFooterTab.jsx