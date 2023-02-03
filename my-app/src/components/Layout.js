import React from 'react';
import { Outlet} from 'react-router-dom';
import UserNav from './UserNav';
import SideBar from './SideBar';

function Layout() {

    return (  
      <div className='layout'>
        <SideBar/>       
        <div className='page'>
          <UserNav/> 
          <div className='main-content'>  
   
          <Outlet/> 
          </div>
        </div> 
      </div>

    );

  }
  
  export default Layout;
