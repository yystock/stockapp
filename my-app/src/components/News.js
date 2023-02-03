import React from "react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import NewsTable from "./NewsTable";
import NewsAV from "./NewsAV";
function News(){
    const [search, setSearch] = useState("aapl");
    const handleSearch = (searchInput) => {
        setSearch(searchInput)
        console.log(`Searching for ${searchInput}...`);
    }
    return (
        <div className="news-page">
            <h1>News</h1>  
            <p>This page displays market news and allows user to search news of a specific stock</p> 
            <SearchBar onSearch={handleSearch} />  
            <div className="news-section">
                <div>
                    <h3>News From IEXCloud</h3>
                <NewsTable symbol={search} last="20"/>
                </div>
                <div className="av-news">
                <h3>News From AlphaVantage</h3>
                <NewsAV symbol={search} limit="20"/>
                </div>         
            </div> 
        </div>   
    )
}


export default News;