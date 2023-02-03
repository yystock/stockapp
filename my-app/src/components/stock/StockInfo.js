import React from "react";
import { useEffect, useState } from "react";
import { getAdvanced } from '../../utils/stock';

function StockInfo(props){
    const [data, setData] = useState(null);
    useEffect(() => {
   
        async function getAdvancedData(symbol){
            const response = await getAdvanced(symbol);
            setData(response);
        }
        getAdvancedData(props.symbol);

        

    }, [props])
    return( 
        <div>
        {data && 
        <div className="info-section">
           
            <div className="info-box"><h6>PE ratio</h6><p>{data.peRatio}</p></div>
            <div className="info-box"><h6>Revenue</h6><p>{data.revenue}</p></div>
            <div className="info-box"><h6>Market Cap</h6><p>{data.marketcap}</p></div>
            <div className="info-box"><h6>Put Call Ratio</h6><p>{data.putCallRatio}</p></div>
            <div className="info-box"><h6>Dept to Equity</h6><p>{data.debtToEquity}</p></div>
   
        </div>
        }
        </div>
    );
}


export default StockInfo;