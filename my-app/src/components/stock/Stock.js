import React from "react";
import { useEffect, useState } from "react";
import { getStock } from '../../utils/stock';
import MostActive from './MostActive'
import SearchBar from "../SearchBar";
import StockCharts from "../chart/StockCharts";
import StockInfo from "./StockInfo";
import Compare from "./Compare";
import Insider from './Insider';

function Stock(){
    
    const [search, setSearch] = useState("aapl");
    const [error, setError] = useState(false);
    const handleSearch = symbol => {
        if(symbol != search){
            getStock(symbol)
            .then(newStock => {
                if(newStock == 'error'){
                    setError(true)
                }
                else{
                    setSearch(newStock.symbol);
                    setError(false);
                }
            })
            .catch(err => {
                setError(true)
                console.error('error get Stocks', err)});
        }
      };
    return( 
        <div>
            <h1>Stock</h1>  
            <p>This page is supposed to display data of a specific stock. Current data is not accurate</p> 
            <SearchBar onSearch={handleSearch} />  
            <h4>{search}</h4>

            {error?<div className="error">Please enter a valid symbol.</div>
                : 
            <div>
                <StockInfo symbol={search}/>
                <StockCharts symbol={search} range="1y"/>
                
                <Compare symbol1={search} symbol2="spy" range="1y"/>
                <div className="stock-table">
                    <Insider symbol={search}/>
                    <div><h4>Most Active</h4><MostActive request="mostactive"/></div>
                </div>
            </div>}
 
        </div>
    );
}


export default Stock;