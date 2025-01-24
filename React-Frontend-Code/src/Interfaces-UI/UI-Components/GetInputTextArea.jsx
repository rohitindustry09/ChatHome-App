import { useState } from 'react';
import { addMessage, removeMessage } from '../../features/Chat-Message-todo/MessageTodoSlice.js';
import { setInput } from '../../features/Chat-Message-todo/ChatInputSlice.js';
import { useDispatch, useSelector } from 'react-redux';

export default function GetInputTextArea({ getFor, refs }) {
  const input = useSelector(state=> state.chatInput.input);
  const dispatch = useDispatch();
  function handleChangeForChat(e) {
    if (e.target.value !== '')
    dispatch(setInput(e.target.value));
  }
  
 return (
  <>
    <div className="input-field">
      <i className="bi bi-emoji-sunglasses"></i>
      {
        getFor === 'Home' ?
        <input type="text" 
         placeholder="Search peoples..." />
        :
        <textarea ref={refs} 
         type="text" rows="2" 
         cols="20" id="input" 
         placeholder="Message..."
         value={input}
         onChange={handleChangeForChat}>
        </textarea>
      }
    </div>
  </>
 );
}

//uses by
  //ChatFooterTab.jsx
  //HeaderBottom.jsx