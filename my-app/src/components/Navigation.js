import React, { useContext, useState, useEffect } from 'react';
import { Link,  useLocation } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import { logout } from '../firebase/Firebase';
import {Nav, Navbar, NavDropdown, Container, Image} from 'react-bootstrap';
import logo from './logo.svg';

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
        setShowNavbar(false);
    } else {
        setShowNavbar(true);
    }
}, [location]);
  return (showNavbar ? 
          <div> {currentUser ? 
            <Navbar fixed="top" bg="dark">
              <Container>
                <Navbar.Brand href = "/">
                <img src={logo}
                      width="40"
                      height="40"
                      alt="logo" />
                </Navbar.Brand>
        
                <Nav className="nav-items ms-auto my-1 align-items-top">
                <Nav.Link as={Link} to="/premium" className='nav-premium'><p>Premium</p></Nav.Link>
                
                <NavDropdown className="text-light" title={currentUser.displayName} >
                  <NavDropdown.Item href="/account"><p>Account</p></NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}><p>Logout</p></NavDropdown.Item>          
                </NavDropdown>     
                </Nav>
        
              </Container>
            </Navbar> : <NavigationNonAuth />}</div>
          : null);
};

const NavigationNonAuth = () => {
  return (
    <Navbar fixed="top" bg="dark">
        <Container>
          <Navbar.Brand href="/">
          <img
              src={logo}
              width="40"
              height="40"
              alt="logo"
            /></Navbar.Brand>
          <Nav className="nav-items">
            <Nav.Link as={Link} to="/premium" className='nav-premium'><p>Premium</p></Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};

export default Navigation;