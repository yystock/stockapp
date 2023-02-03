import React, { useState, useContext, useEffect } from 'react';
import {  Modal, Form, Button,Table  } from 'react-bootstrap';
import { Plus } from 'react-feather';
import { getStock, getList } from '../utils/stock';
import { AuthContext } from '../firebase/Auth';
import { addWatchlist, getWatchlist } from '../utils/account';

function WatchlistModal(props) {
    const { currentUser } = useContext(AuthContext);
    const [show, setShow] = useState(false); 
    const [watchlist, setWatchlist] = useState(null); 
    const [error, setError] = useState(false); 
    const handleShow = () => setShow(!show);
    async function getWatchlistData(id){
        const response = await getWatchlist(id);
        if(response.data){
            const stockList = [];
            response.data.map((x) => stockList.push(x.symbol));
            const stock = await getList(stockList);
            setWatchlist(stock);
        }
    }
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { symbol } = e.target.elements;
        const response = await getStock(symbol.value);
        if(response == 'error'){
            setError(true);
        }
        else{
            setError(false);
            async function addWatchlistData(userId, symbol){
                const response = await addWatchlist(userId, symbol);
                if(response.data){
                    getWatchlistData(currentUser.uid);                 
                    props.onAlert("success");
                }
                else{
                    console.log("error")
                    props.onAlert("error");
                }       
            } 
            addWatchlistData(currentUser.uid, symbol.value.toUpperCase());
            setShow(false);
        }
      };
    useEffect(() =>{
        getWatchlistData(currentUser.uid);
      }, [])

      
  return (
    <div className='dropdown-watchlist'>
        <Button onClick={handleShow} className='watchlist-btn'>
        <Plus/>
        Add Watchlist
        </Button>
        <Modal size='sm' show={show} onHide={handleShow}>
            <Modal.Header  closeButton closeVariant='white' style={{backgroundColor: '#151519'}}>
            <Modal.Title>Add Watchlist</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
            <Modal.Body style={{backgroundColor: '#151519'}}>
            
                <Form.Group className="mb-3">
                <Form.Label>Symbol</Form.Label>
                <Form.Control required type="text" name="symbol" placeholder="Symbol" autoFocus/> 
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
        {watchlist? <Table variant="dark">
        <thead>
                <tr>
                <th>Symbol</th>
                <th>Price</th>
                <th>Change</th>
    
                </tr>
            </thead>
            <tbody>
                {watchlist.map((x) =>  <tr key={x.symbol}>
                    <td>{x.symbol}</td>
                    <td>{x.latestPrice}</td>
                    <td>{(x.changePercent*100).toFixed(2) + '%'}</td>
                </tr>)
            }
            </tbody>
        </Table> : <p className='error'>No data</p>
    }
    
  </div>

  );
}

export default WatchlistModal;