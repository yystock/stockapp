import React, { useState, useEffect } from 'react';
import { getCompare } from '../../utils/stock';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import * as moment from 'moment';
const Compare = (props) => {
  const [chartData, setChartData] = useState(null);
  const [options, setOptions] = useState({
        title: {
          text: null
        },
        credits: {
          enabled: false
        },
        colors:['white', '#F5FF00'],
        chart:{
            backgroundColor: "#222838",
          
        },
        xAxis: [{labels: {style:{color: 'rgb(209, 212, 220)'}}}],
        rangeSelector: {
            inputStyle:{
                color: 'rgb(209, 212, 220)'
            }
        },
        
       
  
        series: [],

    });

  useEffect(() => {
    const getCompareData = async (symbol1, symbol2, range) => {
        getCompare(symbol1, symbol2, range).then(data => { 
        setChartData(data);
        }).catch(err => console.error(err)) 
    };
    getCompareData(props.symbol1, props.symbol2, props.range);
  }, []);

  useEffect(() => {
    if(chartData){
      setOptions((prevState) =>{return({
          ...prevState, 
          yAxis: {
            labels: {
                style:{color: 'rgb(209, 212, 220)'},
                formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
          plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true
            }
        },
        
        series: chartData,
                     
      });});
    }
}, [chartData])

  return (
      <div className='compare-chart'>
          <h4>Price Comparsion</h4>
          <p>A historical comparsion of how aapl moves with different tickers</p>
    <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
    />
    </div>
  );
};

export default Compare;