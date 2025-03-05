import avtarImage from './avtar.png';
import { useRef, useEffect } from 'react';
import { Navbar } from './Header-Logics/Navbar.js';
import { Link } from 'react-router-dom';
export default function HeaderTop() {
  let navbarRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user'));
 return (
  <>
    <nav class="navbar-home navbar-styled" id="navbar" ref={navbarRef}>
      <nav class="navbar-top">
        <h2> ChatHome </h2>
        <div class="nav-avtar-icons">
        {
          user ? 
          <>
           <div class="avtar-img">
            <Link to={`/profile/${user?._id}`}>
             <img src={user.avatar} alt="image"/>
            </Link>
           </div>
           <button style={{
             border: 'none',
             padding: '5px',
             fontSize: '15px',
             borderRadius: '5px'
           }}>
            <i class="bi bi-three-dots-vertical"></i>
           </button>
          </>
           : 
            <Link to="/signup-or-login" class="links">
              <button class="SignupBtn">
                
             <span class="SignupBtn-text" style={{
               letterSpacing: '1px',
               fontSize: '15px',
               fontWeight: 'bold',
               display: 'flex',
               alignItems: 'center'
             }}> Signup </span>
              </button>
            </Link>
        }
        </div>
      </nav>
    </nav>
    {/*logic Navbar.js*/}
    <Navbar navbarRef={navbarRef} />
  </>
 );
}
//uses by files
  //HomeHeaderNavTab.jsx