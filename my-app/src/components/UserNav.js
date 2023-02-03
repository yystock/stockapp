import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import { logout } from '../firebase/Firebase';
import {Nav, Navbar, NavDropdown, Button, Alert } from 'react-bootstrap';
import { Users, Eye, BookOpen } from 'react-feather';
import TradeModal from './TradeModal';
import WatchlistModal from './WatchlistModal';

const UserNav = () => {
  
    return (<div className='user-nav-container'><UserNavigation /></div>);
  };
  
  const UserNavigation = () => {
    const { currentUser } = useContext(AuthContext);

    const [message, setMessage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const handleAlert = (message) => {
      setMessage(message);
      setShowAlert(!showAlert);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    };
  
    return (
      <>
      {showAlert && (
        <Alert variant="success" style={{ position: 'fixed', top: '10px', right: '10px' }} onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading> Success! </Alert.Heading>
          <p>
            This is a success alert—check it out!
          </p>
        </Alert>
      )}
      <Navbar className='user-nav align-items-right'>    
        <Nav className="nav-items ms-auto my-1">
        <NavDropdown title={<Eye/>} >
    
          <WatchlistModal onAlert={handleAlert}/>
          
        </NavDropdown>
        <NavDropdown title={<BookOpen/>}>
          <TradeModal onAlert={handleAlert}/>
        </NavDropdown>
        
        <NavDropdown className="text-light d-inline" title={<Users/>} >
            <NavDropdown.Item href="/account"><p>Account</p></NavDropdown.Item>
            <NavDropdown.Item onClick={logout}><p>Logout</p></NavDropdown.Item>                  
        </NavDropdown> 
        </Nav>  
      </Navbar>
      </>

    );
  };

export default UserNav;