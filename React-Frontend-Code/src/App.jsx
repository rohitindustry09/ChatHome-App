import { createBrowserRouter, RouterProvider, Outlet, useLocation, matchPath } from 'react-router-dom';
import HomeUI from './Interfaces-UI/Home-Message-UI/HomeUI.jsx';
import HomeHeader from './Interfaces-UI/Home-Message-UI/HomeHeader.jsx';
import HomeFooter from './Interfaces-UI/Home-Message-UI/HomeFooter.jsx';
import ChatUI from './Interfaces-UI/Chat-Message-UI/ChatUI.jsx';
import CallsPage from './Interfaces-UI/Calls-Manage-UI/CallsPage.jsx';
import UpdatesPage from './Interfaces-UI/Peoples-Updates-UI/UpdatesPage.jsx';
//import MyProfile from './Interfaces-UI/Profile-UI/MyProfile.jsx';
import SignupLoginTab from './Interfaces-UI/auth/SignupLoginTab.jsx';
import Profile from './Interfaces-UI/Profile-UI/Profile.jsx';
import PrivateRoute from './Outlets/PrivateRoute.jsx';
import PublicRoute from './Outlets/PublicRoute.jsx';
import DemoDoing from './DemoDoing.jsx'
import './App.css';

function Layout() {
  const location = useLocation();
  const hideHeaderFooterRoutes = ['/signup-or-login'];
  const isHomeRoute = location.pathname === '/';
  const hideFooterRoute = ['/profile/:id'];

  // Use matchPath for dynamic routes
  const isChatWithRoute = matchPath('/ChatWith/:id', location.pathname);

  const hideHeaderFooter =
    hideHeaderFooterRoutes.includes(location.pathname) || isChatWithRoute;
  const hideFooter = hideFooterRoute.includes(location.pathname);
  return (
    <>
      {!hideHeaderFooter && <HomeHeader showWithSearch={isHomeRoute} />}
      <Outlet />
      {!hideHeaderFooter && !hideFooter && <HomeFooter />}
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      { 
        path: '/', 
        element: 
          <PrivateRoute redirectTo="/signup-or-login">
            <HomeUI /> 
          </PrivateRoute>
      },
      { path: '/ChatWith/:id', element: <ChatUI /> },
      { path: '/calls-recents', element: <CallsPage /> },
      { path: '/updates', element: <UpdatesPage /> },
      { 
        path: '/profile/:id', 
        element: 
          <PrivateRoute redirectTo="/signup-or-login">
            <Profile />
          </PrivateRoute>
      },
      { 
        path: '/signup-or-login', 
        element: 
          <PublicRoute redirectTo="/">
            <SignupLoginTab />
          </PublicRoute>
      },
      { 
        path: '/Call/:id',
        element: <h1 style={{ position: 'relative', top: '100px', textAlign: 'center'}}>Its on Working State...</h1>
      }, 
      {
        path: 'demo',
        element: <DemoDoing />
      }
    ]
  }
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
