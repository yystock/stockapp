import React from "react";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getNewsFromAV } from "../utils/stock";
import * as moment from "moment";
function NewsAV(props){

    const [newsData, setNewsData] =useState(null);
    useEffect(() => {
      
        async function getNewsData(symbol, limit){
            const data = await getNewsFromAV(symbol, limit);
            setNewsData(data["feed"]);
        }
        getNewsData(props.symbol, props.last);
    }, [props.symbol, props.limit]) 
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
                    newsData.map((x) =>  <tr key={x.title}>
                    <td>{moment(x.time_published, 'YYYYMMDDTHHmmss').toDate().toString()}</td>
                    <td>{props.symbol}</td>
                    <td><a href={x.url}>{x.title}</a></td>
                </tr>)
            }
            </tbody>
        </Table>
    )
}
export default NewsAV;