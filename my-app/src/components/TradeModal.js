import React, { useState, useContext, useEffect } from 'react';
import { Modal, Form, Button,Table  } from 'react-bootstrap';
import { addTrade, getHoldings } from '../utils/account';
import { AuthContext } from '../firebase/Auth';
import { Plus } from 'react-feather';
import { getStock, getList } from '../utils/stock';


function TradeModal(props) {
    const [amount, setAmount] = useState(0);
    const [prices, setPrices] = useState(0);
    const [shares, setShares] = useState(0);
    const [holdings, setHoldings] = useState(null);
    const [show, setShow] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const handleShow = () => setShow(!show);
    
    async function getHoldingsData(id){
        const response = await getHoldings(id);

        if(response.data){
            const stockList = [];
            response.data.map((x) => stockList.push(x.symbol));
            const stock = await getList(stockList);
            setHoldings(stock);
        }
      }
        useEffect(() =>{
            getHoldingsData(currentUser.uid)
        }, []);
  
    
    const handleCalculate = (e) =>{
        if(e.target.name == "price"){
            setPrices(e.target.value);
            setAmount(e.target.value * shares);
        }
        if(e.target.name == "shares"){
            setShares(e.target.value);
            setAmount(e.target.value * prices);

        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { action, symbol, price, shares, total } = e.target.elements;
        const response = await getStock(symbol.value);
        if(response == 'error'){
            setError(true);
        }else{
            setError(false);
            const currentDate = new Date().toISOString().split("T")[0];   
            const newData = { 
                "userId": currentUser.uid,
                "date":currentDate, 
                "action":action.value, 
                "symbol":symbol.value.toUpperCase(), 
                "price": price.value, 
                "shares":shares.value, 
                "total":amount, 
                "status": "succesful"
            };
          
            const response = await addTrade(newData);
  
            if(response.data){
                getHoldingsData(currentUser.uid);  
                setShow(false);
                props.onAlert("success");
                
            }
            else{
                console.log("error")
                props.onAlert("error");
            }     
            setAmount(0);
          
          
        }
      };
      
  return (
    <div className='dropdown-holdings'>
        <Button onClick={handleShow}>
        <Plus/>
            Add Trade
        </Button>
        <Modal show={show} onHide={handleShow}>
            <Modal.Header  closeButton closeVariant='white' style={{backgroundColor: '#151519'}}>
            <Modal.Title>Add Trade</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
            <Modal.Body style={{backgroundColor: '#151519'}}>
            
                <Form.Group className="mb-3">
                <Form.Label>Symbol</Form.Label>
                <Form.Control required type="text" name="symbol" placeholder="Symbol" autoFocus/> 
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Select as="select" name="action"  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label >Price</Form.Label>
                <Form.Control required type="number" name="price" placeholder="Prices" defaultValue={0} onChange={handleCalculate}/> 
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Shares</Form.Label>
                <Form.Control required type="number" name="shares" placeholder="Shares" defaultValue={0} onChange={handleCalculate}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" value={amount} readOnly/>
                </Form.Group>
            
            </Modal.Body>
            <Modal.Footer  style={{backgroundColor: '#151519'}}>
                <Button id="submitButton" name="submitButton" type="submit">
                    Submit
                </Button>
                {error && <p className='error'>Please enter a valid ticker</p>}
            </Modal.Footer>
            </Form>
        
        </Modal>
          {holdings ? <Table variant="dark">
            <thead>
                  <tr>
                  <th>Symbol</th>
                  <th>Change</th>
       
                  </tr>
              </thead>
              <tbody>
                  {holdings.map((x) =>  <tr key={x.symbol}>
                      <td>{x.symbol}</td>
                      <td>{(x.changePercent*100).toFixed(2) + '%'}</td>
                 
                  </tr>)
                    }
              </tbody>
          </Table> : <p className='error'>No data</p>
          }
          
    </div> 
      

  );
}

export default TradeModal;