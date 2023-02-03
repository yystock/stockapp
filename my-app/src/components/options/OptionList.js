import React from "react";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { getOptions, getOptionsList } from '../../utils/options';
import * as moment from "moment";
import { Minus, Plus } from "react-feather";
function OptionList(props){
    const date=['20230217','20230317','20230421','20230519','20230616','20230721','20230818','20230915']
    const [optionsData, setoptionsData] =useState(null);

    const [expandedId, setExpandedId] = useState(null);
    const [side, setSide] = useState('call');
    
    
    const handleExpand = (id) => {
        setExpandedId(id === expandedId ? null : id);
    };
    const handleSide = (side) => {
        setSide(side);
    };
    useEffect(() => {
        async function getOptionsData(symbol){
            const response = await getOptions(symbol);
        } 
        getOptionsData(props.symbol)    
    }, [props.symbol]) 

    useEffect(() => {
        if(expandedId){
            async function getOptionsListData(symbol, date, side){
                const data = await getOptionsList(symbol, date, side);
                data.sort((a, b) => a.strikePrice - b.strikePrice);
                setoptionsData(data);
            }
            getOptionsListData(props.symbol, expandedId, side);
        }
        
    }, [expandedId, side]) 
    return (       
        <div>
        {date.map((x) => 
            <div className="option-item" key={x}>
                <div className="option-title"
                onClick={() => handleExpand(x)}>
                    <div>{x}</div>                      
                    <div className="expand-button">{expandedId === x ? <Minus/>:<Plus/>}</div>
                </div>                  
                {expandedId === x &&
                <div className="table-area">
                    <div className="switch-button">
                    <button className={side =='call' ?"btn-active":"btn-inactive"} onClick={() => handleSide("call")}>Call</button>
                     <button className={side =='put' ?"btn-active":"btn-inactive"} onClick={() => handleSide("put")}>Put</button>
                    </div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Symbol</th>
                        <th>Strike Price</th>
                        <th>Side</th>   
                        <th>Change</th>   
                        <th>Open</th>                 
                        <th>Close</th>
                        <th>Open Interest</th>
                        <th>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {optionsData && 
                            optionsData.map((y) =>  <tr key={y.id}>
                            <td>{y.symbol}</td>
                            <td>{y.strikePrice}</td>
                            <td>{y.side}</td>
                            <td>{((y.close-y.open)/y.open*100).toFixed(2)+"%"}</td>
                            <td>{y.open}</td>
                            <td>{y.close}</td>
                            <td>{y.openInterest}</td>
                            <td>{y.volume}</td>
                        </tr>)
                            }
                    </tbody>
                </Table>
                </div>
                }
            </div>
        )}
        </div>    
    )
}
export default OptionList;