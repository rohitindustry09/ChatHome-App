import HomeHeaderNavTab from './Home-Header/HomeHeaderNabTab.jsx';
export default function HomeHeader({ showWithSearch }) {
 return (
  <>
    <header>
      <HomeHeaderNavTab withSearch={showWithSearch}/>
    </header>
  </>
 );
}

//uses by files
  //HomeUI.jsx