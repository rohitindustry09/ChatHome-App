import { Link } from 'react-router-dom';

export default function HomeFooterIcon({ iconClass, iconTitle, LinkTo, isActive }) {
  return (
    <Link
      to={LinkTo}
      className="links footer-icon-parent"
    >
      <div>
        <span className="footer-with-icon-text">
          <span className={`icon ${isActive ? 'active-footer' : ''}`}>
          <div className='rotating' style={{
            color: isActive ? '#7a12ff': 'black'
          }}>

              <i className={iconClass}></i>
            </div>
          </span>
          <span className="footer-icon-text">{iconTitle}</span>
        </span>
      </div>
    </Link>
  );
}


//uses by
  //HomeFooterTab.jsx