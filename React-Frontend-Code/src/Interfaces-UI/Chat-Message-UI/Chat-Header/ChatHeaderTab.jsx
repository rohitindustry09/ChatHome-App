import ChaHeaderAvtarArrow from './ChatHeaderAvtarArrow.jsx';
export default function ChatHeaderTab() {
 return (
  <>
    <nav className="chat-navbar">
      <ChaHeaderAvtarArrow forPage='chat'/>
      <nav className="nav-call-with-video">
        <i className="bi bi-telephone"></i>
        <i className="bi bi-camera-video"></i>
        <i className="bi bi-three-dots-vertical"></i>
      </nav>
     </nav>
  </>
 );
}

//uses by 
  //ChatHeader.jsx