import React from "react";
import { useEffect, useState } from "react";
import { getOptionsList } from "../../utils/options";
import * as moment from "moment";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

function OptionStrikeOI(props){
    const date=['20230217','20230317','20230421','20230519']
    const [data, setData] =useState(null);
    const [category, setCategory] = useState(null);
    const [options, setOptions] = useState({
        chart: {
            type: 'column',
            backgroundColor: '#151519'     
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
          },
    
        xAxis: [{
            categories: category,
           
            labels: {style:{color: '#BEBEBE'}}
    
        }, 
        ],
        yAxis: {
            title: {
                text: null
            },
            labels: {style:{color: '#BEBEBE'}}
        },
        colors: ['#21CC6D', '#E24648'],

        series: []

    });
    const [selectedItem, setSelectedItem] = useState('20230317');
    const handleChange = (event) => {
      setSelectedItem(event.target.value);
    };
    useEffect(() => {
        const d = [{name: "call", data:[80, 70, 90, 100, 50, 20, 90, 88, 55]}, 
        {name:"put", data:[22, 33, 55, 44, 55, 100, 200, 300, 77]}];
        let categories = [120, 130, 140, 150, 160, 170, 180, 190, 200];
        // async function getOptionsListData(symbol, date, side){
        //     const data1 = await getOptionsList(symbol, date, side);
        
        //     data1.sort((a, b) => a.strikePrice - b.strikePrice);
        //     if(side=='call'){
        //         data1.map((x)=> {
        //             d[0].data.push(x.openInterest);          
        //             categories.push(x.strikePrice);
        //         });
            
        //     }
        //     else{
        //         data1.map((x)=> {
        //             d[1].data.push(x.openInterest);
        //             categories.push(x.strikePrice);
        //         });
                
        //     }
        // }
       
        // getOptionsListData(props.symbol, selectedItem, "call");
        // getOptionsListData(props.symbol, selectedItem, "put");
        // console.log(Array.from(new Set(categories)));        
        setCategory(categories);
        setData(d);      
    }, [props.symbol, selectedItem]) 
    useEffect(() => {
        if(data){
            setOptions((prevState) =>{return({
                ...prevState,
                xAxis: [{
                    categories: category,
                }],
                series: data   
            });});
        }
    }, [data]);
    
    return(<div className="option-strike-oi">
        <h4>Open Interest By Strikes</h4>
        <p>AAPL's aggregated and expiration-level open interest for each strike price. Current selection is Aggregated OI.</p>
        <select value={selectedItem} onChange={handleChange}>
            <option value="20230217">20230217</option>
            <option value="20230317">20230317</option>
            <option value="20230421">20230421</option>
            <option value="20230519">20230519</option>
        </select>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />

    </div>);
}
export default OptionStrikeOI;