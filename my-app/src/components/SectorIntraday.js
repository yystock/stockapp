
import React from "react";
import { useEffect, useState } from "react";
import { getSectors, getSectorsPerformance, getSingleSector } from "../utils/stock";
import { Minus, Plus } from "react-feather";
import { Table } from "react-bootstrap";
function SectorIntraday(){
    const sectors = {'XLB':"Non-Energy Minerals", 
                    'XLV':"Health Care and Social Assistance",
                    'XLU':"Utilities",
                    'XLP':"Consumer Non-Durables", 
                    'XLE':"Energy Minerals", 
                    'XLRE':"Real Estate and Rental and Leasing", 
                    'XLI':"Industrial Services",
                    'XLF':"Finance",
                    'XLK':"Technology",
                    'XLY':"Arts, Entertainment, and Recreation",
                    'XLC':"Communications"};
    const [top10Data, setTop10Data] = useState(null);
    const [performanceData, setPerformanceData] = useState(null);
    const [expandedId, setExpandedId] = useState(null);
    
    const handleExpand = (id) => {
        setExpandedId(id === expandedId ? null : id);
    };

    useEffect(() =>{
        // async function getSectorsData(){
        //     const data = await getSectors();
        //     setAllSectorsData(data);
        // }
        async function getSectorsPerformanceData(){
            const data = await getSectorsPerformance();
            setPerformanceData(data);
        }
        // getSectorsData();
        getSectorsPerformanceData();
    }, [])
    useEffect(() =>{

        if(expandedId){
            async function getSingleSectorData(sector){
                const data = await getSingleSector(sector);
               
                const top10Items = data.sort((a, b) => b.changePercent - a.changePercent).slice(0, 10);
            
                setTop10Data(top10Items);
            }
            getSingleSectorData(sectors[expandedId]);
        }
    }, [expandedId])


    return (

        <div className="sector-intraday">
            <h4>Sector Intraday</h4>
            {performanceData &&
            performanceData.map((x) => 
                <div className="sector-item" key={x.symbol}>
                    <div className="sector-title"
                    onClick={() => handleExpand(x.symbol)}>
                        <div>{x.symbol}</div> 
                        <div className="sector-performance" style={{ backgroundColor: x.performance > 0 ? "green":"red" }}>{(x.performance*100).toFixed(2) + '%'}</div>
                        <div className="expand-button">{expandedId === x.symbol ? <Minus/>:<Plus/>}</div>
                    </div>
                    
                    {expandedId === x.symbol && <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Change</th>
                        <th>Volume</th>
                        <th>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                    {top10Data && 
                    top10Data.map((x) => 
                          <tr key={x.symbol}>
                            <td>{x.symbol}</td>
                            <td>{x.latestPrice}</td>
                            <td>{(x.changePercent*100).toFixed(2) + '%'}</td>
                            <td>{x.volume}</td>
                            <td>{x.marketCap}</td>
                        </tr>)
                    }
                    </tbody>
                    </Table>
                    }                  
                </div>
            )        
            } 
        </div>
    )
}

export default SectorIntraday;
