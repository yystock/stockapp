import React from "react";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getNews } from "../utils/stock";
function NewsTable(props){

    const [newsData, setNewsData] =useState(null);
    useEffect(() => {
     
        async function getNewsData(symbol, last){
            const data = await getNews(symbol, last);
            setNewsData(data[props.symbol.toUpperCase()].news);
        }
        getNewsData(props.symbol, props.last);
    }, [props.symbol, props.last]) 
    return (          
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Time</th>
                <th>Symbol</th>
                <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {newsData && 
                    newsData.map((x) =>  <tr key={x.headline}>
                    <td>{new Date(x.datetime).toLocaleString()}</td>
                    <td>{props.symbol}</td>
                    <td>{x.headline}</td>
                </tr>)
            }
            </tbody>
        </Table>
    )
}
export default NewsTable;