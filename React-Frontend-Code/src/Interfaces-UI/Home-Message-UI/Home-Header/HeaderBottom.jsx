import GetInputTextArea from '../../UI-Components/GetInputTextArea.jsx';
export default function HeaderBottom() {
 return (
  <>
    <nav class="navbar-bottom" style={{ zIndex: 200 }}id="search-peoples">
     <GetInputTextArea getFor="Home" />
    </nav>
  </>
 );
}
//uses by files
  //HomeHeaderNavTab.jsx