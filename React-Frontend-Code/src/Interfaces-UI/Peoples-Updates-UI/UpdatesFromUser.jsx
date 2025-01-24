import ChatHeaderAvtarArrow from '../Chat-Message-UI/Chat-Header/ChatHeaderAvtarArrow.jsx';
export default function UpdatesFromUser() {
 return (
  <>
    <div className="post-by-user">
       <ChatHeaderAvtarArrow forPage="updates" />
       <div className="posted-message-by-user">
         <textarea rows="6" cols=""
           value="Hey! guys, i love to say that it is good day." disabled></textarea>
       </div>
     </div>
     
     <div className="updates-extra-buttons">
      <button className="heart"> <i class="bi bi-suit-heart"></i> </button>
      <button className="comment"> <i class="bi bi-chat-right"></i> </button>
    </div>
  </>
 );
}