import HomeFooterIcon from './HomeFooterIcon.jsx';
import { useLocation } from 'react-router-dom';

export default function HomeFooterTab() {
  const location = useLocation();

  return (
    <div className="footer-navigation" style={{ zIndex: '500 !important' }}>
      <HomeFooterIcon 
        iconClass="bi bi-chat-left-text"
        iconTitle="Chats"
        LinkTo="/"
        isActive={location.pathname === "/"}
      />
      <HomeFooterIcon 
        iconClass="bi bi-ubuntu"
        iconTitle="Updates"
        LinkTo="/updates"
        isActive={location.pathname === "/updates"}
      />
      <HomeFooterIcon 
        iconClass="bi bi-telephone"
        iconTitle="Calls"
        LinkTo="/calls-recents"
        isActive={location.pathname === "/calls-recents"}
      />
    </div>
  );
}


//uses by
  //HomeFooter.jsx