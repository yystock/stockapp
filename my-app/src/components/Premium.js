import React from 'react';
import { Container, Row, Col, Card, ListGroup,Button } from 'react-bootstrap';
import Navigation from './Navigation';
function Premium() {
    const data =[
        {
            plan: "Monthly Plan",
            title: "Two Weeks for $20",
            subTitle: "Then $149/month. Auto-renews.",
            list: [
                "Realtime Option Order Flow",
                "Equity Block & Dark Pool Order Data",
                "Alpha Ai Signals",
                'Dark Pool Insights',
                'On-Demand Historical Data.',
                'Trader Chatroom',
                'Top Open Interest Changes',
                'Flow Smart Filtering',
                'Unusual Option Flow Smart Highlighting',
                'Weekly Recap'
            ]
        },
        {
            plan: "Quartly Plan",
            title: "$69/Mon",
            subTitle: "Then $149/month. Auto-renews.",
            list: [
                'Realtime Option Order Flow',
                'Equity Block & Dark Pool Order Data',
                'Alpha Ai Signals',
                'Dark Pool Insights',
                'On-Demand Historical Data.',
                'Trader Chatroom',
                'Top Open Interest Changes',
                'Flow Smart Filtering',
                'Unusual Option Flow Smart Highlighting',
                'Weekly Recap'
            ]
        },
        {
            plan: "Anual Plan",
            title: "Two Weeks for $20",
            subTitle: "Then $149/month. Auto-renews.",
            list: [
                'Realtime Option Order Flow',
                'Equity Block & Dark Pool Order Data',
                'Alpha Ai Signals',
                'Dark Pool Insights',
                'On-Demand Historical Data.',
                'Trader Chatroom',
                'Top Open Interest Changes',
                'Flow Smart Filtering',
                'Unusual Option Flow Smart Highlighting',
                'Weekly Recap'
            ]
        }
    ];

    return ( 
    <>
      <Navigation/>
      <div className='premium-page'>
      <Container className='text-center'>
          <h1>Select a Plan</h1>
          <span>Test run for 2 full weeks for just $20.</span> 
           <span>All plans are all-inclusive. No commitment. Upgrade plans or cancel anytime.</span> 
          <Row className='mt-4'>
              {data && data.map((x) =>
                <Col>
                <Card bg='dark'>  
                    <Card.Body>           
                        <Card.Title>{x.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{x.subTitle}</Card.Subtitle>       
                    </Card.Body>
                    <ListGroup className="list-group-dark">
                        {x.list && x.list.map((y) =>
                            <ListGroup.Item style={{backgroundColor: "#151519", color:"white"}}>{y}</ListGroup.Item>
                        )}
                    </ListGroup>
                    <Card.Body>
                        <Button href="/dashboard/main" style={{backgroundColor: "#F5FF00", color: "black"}}>Get Started</Button>
                        
                    </Card.Body>
                </Card>
                </Col>
              )}    
          </Row>
      </Container>
      </div>
    </> 
    );
}
  
  export default Premium;
