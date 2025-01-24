import { Link } from 'react-router-dom';
export default function HomeFooterIcon({ iconClass, iconTitle, LinkTo }) {
 return (
  <>
  <Link to={LinkTo} className="links footer-icon-parent">
   <div className="">
          <span className="footer-with-icon-text">
            <span className="icon">
              <div className="rotating">
                <i className={iconClass}></i>
              </div>
            </span>
            <span className="footer-icon-text">{iconTitle}</span>
          </span>
    </div>
      </Link>
  </>
 );
}

//uses by
  //HomeFooterTab.jsx