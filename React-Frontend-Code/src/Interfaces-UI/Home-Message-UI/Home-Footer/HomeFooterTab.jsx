import HomeFooterIcon from './HomeFooterIcon.jsx';
import { Link } from 'react-router-dom';
export default function HomeFooterTab() {
 return (
  <>
    <div class="footer-navigation">
      <HomeFooterIcon 
        iconClass="bi bi-chat-left-text"
        iconTitle="Chats"
        LinkTo="/"
      />
      <HomeFooterIcon 
        iconClass="bi bi-ubuntu"
        iconTitle="Updates"
        LinkTo="/updates"
      />
      <HomeFooterIcon 
        iconClass="bi bi-telephone"
        iconTitle="Calls"
        LinkTo="/calls-recents"
      />
    </div>
  </>
 );
}

//uses by
  //HomeFooter.jsx