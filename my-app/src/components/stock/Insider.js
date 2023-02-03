import React from "react";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getInsider } from "../../utils/stock";
function NewsTable(props){

    const [data, setData] =useState(null);
    useEffect(() => {
     
        async function getData(symbol){
            const data = await getInsider(symbol);
            setData(data);
        }
        getData(props.symbol);
    }, [props.symbol]) 
    return (   
        <div className="insider-transaction">   
        <h4>Insider Transaction</h4> 
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Price</th>
                <th>Shares</th>
                <th>Value</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {data && 
                    data.map((x) =>  <tr key={x.id}>
                    <td>{x.fullName}</td>
                    <td>{x.transactionCode}</td>
                    <td>{x.transactionPrice}</td>
                    <td>{x.transactionShares}</td>
                    <td>{x.transactionValue}</td>
                    <td>{x.transactionDate}</td>
                   
                </tr>)
            }
            </tbody>
        </Table>
        </div>   
    )
}
export default NewsTable;