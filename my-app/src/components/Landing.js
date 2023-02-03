import React from "react";
import { Button } from "react-bootstrap";
import Navigation from './Navigation'
function Landing(){
    
    return (
        <>
        <header >
            <Navigation/>
            
        </header>
        <div className="landing-page">
            <section className="landing-content">
                <h2>Real-time Option Order Flow.</h2>
                <h6>Alert notable orders take place on the stock and equity options markets.</h6>
                <h6>Remove the noise and zone in on what truly matters.</h6> 
                <Button href="/dashboard/main"
                        className="mt-3"
                        style={{border:"none",
                                backgroundColor:"black", 
                                color:"white"}}>Try it</Button>
             </section>
         </div >

         </>);
}


export default Landing;