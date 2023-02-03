import { useState, useEffect } from "react";
import { getList } from "../utils/stock";
function LiveData(){
    const [stockData, setStockData] = useState(null);
    useEffect(() =>{
        async function getStockData(symbol){
            const data = await getList(symbol);
            setStockData(data);
        }
        getStockData("AAPL,MSFT,GOOG,TSLA,BABA,AMZN,NFLX,ENPH")
    }, [])
    
    return(
    <div className="live-data">
    {stockData && stockData.map((x) => <div key={x.symbol} className ="stock-ticker"><p>{x.symbol}</p><p style={{ color: x.changePercent > 0 ? "green":"red" }}>{(x.changePercent*100).toFixed(2) + '%'}</p></div>)}

    </div>);
}

export default LiveData;    