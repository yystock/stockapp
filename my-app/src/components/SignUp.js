import React, { useContext, useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { signUpWithEmailAndPassword } from '../firebase/Firebase';
import { AuthContext } from '../firebase/Auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../logo.svg';

function SignUp() {
 
  const { currentUser, loading } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, passwordOne, passwordTwo } = e.target.elements;
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch('Passwords do not match');
      return false;
    }

    try {
      await signUpWithEmailAndPassword(
        name.value,
        email.value,
        passwordOne.value,
      );
      
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (currentUser) navigate("/dashboard");
  }, [currentUser, loading]);
  // if (currentUser) {
    // async function fetchData(){
    //   console.log('function running')
    //   try{
    //     const user = await axios.get(`http://localhost:3008/users/${currentUser.uid}`)          
    //     console.log(user)
    //    }catch(e){
    //     if(e.response.status === 404){
    //       console.log('add to moongo')
    //     const newUser = {
    //       uid: currentUser.uid
    //     }
    //     console.log(newUser)
    //     await axios.post('http://localhost:3008/users', newUser)
        
    //     }
    //   }
    // } 
    // fetchData()
  //   return navigate("/dashboard");
  // }

  return (
    <Container fluid className="login-wrapper">
      <Row className="justify-content-center pt-4 pb-3">
        <Col lg xl = "6">
          <div className="text-center">
              <a href="/">
                <img src={logo} alt="" width="100"/>
              </a>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
          <Col lg xl = "4">
            <Card className="bg-dark text-white" style={{height: "60vh", border: '1rem'}}>
              <div className="text-center px-2">
                <h2 className="fw-bold pt-5 pb-2">Sign Up</h2>
                <p className="text-white-50 pb-4">Let's get started</p>
                {pwMatch && <h4 className="error">{pwMatch}</h4>}
                <Form onSubmit={handleSignUp} >
                  <Form.Group className="d-flex p-3 px-5">
                    <Form.Label visuallyHidden="true">Name</Form.Label>
                    <Form.Control required type="text" name="name" placeholder="Name"/> 
                  </Form.Group>
                  <Form.Group className="d-flex p-3 px-5"> 
                    <Form.Label visuallyHidden="true">Email</Form.Label>
                    <Form.Control required type="email" name="email" placeholder="Email"/> 
                  </Form.Group>
                  <Form.Group className="d-flex p-3 px-5">
                    <Form.Label visuallyHidden="true">Password1</Form.Label>
                    <Form.Control required name="passwordOne" type="password" placeholder="Password"/> 
                  </Form.Group>
                  <Form.Group className="d-flex p-3 px-5 pb-5">
                    <Form.Label visuallyHidden="true">Password2</Form.Label>
                    <Form.Control required name="passwordTwo" type="password"  placeholder="Confirm your Password"/> 
                  </Form.Group>
                  <Button id="submitButton" name="submitButton" type="submit" className="=btn-lg px-5 w-50">
                    Sign Up
                  </Button>
                </Form>
              </div>
            </Card>
        </Col>
      </Row> 
    </Container>
  );
}

export default SignUp;