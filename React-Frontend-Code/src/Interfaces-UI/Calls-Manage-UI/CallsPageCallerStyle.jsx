import ChaHeaderAvtarArrow from '../Chat-Message-UI/Chat-Header/ChatHeaderAvtarArrow.jsx';
import { Link } from 'react-router-dom';
export default function CallsPageCallerStyle() {
  
 return (
  <>
    <nav className="" style={{
       padding: '15px 20px',
       display: 'flex',
       justifyContent: 'space-between',
       alignItems: 'center',
       background: '#fff'
     }}>
       <ChaHeaderAvtarArrow forPage="calls" />
       <Link to="/callThis">
         <i className="bi bi-telephone" style={{
         fontSize: '20px'
         }}></i>
       </Link>
     </nav>
  </>
 );
}

//uses by
  //CallsPage.jsx