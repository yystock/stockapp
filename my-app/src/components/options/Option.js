import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import OptionList from "./OptionList";
import OptionFlowBar from "./OptionFlowBar";
import { getOptions } from "../../utils/options";
import OptionStrikeOI from "./OptionStrikeOI";
function Option(){
    const [search, setSearch] = useState("aapl");
    const [error, setError] = useState(false);
    const handleSearch = (searchInput) => {
        getOptions(searchInput)
          .then(newStock => {
                setSearch(searchInput);
     
                if(newStock == "error"){
                    setError(true);
                }else{
                    setError(false);
                } 
          })
          .catch(err => {

              console.error('error get Options', err)
            });

      }
    return (
        <div className="option-page">
            <h1>Option</h1>  
            <p>This page displays option data of a specific stock</p> 
            <SearchBar onSearch={handleSearch} />  
            {error ? <div className="error">Please enter a valid symbol.</div>
                : 
            <div className="option-section">
                <OptionList symbol={search}/>
                <OptionFlowBar symbol={search}/>
                <OptionStrikeOI symbol={search}/>
            </div> 
           

            }
        </div>   
    )
}


export default Option;