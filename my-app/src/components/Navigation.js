import React, { useContext } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import '../App.css';
import { logout } from '../firebase/Firebase';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

const SignOutButton = () => {
  return (
    <button type="button" onClick={logout}>
      Sign Out
    </button>
  );
};

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  
  
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  const { currentUser } = useContext(AuthContext);
  console.log("Nav:", currentUser)
  console.log(currentUser.displayName)
  return (
    <Navbar bg="dark" variant="dark">
      
      <Container>
        <Navbar.Brand href = "/">
        <img src={logo} 
              width="40"
              height="40"
              className="d-inline-block align-top" 
              alt="logo" />
        </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav"> */}
            
              <Nav className="nav-items ms-auto my-1 align-items-center">
           
              <Link to="/">Landing</Link>
              <Link to="/home">Home</Link>
              <NavDropdown className="text-light" title={currentUser.displayName} >
                <NavDropdown.Item href="/login">Account</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                
                
              </NavDropdown>

              </Nav>
            
          {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>

  );
};

const NavigationNonAuth = () => {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
          <img
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="logo"
            /></Navbar.Brand>
          <Nav className="nav-items">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            
          </Nav>
        </Container>
      </Navbar>
  );
};

export default Navigation;