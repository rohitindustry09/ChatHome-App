import HomeHeaderNabTab from '../Home-Message-UI/Home-Header/HomeHeaderNabTab.jsx';
import UpdatesFromUser from './UpdatesFromUser.jsx';
import './UpdatesPage.css';
import HomeFooter from '../Home-Message-UI/HomeFooter.jsx';
export default function UpdatesPage() {
 return (
  <>
   <main style={{
       padding: '60px 10px 20px 10px',
       display: 'flex',
       flexDirection: 'column',
       rowGap: '10px',
       background: '#eaeaea',
       margin: '0 0 70px 0'
     }}>
     <h1> Best wishes !</h1>
      <div style={{
        padding: '10px 0'
      }}>
        <UpdatesFromUser />
      </div>
      <div style={{
        padding: '10px 0'
      }}>
        <UpdatesFromUser />
      </div>
      <div style={{
        padding: '10px 0'
      }}>
        <UpdatesFromUser />
      </div>
      <div style={{
        padding: '10px 0'
      }}>
        <UpdatesFromUser />
      </div>
      <div style={{
        padding: '10px 0'
      }}>
        <UpdatesFromUser />
      </div>
   </main>

  </>
 );
}