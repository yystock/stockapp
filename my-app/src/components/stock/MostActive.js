import React, { useState, useEffect } from 'react';
import { Table, Spinner} from 'react-bootstrap';
import { getMost } from '../../utils/stock';
const MostActive = (props) => {
  const [mostActiveStocks, setMostActiveStocks] = useState([]);
  const [isSpinner, setSpinner] = useState(true);

  useEffect(() => {
    async function getMostData(request){
      const data = await getMost(request);
      setMostActiveStocks(data);
    }
    getMostData(props.request);
    setSpinner(false);
    
  }, []);

  return (
    <div className="list-stocks">
     
      {isSpinner ? (
        <Spinner animation="border" className="spinner" />
      ) : (
        <Table bordered hover variant="dark">
          <thead>
              <tr>
              <th>Ticker</th>
              <th>Last</th>
              <th>Change</th>
              <th>Volume</th>
              </tr>
          </thead>
          <tbody>
            {mostActiveStocks.map((x) => (   
            
              <tr key={x.marketCap}>
                <td>{x.symbol}</td>
                <td>{x.latestPrice.toFixed(2)}</td>
                <td style={{ backgroundColor: x.changePercent > 0 ? "green":"red" }}> {x.changePercent? x.changePercent.toFixed(3) : null}</td>
                <td>{x.volume}</td>
              </tr>
          
            ))}
          </tbody>
        </Table>
      )}
    </div>  
 
  );
};

export default MostActive;