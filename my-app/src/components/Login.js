import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap';
import { getUsers, addUsers } from '../utils/account';
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  sendPasswordReset
} from '../firebase/Firebase';
import logo from './logo.svg';

function Login() {
    const { currentUser, loading } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
      if (currentUser) {
        async function fetchData(){
          const response = await getUsers(currentUser.uid)          
          if(response.response.status === 404){
            const newUser = {
              uid: currentUser.uid
            }
            console.log(newUser)
            addUsers(newUser);
          }
        } 
        fetchData();
        return navigate("/dashboard/main");
      }
    }, [currentUser, loading]);
    return (
      <Container fluid className="login-wrapper">
        <Row className="justify-content-center pt-4 pb-3">
          <Col lg xl = "6">
            <div className="text-center">
                <a href="/">
                  <img src={logo} />
                </a>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg xl = "4">
            <Card className="bg-dark text-white" style={{height: "60vh", border: '1rem'}}>
              <div className="text-center px-2">
                <h2 className="fw-bold pt-5 pb-2">Sign In</h2>
                <p className="text-white-50 pb-4">Please enter your email and password</p>
              
                <Form>
                  <Form.Group className="d-flex p-3 form-white px-5">
                    <Form.Label></Form.Label>
                    <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="d-flex p-3 form-white px-5">
                    <Form.Label></Form.Label>
                    <Form.Control type="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>
                </Form>
                <div className="pt-3 pb-4">
                  <Link to="/reset">Forgot Password</Link>
                </div>
                <Button
                  variant="primary"
                  className="=btn-lg px-5 w-50"
                  id="login_btn"
                  onClick={() => logInWithEmailAndPassword(email, password)}
                >
                  Login
                </Button>
                <div className="d-flex justify-content-center text-center pt-4">
                  <button id="login_google" onClick={signInWithGoogle}>
                    <img src="https://img.icons8.com/color/16/000000/google-logo.png"/>Sign in with Google
                  </button>
                </div>
                
                <div className ="pt-5">
                  Don't have an account? <Link to="/signup">Register</Link> now.
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container> 
    );
  }
  export default Login;