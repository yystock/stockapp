import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import { AuthContext } from '../firebase/Auth';
import { getHoldings, getTrades, getUsers, resetUsers } from "../utils/account";
import { getList } from "../utils/stock";
import { sendPasswordReset } from "../firebase/Firebase";
import Navigation from "./Navigation";
function Account(){
    const [holdings, setHoldings] = useState(null);
    const [user, setUser] = useState(null);
    const [trades, setTrades] = useState(null);
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
      
        async function getHoldingsData(id){
            const response = await getHoldings(id); 
            const data = response.data;
            if(data){
                const stockList = [];
                data.map((x) => stockList.push(x.symbol));
                const stock = await getList(stockList);
                
                stock.forEach(x => {
                    data.forEach(y => {
                        if(x.symbol.toUpperCase() == y.symbol.toUpperCase()){                  
                            y['currentPrice'] = x['latestPrice'];
                            y['changePercent'] = ((y['currentPrice'] - y['price']) /y['price'] *100).toFixed(2) + '%';
                            y['value'] = (y['currentPrice'] * y['shares']).toFixed(2);
                            y['profit'] = ((y['currentPrice'] - y['price']) * y['shares']).toFixed(2);
                        } 
                    })
                })    
                setHoldings(data);
            }
        }
        async function getTradingData(id){
            const response = await getTrades(id);
            if(response.data){
                setTrades(response.data)
            }
            
        }

        async function getUserData(id){
            const response = await getUsers(id);    
            setUser(response.data);
            
        }
        getHoldingsData(currentUser.uid);
        getTradingData(currentUser.uid);
        getUserData(currentUser.uid);

    }, [])

    async function handleReset(){
        console.log("hh")
        const response = await resetUsers(currentUser.uid);
        console.log("response:", response)
        setHoldings(null);
        setTrades(null);
        window.location.reload();
    }

    return (
        <Container className="account-page">
            <Navigation/>
            <Row className="mt-5 pt-5">
            <h1>Account Page</h1>
            </Row>
            {user &&
            <Row className="my-4">
                <Col>
                    <h4>{currentUser.displayName}</h4>
                    <h6>Balance: {user.balance}</h6>
                    <h6>Account Value: {holdings ? (user.balance + holdings.reduce((total, obj) => total + Number(obj.value), 0)) : user.balance}</h6>
                    <h6>Number of Holdings: {holdings && holdings.length}</h6>
                    <h6>Number of Trades: {trades && trades.length}</h6>
                </Col>
                <Col className="justify-items-start">
                    <Button variant="dark" onClick={() => sendPasswordReset(currentUser.email)}>Reset Password</Button>
                    <Button variant="dark" onClick={() => handleReset()}>Reset Account</Button>
                </Col>
            </Row>
            }
            <h4>Holdings</h4>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Symbol</th>
                    <th>Average Price</th>
                    <th>Shares</th>
                    <th>Total</th>
                    <th>Current Price</th>
                    <th>Change %</th>
                    <th>Value</th>
                    <th>Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {holdings && 
                        holdings.map((x) =>  <tr key={x._id}>
                        <td>{x.symbol}</td>
                        <td>{x.price}</td>
                        <td>{x.shares}</td>
                        <td>{x.total}</td>
                        <td>{x.currentPrice}</td>
                        <td>{x.changePercent}</td>
                        <td>{x.value}</td>
                        <td>{x.profit}</td>
                    </tr>)
                }
                </tbody>
            </Table>
            <h4>Trades</h4>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Symbol</th>
                    <th>Action</th>
                    <th>Price</th>
                    <th>Shares</th>
                    <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {trades && 
                        trades.map((x) =>  <tr key={x._id}>
                        <td>{x.date}</td>
                        <td>{x.symbol}</td>
                        <td>{x.action}</td>
                        <td>{x.price}</td>
                        <td>{x.shares}</td>
                        <td>{x.total}</td>
                    </tr>)
                }
                </tbody>
            </Table>
        </Container>   
    )
}

export default Account;