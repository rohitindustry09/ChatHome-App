import ChatFooterNavTab from './ChatFooterNavTab.jsx';
import GetInputTextArea from '../../UI-Components/GetInputTextArea.jsx';
import { useRef } from 'react';
import { Footer } from './Footer-Logics/Footer.js';

export default function ChatFooterTab() {
  const textAreaRef = useRef(null);
  const parentRef = useRef(null);
  const imageRef = useRef(null);
  const sendRef = useRef(null);
  
 return (
  <>
   <nav className="ChatFooter navbar-bottom">
      <GetInputTextArea
       refs={textAreaRef}
      />
      <ChatFooterNavTab 
       refs={{ 
        parent: parentRef, 
        image: imageRef, 
        send: sendRef
       }}
      />
      <Footer 
       input={textAreaRef} 
       navigationParent={parentRef} 
       navigationImage={imageRef}
       navigationSend={sendRef}
      />
    </nav>
  </>
 );
}

//uses by
  //ChatFooter.jsx