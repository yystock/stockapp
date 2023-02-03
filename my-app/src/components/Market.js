import React, {useEffect, useState} from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Form from 'react-bootstrap/Form';
import {getStocksDB} from '../utils/stock'
import * as moment from "moment";
import _ from 'lodash';


function Market(){
 
    const bg_color = '#222838'
    const default_color = 'rgb(209, 212, 220)';
    const up_color = '#26a69a';
    const down_color = '#f44336';
    const [data, setData] = useState({});
    const [interval, setInterval] = useState(['hour', 1]);
    const handleIntervalChange = (e) => {
        switch (e.target.value) {
            case "5min":
                setInterval(['minute', 5]);
                break;
            case "1d":
                setInterval(['day', 1]);
                break;
            case "1wk":
                setInterval(['week', 1]);
                break;
            case "1mo":
                setInterval(["month", 1]);
                break;
            default:
                setInterval(['hour', 1]);
                break;
        }
    }
    const [options, setOptions] = useState({
        xAxis: [{labels: {style:{color: default_color}}}],
        yAxis: [
          {
            height: "85%",
            labels: {style:{color: default_color}, align: 'right',x: -3},
          },
          {
            top: "85%",
            height: "15%",
            offset: 0,
            labels: {align: 'right', style: {color: default_color},x: -3},
          }
        ],
        rangeSelector: {
            enabled: false
        },
        credits: {
            enabled: false
        },

        chart:{
            backgroundColor: bg_color,
            zoomType: 'x'
        },
        plotOptions:{
            candlestick:{
                color: down_color,
                lineColor: down_color,
                upColor: up_color,
                upLineColor: up_color,
                pointPadding: 0.05,
                groupPadding: 0.1,
            }
        },
      
        series: [
          {
            data: [],
            type: "ohlc",
            name: `SPY Stock Price`,
            id: 'SPY-series',
        },{
            type: 'column',
            name: 'Volume',
            data: [],
            color: 'white',
            yAxis: 1,
        }
        ]
      });
  
    useEffect(() => {
        async function prepareData(symbol, range){
            const data = await getStocksDB(symbol, range);
            setData(data);
        }
        prepareData("SPY", "2022");
    }, []) 
    
    useEffect(() => {

        if(data.data){
            setOptions((prevState) =>{return({
                ...prevState,
                
                series: [
                    {
                        type: "candlestick",
                        data: data.data,
                        dataGrouping:{
                            units: [[
                                interval[0],
                                [interval[1]]
                            ]]
                        }
                    },
                    {
                        type: "column",
                        data: data.volume,
                        color: "white",
                        name: 'Volume',
                        dataGrouping: {
                            forced:true,
                            units: [[
                                interval[0],
                                [interval[1]]
                            ]]
                        },
                        yAxis: 1
                    }           
                ]               
            });});
        }
                
      
    }, [data, interval])
    return(
        <div className="market-page">
        <h1>Market overview - SPY</h1>
        <div className="stock-chart">
            
            <Form.Select className="time_dropdown" 
            style={{width:"10%", backgroundColor: "black", color: "white"}}
                defaultValue="1hr" 
                onChange={handleIntervalChange} >
                <option value="5min">5 minutes</option>
                <option value="1hr">1 hour</option>
                <option value='1d'>1 Day</option>
                <option value='1wk'>1 Week</option>
                <option value='1mo'>1 Month</option>
            </Form.Select>
            <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
            />          
        </div></div>)
}


export default Market;