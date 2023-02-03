import React, {useEffect, useState} from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Indicators from "highcharts/indicators/indicators-all.js";
import PriceIndicator from "highcharts/modules/price-indicator.js";
import FullScreen from "highcharts/modules/full-screen.js";
import { Spinner, Form} from 'react-bootstrap';
import { getChart } from '../../utils/stock';
import * as moment from "moment";
Indicators(Highcharts);
PriceIndicator(Highcharts);
FullScreen(Highcharts);

const preData = (data) =>{
    let ohlc = [],
    volume = [];
    data.map((x) =>{
        ohlc.push([
            Number(moment(x['date']).format('x')), // the date
            x['open'], // open
            x['high'], // high
            x['low'], // low
            x['close'] // close
        ]);
        volume.push([Number(moment(x['date']).format('x')), x.volume]);
    });
    return {data: ohlc, volume: volume};
};
function HighCharts(props){
    const [symbolAndRange, setSymbolAndRange] = useState([props.symbol, props.range]);
    const [spinner, setSpinner] = useState(true)
    const bg_color = '#222838'
    const default_color = 'rgb(209, 212, 220)';
    const up_color = '#26a69a';
    const down_color = '#f44336';

    const [data, setData] = useState({});
    const [interval, setInterval] = useState(['day', 1]);
   
    const handleIntervalChange = (e) => {
        switch (e.target.value) {

            default:
                setInterval(['day', 1]);
                break;
            case "1wk":
                setInterval(['week', 1]);
                break;
            case "1mo":
                setInterval(["month", 1]);
                break;

        }
    }
    const [options, setOptions] = useState({
        credits: {
          enabled: false
        },
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
            enabled: true
        },
        
        chart:{
            backgroundColor: bg_color,
            zoomType: 'x',
            height: 600
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
      const getChartData = async (symbol, range) =>{
        const response = await getChart(symbol, range);
        const newData = preData(response);
        setData(newData);
        setSpinner(false);
      }
      getChartData(props.symbol, props.range)  
    },[props]);

    useEffect(() => {

      if(data){
          setOptions((prevState) =>{return({
              ...prevState,   
              series: [
                  {
                      type: "candlestick",
                      data: data.data,
                      name: props.symbol + " Price",
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
     <div className="stock-chart-area">
          {spinner ?
              <Spinner animation="border" className="spinner" />
            : 
            <div className="stock-chart">
                
                <Form.Select className="time_dropdown" 
                style={{width:"10%", backgroundColor: "black", color: "white"}}
                    defaultValue="1d" 
                    onChange={handleIntervalChange} >
                    <option value="1d">1 day</option>
                    <option value="1wk">1 week</option>
                    <option value='1mo'>1 Month</option>
                </Form.Select>
                <HighchartsReact
                highcharts={Highcharts}
                constructorType={"stockChart"}
                options={options}
                />          
            </div>
      
            }
        </div>
     
    );
};

export default HighCharts;
