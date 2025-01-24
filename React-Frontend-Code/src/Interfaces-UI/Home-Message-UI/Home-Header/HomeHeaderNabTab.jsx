import HeaderTop from './HeaderTop.jsx';
import HeaderBottom from './HeaderBottom.jsx';

export default function HomeHeaderNabTab({ withSearch=false }) {
 return (
  <>
    <nav className="Home-nav">
      <HeaderTop />
      {
        withSearch ? <HeaderBottom /> : <></>
      }
    </nav>
  </>
 );
}

//uses by files
  //HomeHeader.jsx
  //CallsPage.jsx
  //UpdatesPage.jsx